'use client';
import { useState } from 'react';
import { DOCTRINES } from '@/lib/data';
import type { Doctrine } from '@/types';

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

function DoctrineEditor({ doctrine, onSave, onCancel }: { doctrine: Doctrine; onSave: (d: Doctrine) => void; onCancel: () => void }) {
  const [form, setForm] = useState(doctrine);
  const set = (key: keyof Doctrine, val: string | number) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="space-y-4 p-6 rounded-2xl" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Tag / Category</label>
          <input style={FIELD_STYLE} value={form.tag} onChange={(e) => set('tag', e.target.value)} />
        </div>
        <div>
          <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Name</label>
          <input style={FIELD_STYLE} value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Key Verse (short)</label>
        <input style={FIELD_STYLE} value={form.verse} onChange={(e) => set('verse', e.target.value)} />
      </div>
      <div>
        <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Summary Description</label>
        <textarea style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '80px' }} value={form.description} onChange={(e) => set('description', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Hover Verse Text</label>
          <textarea style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '80px' }} value={form.hover_verse_text} onChange={(e) => set('hover_verse_text', e.target.value)} />
        </div>
        <div>
          <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Hover Verse Citation</label>
          <input style={FIELD_STYLE} value={form.hover_verse_citation} onChange={(e) => set('hover_verse_citation', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
          Full Article Content (use **Heading** for section headers, **bold** for emphasis)
        </label>
        <textarea
          style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '300px', fontFamily: 'monospace', fontSize: '0.85rem' }}
          value={form.full_content || ''}
          onChange={(e) => set('full_content', e.target.value)}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="font-cinzel tracking-[0.12em] uppercase text-text-muted px-5 py-2 rounded-lg transition-colors hover:text-cream"
          style={{ fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="font-cinzel tracking-[0.12em] uppercase text-midnight bg-gold px-6 py-2 rounded-lg transition-colors hover:bg-gold-light"
          style={{ fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
        >
          Save Doctrine
        </button>
      </div>
    </div>
  );
}

export default function AdminDoctrinesPage() {
  const [doctrines, setDoctrines] = useState<Doctrine[]>(DOCTRINES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = async (updated: Doctrine) => {
    setDoctrines((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setEditingId(null);
    setSaved(updated.id);
    setTimeout(() => setSaved(null), 3000);

    // Save to Supabase if configured
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'doctrine', item: updated }),
      });
    } catch (e) {
      console.error('Save error:', e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cormorant text-cream" style={{ fontSize: '2.2rem', fontWeight: 300 }}>Doctrines</h1>
          <p className="text-text-muted mt-1" style={{ fontSize: '0.9rem' }}>Edit doctrine cards and full article content.</p>
        </div>
      </div>

      {saved && (
        <div className="mb-4 p-4 rounded-xl text-sm" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
          ✓ Changes saved successfully
        </div>
      )}

      <div className="space-y-3">
        {doctrines.map((doctrine) => (
          <div key={doctrine.id}>
            {editingId === doctrine.id ? (
              <DoctrineEditor
                doctrine={doctrine}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                className="flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
                onClick={() => setEditingId(doctrine.id)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)')}
              >
                <div>
                  <span className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase">{doctrine.tag}</span>
                  <h3 className="font-cormorant text-cream mt-0.5" style={{ fontSize: '1.3rem' }}>{doctrine.name}</h3>
                  <p className="text-text-muted mt-1" style={{ fontSize: '0.85rem' }}>{doctrine.description.slice(0, 80)}…</p>
                </div>
                <span className="font-cinzel text-gold-dim text-xs tracking-widest uppercase ml-4 flex-shrink-0">Edit →</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}