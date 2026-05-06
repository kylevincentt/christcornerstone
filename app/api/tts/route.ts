import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
// Cache for 24 hours — same text always produces same audio
export const revalidate = 86400;

/** ElevenLabs eleven_turbo_v2_5 hard limit is 5 000 chars. Stay under it. */
const MAX_CHARS = 4800;

function truncateToLimit(text: string): string {
  if (text.length <= MAX_CHARS) return text;
  // Cut at the last sentence boundary before the limit
  const cut = text.slice(0, MAX_CHARS);
  const lastPeriod = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return lastPeriod > MAX_CHARS * 0.7
    ? cut.slice(0, lastPeriod + 1)
    : cut.trimEnd() + '...';
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
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
          text: truncateToLimit(text),
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

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (err) {
    console.error('TTS route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
