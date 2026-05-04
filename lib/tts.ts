/**
 * Shared TTS helpers.
 * Calls ElevenLabs with the Lushy voice and persists the MP3 to Vercel Blob.
 * Requires env: ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID, BLOB_READ_WRITE_TOKEN
 */
import { put } from '@vercel/blob';

export function buildSermonText(
  summary: string,
  additionalContext?: string | null
): string {
  const parts: string[] = [];
  parts.push('Sermon Summary. ' + summary.replace(/\n\n/g, '. '));
  if (additionalContext) {
    parts.push('Going Deeper. ' + additionalContext.replace(/\n\n/g, '. '));
  }
  return parts.join('. ');
}

/**
 * Generates TTS audio for a sermon and uploads it to Vercel Blob.
 * Returns the public CDN URL.
 * Throws if ElevenLabs or Blob upload fails.
 */
export async function generateAndStoreAudio(
  slug: string,
  summary: string,
  additionalContext?: string | null
): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) throw new Error('ElevenLabs env vars not configured');

  const text = buildSermonText(summary, additionalContext);

  const elevenRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
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

  if (!elevenRes.ok) {
    const detail = await elevenRes.text();
    throw new Error(`ElevenLabs ${elevenRes.status}: ${detail}`);
  }

  const buffer = await elevenRes.arrayBuffer();

  const { url } = await put(`sermons/${slug}.mp3`, buffer, {
    access: 'public',
    contentType: 'audio/mpeg',
    addRandomSuffix: false, // stable URL — same slug always overwrites same file
  });

  return url;
}
