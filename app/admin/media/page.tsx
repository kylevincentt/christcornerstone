'use client';
import { useState, useEffect } from 'react';
import type { MediaEmbed } from '@/types';

const FIELD_STYLE = {
  background: 'var(--deep-navy)',
  border: '1px solid rgba(201,168,76,0.2)',
  borderRadius: '8px',
  color: 'var(--cream)',
  padding: '0.7rem 1rem',
  fontSize: '0.95rem',
  width: '100%',
  outline: 'none',
  fontFamily: 'Lato, sans-serif',
};

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function extractTweetId(url: string): string | null {
  const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  return match ? match[1] : null;
}

export default function AdminMediaPage() {
  const [embeds, setEmbeds] = useState<MediaEmbed[]>([]);
  const [form, setForm] = useState({
    type: 'youtube' as 'youtube' | 'twitter',
    url: '',
    title: '',
    description: '',
    section: 'library',
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?type=media')
      .then((r) => r.json())
      .then((data) => setEmbeds(data.items || []))
      .catch(() => {});
  }, []);

  const handleUrlChange = (url: string) => {
    setForm((f) => ({ ...f, url }));
    if (form.type === 'youtube') {
      const id = extractYouTubeId(url);
      setPreview(id ? `https://www.youtube.com/embed/${id}` : null);
    } else {
      const id = extractTweetId(url);
      setPreview(id ? id : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    let embed_id = '';
    if (form.type === 'youtube') {
      const id = extractYouTubeId(form.url);
      if (!id) { setMessage('Invalid YouTube URL'); setSaving(false); return; }
      embed_id = id;
    } else {
      const id = extractTweetId(form.url);
      if (!id) { setMessage('Invalid X/Twitter URL'); setSaving(false); return; }
      embed_id = id;
    }

    const newEmbed: MediaEmbed = {
      id: Date.now().toString(),
      type: form.type,
      embed_id,
      title: form.title,
      description: form.description,
      section: form.section,
      sort_order: embeds.length + 1,
    };

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'media', item: newEmbed }),
      });
      if (res.ok) {
        setEmbeds((prev) => [...prev, newEmbed]);
        setForm({ type: 'youtube', url: '', title: '', description: '', section: 'library' });
        setPreview(null);
        setMessage('✓ Media embed saved!');
      } else {
        setMessage('Error saving. Check Supabase is configured.');
      }
    } catch {
      setEmbeds((prev) => [...prev, newEmbed]);
      setMessage('✓ Saved locally (connect Supabase for persistence)');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setEmbeds((prev) => prev.filter((e) => e.id !== id));
    await fetch('/api/admin/content', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'media', id }),
    }).catch(() => {});
  };

  return (
    <div>
      <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: '2.2rem', fontWeight: 300 }}>Media Embeds</h1>
      <p className="text-text-muted mb-8">Add YouTube videos and X/Twitter posts to display on the site.</p>

      {/* Add new */}
      <div className="rounded-2xl p-7 mb-8" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <h2 className="font-cormorant text-cream mb-5" style={{ fontSize: '1.4rem', fontWeight: 600 }}>Add New Embed</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2">
            {(['youtube', 'twitter'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setForm((f) => ({ ...f, type: t, url: '' })); setPreview(null); }}
                className="font-cinzel tracking-[0.1em] uppercase px-5 py-2 rounded-lg transition-all"
                style={{
                  fontSize: '0.72rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: form.type === t ? 'var(--gold)' : 'rgba(201,168,76,0.08)',
                  color: form.type === t ? 'var(--midnight)' : 'var(--gold)',
                }}
              >
                {t === 'youtube' ? '▶ YouTube' : '✗ X / Twitter'}
              </button>
            ))}
          </div>

          <div>
            <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
              {form.type === 'youtube' ? 'YouTube URL' : 'X / Twitter Post URL'}
            </label>
            <input
              style={FIELD_STYLE}
              value={form.url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={form.type === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://x.com/username/status/...'}
              required
            />
          </div>

          {/* Preview */}
          {preview && form.type === 'youtube' && (
            <div className="youtube-embed rounded-xl overflow-hidden" style={{ maxWidth: '480px' }}>
              <iframe
                src={preview}
                title="Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {preview && form.type === 'twitter' && (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
              <p className="text-text-muted text-sm">X Post ID: {preview}</p>
              <p className="text-text-muted text-xs mt-1">Post will display using X embed widget on the live site.</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Title</label>
              <input style={FIELD_STYLE} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            </div>
            <div>
              <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Display Section</label>
              <select
                style={{ ...FIELD_STYLE, cursor: 'pointer' }}
                value={form.section}
                onChange={(e) => setForm((f) => ({ ...f, section: e.target.value }))}
              >
                <option value="library">Library</option>
                <option value="doctrine">Doctrine Section</option>
                <option value="apologetics">Apologetics</option>
                <option value="homepage">Homepage</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Description (optional)</label>
            <textarea style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '60px' }} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>

          {message && (
            <p style={{ color: message.startsWith('✓') ? 'var(--gold)' : '#f87171', fontSize: '0.9rem' }}>{message}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="font-cinzel tracking-[0.12em] uppercase text-midnight bg-gold px-7 py-2.5 rounded-lg transition-colors hover:bg-gold-light disabled:opacity-60"
            style={{ fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
          >
            {saving ? 'Saving…' : 'Add Embed'}
          </button>
        </form>
      </div>

      {/* Existing embeds */}
      {embeds.length > 0 && (
        <div>
          <h2 className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-4" style={{ fontSize: '0.72rem' }}>Current Embeds</h2>
          <div className="space-y-3">
            {embeds.map((embed) => (
              <div
                key={embed.id}
                className="flex items-center justify-between p-5 rounded-xl"
                style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{embed.type === 'youtube' ? '▶' : '✗'}</span>
                  <div>
                    <p className="text-cream font-cormorant" style={{ fontSize: '1.1rem' }}>{embed.title}</p>
                    <p className="text-text-muted text-xs mt-0.5">ID: {embed.embed_id} · Section: {embed.section}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(embed.id)}
                  className="text-text-muted hover:text-red-400 transition-colors text-sm"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}