'use client';
import { useState } from 'react';

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

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    site_title: 'ChristCornerstone — A Home for Your Faith',
    site_description: "Truth doesn't fear questions. Explore the evidence, doctrine, and life Christianity offers.",
    hero_eyebrow: 'For the Curious & the Convinced',
    hero_title: 'The Case for Christ. The Life of Faith.',
    hero_subtitle: "Truth doesn't fear questions. Explore the evidence, the doctrine, and the life Christianity offers — wherever you're starting from.",
    footer_brand_desc: 'A modern, aesthetic home for exploring the Christian faith — built for the curious and the convinced alike.',
    cs_lewis_quote: "I believe in Christianity as I believe that the sun has risen — not only because I see it, but because by it I see everything else.",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'settings', item: settings }),
      });
    } catch (e) {
      console.error(e);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: '2.2rem', fontWeight: 300 }}>Site Settings</h1>
      <p className="text-text-muted mb-8">Edit global site text and metadata.</p>

      {saved && (
        <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
          ✓ Settings saved
        </div>
      )}

      <div className="space-y-6">
        {/* SEO */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.12)' }}>
          <h2 className="font-cormorant text-cream mb-4" style={{ fontSize: '1.3rem', fontWeight: 600 }}>SEO & Metadata</h2>
          <div className="space-y-4">
            <div>
              <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Site Title</label>
              <input style={FIELD_STYLE} value={settings.site_title} onChange={(e) => setSettings((s) => ({ ...s, site_title: e.target.value }))} />
            </div>
            <div>
              <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Site Description (Meta)</label>
              <textarea style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '80px' }} value={settings.site_description} onChange={(e) => setSettings((s) => ({ ...s, site_description: e.target.value }))} />
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.12)' }}>
          <h2 className="font-cormorant text-cream mb-4" style={{ fontSize: '1.3rem', fontWeight: 600 }}>Homepage Hero</h2>
          <div className="space-y-4">
            <div>
              <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Eyebrow Text (small text above title)</label>
              <input style={FIELD_STYLE} value={settings.hero_eyebrow} onChange={(e) => setSettings((s) => ({ ...s, hero_eyebrow: e.target.value }))} />
            </div>
            <div>
              <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Hero Title</label>
              <input style={FIELD_STYLE} value={settings.hero_title} onChange={(e) => setSettings((s) => ({ ...s, hero_title: e.target.value }))} />
            </div>
            <div>
              <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Hero Subtitle</label>
              <textarea style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '80px' }} value={settings.hero_subtitle} onChange={(e) => setSettings((s) => ({ ...s, hero_subtitle: e.target.value }))} />
            </div>
          </div>
        </div>

        {/* Featured quote */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.12)' }}>
          <h2 className="font-cormorant text-cream mb-4" style={{ fontSize: '1.3rem', fontWeight: 600 }}>Featured Quote (Homepage Divider)</h2>
          <div>
            <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Quote Text</label>
            <textarea style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '100px' }} value={settings.cs_lewis_quote} onChange={(e) => setSettings((s) => ({ ...s, cs_lewis_quote: e.target.value }))} />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="font-cinzel tracking-[0.12em] uppercase text-midnight bg-gold px-8 py-3 rounded-xl transition-colors hover:bg-gold-light"
          style={{ fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
}