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
import type { Doctrine } from '@/types';

const EMPTY_DOCTRINE: Doctrine = {
  id: '',
  slug: '',
  tag: '',
  name: '',
  verse: '',
  description: '',
  hover_verse_text: '',
  hover_verse_citation: '',
  full_content: '',
  sort_order: 0,
};

function DoctrineEditor({
  doctrine,
  onSave,
  onCancel,
  onDelete,
  isNew,
}: {
  doctrine: Doctrine;
  onSave: (d: Doctrine) => Promise<boolean>;
  onCancel: () => void;
  onDelete?: () => Promise<boolean>;
  isNew?: boolean;
}) {
  const [form, setForm] = useState(doctrine);
  const set = <K extends keyof Doctrine>(key: K, val: Doctrine[K]) =>
    setForm((f) => ({ ...f, [key]: val }));
  const [saving, setSaving] = useState(false);

  return (
    <div
      className="space-y-4 p-6 rounded-2xl"
      style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Slug (URL part)</FieldLabel>
          <TextInput value={form.slug} onChange={(v) => set('slug', v)} placeholder="trinity" />
        </div>
        <div>
          <FieldLabel>Sort Order</FieldLabel>
          <NumberInput value={form.sort_order} onChange={(v) => set('sort_order', v)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Tag / Category</FieldLabel>
          <TextInput value={form.tag} onChange={(v) => set('tag', v)} placeholder="Theology Proper" />
        </div>
        <div>
          <FieldLabel>Name</FieldLabel>
          <TextInput value={form.name} onChange={(v) => set('name', v)} placeholder="The Trinity" />
        </div>
      </div>
      <div>
        <FieldLabel>Card Verse (short)</FieldLabel>
        <TextInput
          value={form.verse}
          onChange={(v) => set('verse', v)}
          placeholder='"Go and make disciples…" — Matt 28:19'
        />
      </div>
      <div>
        <FieldLabel>Summary Description</FieldLabel>
        <TextArea
          value={form.description}
          onChange={(v) => set('description', v)}
          placeholder="One short sentence describing the doctrine."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Hover Verse Text</FieldLabel>
          <TextArea
            value={form.hover_verse_text}
            onChange={(v) => set('hover_verse_text', v)}
            placeholder='"The grace of the Lord Jesus Christ…"'
          />
        </div>
        <div>
          <FieldLabel>Hover Verse Citation</FieldLabel>
          <TextInput
            value={form.hover_verse_citation}
            onChange={(v) => set('hover_verse_citation', v)}
            placeholder="2 Corinthians 13:14"
          />
        </div>
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
                if (!confirm(`Delete "${doctrine.name}"? This cannot be undone.`)) return;
                await onDelete();
              }}
            >
              Delete
            </DangerGhostButton>
          </div>
        )}
        <GhostButton onClick={onCancel}>Cancel</GhostButton>
        <PrimaryButton
          disabled={saving || !form.slug || !form.name}
          onClick={async () => {
            setSaving(true);
            const ok = await onSave(form);
            setSaving(false);
            if (ok) onCancel();
          }}
        >
          {saving ? 'Saving…' : isNew ? 'Create Doctrine' : 'Save Doctrine'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function AdminDoctrinesPage() {
  const { items, loading, error, saved, save, remove } =
    useAdminContent<Doctrine>('doctrines');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-cormorant text-cream" style={{ fontSize: '2.2rem', fontWeight: 300 }}>
            Doctrines
          </h1>
          <p className="text-text-muted mt-1" style={{ fontSize: '0.9rem' }}>
            Edit doctrine cards and full article content. Changes appear on the site instantly.
          </p>
        </div>
        {!creating && (
          <PrimaryButton onClick={() => setCreating(true)}>+ New Doctrine</PrimaryButton>
        )}
      </div>

      <SaveBanner message={saved} />
      <ErrorBanner message={error} />

      {creating && (
        <div className="mb-6">
          <DoctrineEditor
            isNew
            doctrine={{
              ...EMPTY_DOCTRINE,
              id: `d-${Date.now()}`,
              sort_order: items.length + 1,
            }}
            onSave={async (d) => save(d, 'Doctrine created')}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : items.length === 0 && !creating ? (
        <EmptyState
          title="No doctrines yet"
          hint="Run npm run db:setup to seed initial content, or click + New Doctrine."
        />
      ) : (
        <div className="space-y-3">
          {items.map((doctrine) => (
            <div key={doctrine.id}>
              {editingId === doctrine.id ? (
                <DoctrineEditor
                  doctrine={doctrine}
                  onSave={async (d) => save(d, 'Doctrine saved')}
                  onCancel={() => setEditingId(null)}
                  onDelete={async () => {
                    const ok = await remove(doctrine.id);
                    if (ok) setEditingId(null);
                    return ok;
                  }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingId(doctrine.id)}
                  className="w-full text-left flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)')}
                >
                  <div>
                    <span className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase">
                      {doctrine.tag}
                    </span>
                    <h3
                      className="font-cormorant text-cream mt-0.5"
                      style={{ fontSize: '1.3rem' }}
                    >
                      {doctrine.name}
                    </h3>
                    <p className="text-text-muted mt-1" style={{ fontSize: '0.85rem' }}>
                      {doctrine.description.slice(0, 100)}
                      {doctrine.description.length > 100 ? '…' : ''}
                    </p>
                  </div>
                  <span className="font-cinzel text-gold-dim text-xs tracking-widest uppercase ml-4 flex-shrink-0">
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
