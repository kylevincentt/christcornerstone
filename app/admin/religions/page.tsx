'use client';
import { useState } from 'react';
import { useAdminContent } from '@/components/admin/useAdminContent';
import {
  FieldLabel,
  TextInput,
  TextArea,
  NumberInput,
  PrimaryButton,
  GhostButton,
  DangerGhostButton,
  SaveBanner,
  ErrorBanner,
  LoadingState,
  EmptyState,
} from '@/components/admin/FormFields';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import type { Religion } from '@/types';

const EMPTY: Religion = {
  id: '',
  slug: '',
  icon: '',
  name: '',
  adherents: '',
  description: '',
  comparison_points: [],
  full_content: '',
  sort_order: 0,
};

function ReligionEditor({
  religion,
  onSave,
  onCancel,
  onDelete,
  isNew,
}: {
  religion: Religion;
  onSave: (r: Religion) => Promise<boolean>;
  onCancel: () => void;
  onDelete?: () => Promise<boolean>;
  isNew?: boolean;
}) {
  const [form, setForm] = useState({
    ...religion,
    comparison_points: religion.comparison_points || [],
  });
  const [pointsText, setPointsText] = useState((religion.comparison_points || []).join('\n'));
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof Religion>(key: K, val: Religion[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    const points = pointsText
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);
    const ok = await onSave({ ...form, comparison_points: points });
    setSaving(false);
    if (ok) onCancel();
  };

  return (
    <div
      className="space-y-4 p-6 rounded-2xl"
      style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FieldLabel>Slug</FieldLabel>
          <TextInput value={form.slug} onChange={(v) => set('slug', v)} placeholder="islam" />
        </div>
        <div>
          <FieldLabel>Icon (emoji or symbol)</FieldLabel>
          <TextInput value={form.icon} onChange={(v) => set('icon', v)} placeholder="☪" />
        </div>
        <div>
          <FieldLabel>Sort Order</FieldLabel>
          <NumberInput value={form.sort_order} onChange={(v) => set('sort_order', v)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Name</FieldLabel>
          <TextInput value={form.name} onChange={(v) => set('name', v)} placeholder="Islam" />
        </div>
        <div>
          <FieldLabel>Adherents (caption)</FieldLabel>
          <TextInput
            value={form.adherents}
            onChange={(v) => set('adherents', v)}
            placeholder="1.9 Billion Adherents"
          />
        </div>
      </div>
      <div>
        <FieldLabel>Card Description</FieldLabel>
        <TextArea value={form.description} onChange={(v) => set('description', v)} />
      </div>
      <div>
        <FieldLabel>Comparison Points (one per line)</FieldLabel>
        <TextArea
          value={pointsText}
          onChange={setPointsText}
          minHeight={140}
          placeholder={`Islam denies the Trinity; Christianity affirms one God in three persons\nIslam says Jesus was a prophet; Christianity says he is the Son of God`}
        />
      </div>
      <div>
        <FieldLabel>Full Article Content (Markdown)</FieldLabel>
        <MarkdownEditor
          value={form.full_content || ''}
          onChange={(v) => set('full_content', v)}
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-end items-center pt-4">
        {!isNew && onDelete && (
          <div className="mr-auto">
            <DangerGhostButton
              onClick={async () => {
                if (!confirm(`Delete "${religion.name}"?`)) return;
                await onDelete();
              }}
            >
              Delete
            </DangerGhostButton>
          </div>
        )}
        <GhostButton onClick={onCancel}>Cancel</GhostButton>
        <PrimaryButton disabled={saving || !form.slug || !form.name} onClick={handleSave}>
          {saving ? 'Saving…' : isNew ? 'Create Religion' : 'Save Religion'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function AdminReligionsPage() {
  const { items, loading, error, saved, save, remove } =
    useAdminContent<Religion>('religions');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-cormorant text-cream" style={{ fontSize: '2.2rem', fontWeight: 300 }}>
            Religions
          </h1>
          <p className="text-text-muted mt-1" style={{ fontSize: '0.9rem' }}>
            Edit religion comparisons, key differences, and full articles.
          </p>
        </div>
        {!creating && <PrimaryButton onClick={() => setCreating(true)}>+ New Religion</PrimaryButton>}
      </div>

      <SaveBanner message={saved} />
      <ErrorBanner message={error} />

      {creating && (
        <div className="mb-6">
          <ReligionEditor
            isNew
            religion={{ ...EMPTY, id: `r-${Date.now()}`, sort_order: items.length + 1 }}
            onSave={async (r) => save(r, 'Religion created')}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : items.length === 0 && !creating ? (
        <EmptyState
          title="No religions yet"
          hint="Run npm run db:setup to seed initial content."
        />
      ) : (
        <div className="space-y-3">
          {items.map((religion) => (
            <div key={religion.id}>
              {editingId === religion.id ? (
                <ReligionEditor
                  religion={religion}
                  onSave={async (r) => save(r, 'Religion saved')}
                  onCancel={() => setEditingId(null)}
                  onDelete={async () => {
                    const ok = await remove(religion.id);
                    if (ok) setEditingId(null);
                    return ok;
                  }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingId(religion.id)}
                  className="w-full text-left flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)')}
                >
                  <span className="text-3xl flex-shrink-0">{religion.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-cormorant text-cream" style={{ fontSize: '1.25rem' }}>
                      {religion.name}
                    </h3>
                    <p className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase mt-0.5">
                      {religion.adherents}
                    </p>
                  </div>
                  <span className="font-cinzel text-gold-dim text-xs tracking-widest uppercase">
                    Edit →
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
