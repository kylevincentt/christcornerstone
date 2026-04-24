'use client';
import { useState } from 'react';
import { useAdminContent } from '@/components/admin/useAdminContent';
import {
  FieldLabel,
  TextInput,
  TextArea,
  PrimaryButton,
  GhostButton,
  DangerGhostButton,
  SaveBanner,
  ErrorBanner,
  LoadingState,
  EmptyState,
} from '@/components/admin/FormFields';

interface VerseRow {
  id: string;
  text: string;
  reference: string;
  sort_order?: number;
}

export default function AdminVersesPage() {
  const { items, loading, error, saved, save, remove } = useAdminContent<VerseRow>('daily_verses');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<VerseRow | null>(null);
  const [newVerse, setNewVerse] = useState({ text: '', reference: '' });

  const handleEdit = (verse: VerseRow) => {
    setEditingId(verse.id);
    setEditForm({ ...verse });
  };

  const handleSave = async () => {
    if (!editForm) return;
    await save(editForm, 'Verse saved');
    setEditingId(null);
  };

  const handleAdd = async () => {
    if (!newVerse.text || !newVerse.reference) return;
    const verse: VerseRow = {
      id: `v-${Date.now()}`,
      text: newVerse.text,
      reference: newVerse.reference,
      sort_order: items.length + 1,
    };
    const ok = await save(verse, 'Verse added');
    if (ok) setNewVerse({ text: '', reference: '' });
  };

  return (
    <div>
      <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: '2.2rem', fontWeight: 300 }}>
        Daily Verses
      </h1>
      <p className="text-text-muted mb-8">
        One verse is shown each day, cycling through this list based on day-of-year.
      </p>

      <SaveBanner message={saved} />
      <ErrorBanner message={error} />

      {/* Add new */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}
      >
        <h2 className="font-cormorant text-cream mb-4" style={{ fontSize: '1.3rem', fontWeight: 600 }}>
          Add New Verse
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <FieldLabel>Verse Text</FieldLabel>
            <TextArea
              value={newVerse.text}
              onChange={(v) => setNewVerse((f) => ({ ...f, text: v }))}
              placeholder="For I know the plans I have for you…"
            />
          </div>
          <div>
            <FieldLabel>Reference</FieldLabel>
            <TextInput
              value={newVerse.reference}
              onChange={(v) => setNewVerse((f) => ({ ...f, reference: v }))}
              placeholder="Jeremiah 29:11"
            />
          </div>
        </div>
        <div className="mt-4">
          <PrimaryButton onClick={handleAdd} disabled={!newVerse.text || !newVerse.reference}>
            Add Verse
          </PrimaryButton>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState title="No verses yet" hint="Add one above, or run npm run db:setup." />
      ) : (
        <div className="space-y-2">
          {items.map((verse) => (
            <div key={verse.id}>
              {editingId === verse.id && editForm ? (
                <div
                  className="rounded-xl p-5 space-y-3"
                  style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  <TextArea
                    value={editForm.text}
                    onChange={(v) => setEditForm((f) => (f ? { ...f, text: v } : f))}
                  />
                  <TextInput
                    value={editForm.reference}
                    onChange={(v) => setEditForm((f) => (f ? { ...f, reference: v } : f))}
                  />
                  <div className="flex gap-3 items-center">
                    <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
                    <GhostButton onClick={() => setEditingId(null)}>Cancel</GhostButton>
                    <div className="ml-auto">
                      <DangerGhostButton
                        onClick={async () => {
                          if (!confirm('Delete this verse?')) return;
                          const ok = await remove(verse.id);
                          if (ok) setEditingId(null);
                        }}
                      >
                        Delete
                      </DangerGhostButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center justify-between p-4 rounded-xl transition-all"
                  style={{
                    background: 'rgba(201,168,76,0.03)',
                    border: '1px solid rgba(201,168,76,0.07)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.07)')}
                >
                  <div className="flex-1 pr-4">
                    <p className="font-cormorant text-cream-dark" style={{ fontSize: '1.05rem' }}>
                      &ldquo;{verse.text}&rdquo;
                    </p>
                    <p
                      className="font-cinzel text-gold-dim tracking-[0.15em] mt-1"
                      style={{ fontSize: '0.7rem' }}
                    >
                      — {verse.reference}
                    </p>
                  </div>
                  <button
                    type="button"
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
      )}
    </div>
  );
}
