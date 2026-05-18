import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { synthesizeMp3 } from '@/lib/tts';

export const runtime = 'nodejs';
// Cache for 24 hours — same text always produces same audio
export const revalidate = 86400;

// Google Cloud TTS limit is 5000 chars per request. Stay under it.
const MAX_CHARS = 4800;

/**
 * Module-level LRU cache of generated audio buffers, keyed by sha256 of the
 * truncated request text. Without this, every click on the audio button
 * burned a fresh TTS API call. Caching keeps repeated plays of the same text
 * free. The cache lives for the lifetime of the serverless instance.
 */
const CACHE_LIMIT = 32;
const audioCache = new Map<string, Buffer>();

function cacheGet(key: string): Buffer | undefined {
  const buf = audioCache.get(key);
  if (buf) {
    audioCache.delete(key);
    audioCache.set(key, buf);
  }
  return buf;
}

function cacheSet(key: string, buf: Buffer) {
  if (audioCache.size >= CACHE_LIMIT) {
    const oldest = audioCache.keys().next().value;
    if (oldest) audioCache.delete(oldest);
  }
  audioCache.set(key, buf);
}

function truncateToLimit(text: string): string {
  if (text.length <= MAX_CHARS) return text;
  const cut = text.slice(0, MAX_CHARS);
  const lastPeriod = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return lastPeriod > MAX_CHARS * 0.7
    ? cut.slice(0, lastPeriod + 1)
    : cut.trimEnd() + '...';
}

function audioResponse(buf: Buffer, cacheStatus: 'HIT' | 'MISS') {
  // Copy bytes into a fresh ArrayBuffer — NextResponse's BodyInit type accepts
  // ArrayBuffer but not Node's Buffer (variance mismatch under @types/node ≥20).
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  return new NextResponse(ab, {
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
    if (cached) return audioResponse(cached, 'HIT');

    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      return NextResponse.json({ error: 'TTS not configured' }, { status: 500 });
    }

    const audioBuffer = await synthesizeMp3(truncated);
    cacheSet(key, audioBuffer);

    return audioResponse(audioBuffer, 'MISS');
  } catch (err) {
    console.error('TTS route error:', err);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}
