import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

export const runtime = 'nodejs';
// Cache for 24 hours — same text always produces same audio
export const revalidate = 86400;

/** ElevenLabs eleven_turbo_v2_5 hard limit is 5 000 chars. Stay under it. */
const MAX_CHARS = 4800;

/**
 * Module-level LRU cache of generated audio buffers, keyed by sha256 of the
 * truncated request text. Without this, every click on the audio button burned
 * a fresh ElevenLabs character credit — a 6 700-char outline ate ~2 400 credits
 * per click and quickly exhausted the 10 000/month free quota. Caching keeps
 * repeated plays of the same text free.
 *
 * The cache lives for the lifetime of the serverless instance. Vercel may
 * spin up multiple warm instances; each will populate its own copy on first
 * miss. That's still a dramatic reduction vs. the previous 0 % hit rate.
 */
const CACHE_LIMIT = 32;
const audioCache = new Map<string, ArrayBuffer>();

function cacheGet(key: string): ArrayBuffer | undefined {
  const buf = audioCache.get(key);
  if (buf) {
    // touch — re-insert to mark as most-recently-used
    audioCache.delete(key);
    audioCache.set(key, buf);
  }
  return buf;
}

function cacheSet(key: string, buf: ArrayBuffer) {
  if (audioCache.size >= CACHE_LIMIT) {
    const oldest = audioCache.keys().next().value;
    if (oldest) audioCache.delete(oldest);
  }
  audioCache.set(key, buf);
}

function truncateToLimit(text: string): string {
  if (text.length <= MAX_CHARS) return text;
  // Cut at the last sentence boundary before the limit
  const cut = text.slice(0, MAX_CHARS);
  const lastPeriod = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return lastPeriod > MAX_CHARS * 0.7
    ? cut.slice(0, lastPeriod + 1)
    : cut.trimEnd() + '...';
}

function audioResponse(buf: ArrayBuffer, cacheStatus: 'HIT' | 'MISS') {
  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400, immutable',
      'X-Cache': cacheStatus,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    const truncated = truncateToLimit(text);
    const key = createHash('sha256').update(truncated).digest('hex');

    const cached = cacheGet(key);
    if (cached) {
      // Slice creates a fresh ArrayBuffer view; some Node versions reject
      // the same buffer being returned twice from NextResponse.
      return audioResponse(cached.slice(0), 'HIT');
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID;

    if (!apiKey || !voiceId) {
      return NextResponse.json({ error: 'TTS not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text: truncated,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.85,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('ElevenLabs error:', response.status, err);
      return NextResponse.json(
        { error: 'TTS generation failed', detail: err },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    cacheSet(key, audioBuffer);

    return audioResponse(audioBuffer.slice(0), 'MISS');
  } catch (err) {
    console.error('TTS route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
