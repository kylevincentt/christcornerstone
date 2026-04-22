'use client';
import { useState } from 'react';
import { DAILY_VERSES } from '@/lib/data';
import type { DailyVerse } from '@/types';

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

export default function AdminVersesPage() {
  const [verses, setVerses] = useState<DailyVerse[]>(DAILY_VERSES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<DailyVerse | null>(null);
  const [newVerse, setNewVerse] = useState({ text: '', reference: '' });
  const [saved, setSaved] = useState(false);

  const handleEdit = (verse: DailyVerse) => {
    setEditingId(verse.id);
    setEditForm({ ...verse });
  };

  const handleSave = async () => {
    if (!editForm) return;
    setVerses((prev) => prev.map((v) => (v.id === editForm.id ? editForm : v)));
    setEditingId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'verse', item: editForm }),
    }).catch(() => {});
  };

  const handleAddVerse = async () => {
    if (!newVerse.text || !newVerse.reference) return;
    const verse: DailyVerse = { id: Date.now().toString(), ...newVerse };
    setVerses((prev) => [...prev, verse]);
    setNewVerse({ text: '', reference: '' });
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'verse', item: verse }),
    }).catch(() => {});
  };

  return (
    <div>
      <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: '2.2rem', fontWeight: 300 }}>Daily Verses</h1>
      <p className="text-text-muted mb-8">Manage the verse rotation. One verse is displayed each day, cycling through this list.</p>

      {saved && (
        <div className="mb-4 p-4 rounded-xl text-sm" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
          ✓ Verse saved
        </div>
      )}

      {/* Add new */}
      <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <h2 className="font-cormorant text-cream mb-4" style={{ fontSize: '1.3rem', fontWeight: 600 }}>Add New Verse</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Verse Text</label>
            <textarea
              style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '80px' }}
              value={newVerse.text}
              onChange={(e) => setNewVerse((f) => ({ ...f, text: e.target.value }))}
              placeholder="For I know the plans I have for you..."
            />
          </div>
          <div>
            <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Reference</label>
            <input style={FIELD_STYLE} value={newVerse.reference} onChange={(e) => setNewVerse((f) => ({ ...f, reference: e.target.value }))} placeholder="Jeremiah 29:11" />
          </div>
        </div>
        <button
          onClick={handleAddVerse}
          className="mt-4 font-cinzel tracking-[0.12em] uppercase text-midnight bg-gold px-7 py-2.5 rounded-lg transition-colors hover:bg-gold-light"
          style={{ fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
        >
          Add Verse
        </button>
      </div>

      {/* Verse list */}
      <div className="space-y-2">
        {verses.map((verse) => (
          <div key={verse.id}>
            {editingId === verse.id && editForm ? (
              <div className="rounded-xl p-5 space-y-3" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <textarea
                  style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '80px' }}
                  value={editForm.text}
                  onChange={(e) => setEditForm((f) => f ? { ...f, text: e.target.value } : f)}
                />
                <input
                  style={FIELD_STYLE}
                  value={editForm.reference}
                  onChange={(e) => setEditForm((f) => f ? { ...f, reference: e.target.value } : f)}
                />
                <div className="flex gap-3">
                  <button onClick={handleSave} className="font-cinzel text-[0.72rem] tracking-[0.1em] uppercase text-midnight bg-gold px-5 py-2 rounded-lg hover:bg-gold-light" style={{ border: 'none', cursor: 'pointer' }}>Save</button>
                  <button onClick={() => setEditingId(null)} className="font-cinzel text-[0.72rem] tracking-[0.1em] uppercase text-text-muted px-5 py-2 rounded-lg hover:text-cream" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all"
                style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.07)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.07)')}
              >
                <div className="flex-1 pr-4">
                  <p className="font-cormorant text-cream-dark" style={{ fontSize: '1.05rem' }}>&ldquo;{verse.text}&rdquo;</p>
                  <p className="font-cinzel text-gold-dim tracking-[0.15em] mt-1" style={{ fontSize: '0.7rem' }}>— {verse.reference}</p>
                </div>
                <button
                  onClick={() => handleEdit(verse)}
                  className="font-cinzel text-gold-dim text-[0.68rem] tracking-widest uppercase hover:text-gold transition-colors flex-shrink-0"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}