/**
 * Shared TTS helpers.
 * Calls Google Cloud Text-to-Speech (Neural2 voice) and persists the MP3 to Vercel Blob.
 * Requires env: GOOGLE_APPLICATION_CREDENTIALS_JSON, BLOB_READ_WRITE_TOKEN
 */
import { put } from '@vercel/blob';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const DEFAULT_VOICE = 'en-US-Neural2-D';
const DEFAULT_LANGUAGE = 'en-US';

let cachedClient: TextToSpeechClient | null = null;

function getClient(): TextToSpeechClient {
  if (cachedClient) return cachedClient;
  const json = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!json) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON not configured');
  const credentials = JSON.parse(json);
  cachedClient = new TextToSpeechClient({
    credentials,
    projectId: credentials.project_id,
  });
  return cachedClient;
}

export async function synthesizeMp3(text: string): Promise<Buffer> {
  const client = getClient();
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: DEFAULT_LANGUAGE, name: DEFAULT_VOICE },
    audioConfig: { audioEncoding: 'MP3' },
  });
  const audio = response.audioContent;
  if (!audio) throw new Error('Google TTS returned empty audio');
  return Buffer.isBuffer(audio) ? audio : Buffer.from(audio);
}

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
 * Throws if Google TTS or Blob upload fails.
 */
export async function generateAndStoreAudio(
  slug: string,
  summary: string,
  additionalContext?: string | null
): Promise<string> {
  const text = buildSermonText(summary, additionalContext);
  const buffer = await synthesizeMp3(text);

  const { url } = await put(`sermons/${slug}.mp3`, buffer, {
    access: 'public',
    contentType: 'audio/mpeg',
    addRandomSuffix: false, // stable URL — same slug always overwrites same file
  });

  return url;
}
