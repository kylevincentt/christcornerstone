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
import type { Quote } from '@/types';

const EMPTY: Quote = {
  id: '',
  text: '',
  author: '',
  era: '',
  avatar_emoji: '✦',
  sort_order: 0,
};

function QuoteEditor({
  quote,
  onSave,
  onCancel,
  onDelete,
  isNew,
}: {
  quote: Quote;
  onSave: (q: Quote) => Promise<boolean>;
  onCancel: () => void;
  onDelete?: () => Promise<boolean>;
  isNew?: boolean;
}) {
  const [form, setForm] = useState(quote);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof Quote>(key: K, val: Quote[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <div
      className="space-y-4 p-6 rounded-2xl"
      style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}
    >
      <div>
        <FieldLabel>Quote Text</FieldLabel>
        <TextArea
          value={form.text}
          onChange={(v) => set('text', v)}
          minHeight={120}
          placeholder="You have made us for yourself, O Lord…"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Author</FieldLabel>
          <TextInput
            value={form.author}
            onChange={(v) => set('author', v)}
            placeholder="Augustine of Hippo"
          />
        </div>
        <div>
          <FieldLabel>Era / Source</FieldLabel>
          <TextInput
            value={form.era}
            onChange={(v) => set('era', v)}
            placeholder="354–430 AD · Confessions"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Avatar Emoji / Symbol</FieldLabel>
          <TextInput value={form.avatar_emoji} onChange={(v) => set('avatar_emoji', v)} />
        </div>
        <div>
          <FieldLabel>Sort Order</FieldLabel>
          <NumberInput value={form.sort_order} onChange={(v) => set('sort_order', v)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-end items-center pt-4">
        {!isNew && onDelete && (
          <div className="mr-auto">
            <DangerGhostButton
              onClick={async () => {
                if (!confirm('Delete this quote?')) return;
                await onDelete();
              }}
            >
              Delete
            </DangerGhostButton>
          </div>
        )}
        <GhostButton onClick={onCancel}>Cancel</GhostButton>
        <PrimaryButton
          disabled={saving || !form.text || !form.author}
          onClick={async () => {
            setSaving(true);
            const ok = await onSave(form);
            setSaving(false);
            if (ok) onCancel();
          }}
        >
          {saving ? 'Saving…' : isNew ? 'Add Quote' : 'Save Quote'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function AdminQuotesPage() {
  const { items, loading, error, saved, save, remove } = useAdminContent<Quote>('quotes');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-cormorant text-cream" style={{ fontSize: '2.2rem', fontWeight: 300 }}>
            Quotes
          </h1>
          <p className="text-text-muted mt-1" style={{ fontSize: '0.9rem' }}>
            Christian quotes that appear in the homepage carousel and on /quotes.
          </p>
        </div>
        {!creating && <PrimaryButton onClick={() => setCreating(true)}>+ New Quote</PrimaryButton>}
      </div>

      <SaveBanner message={saved} />
      <ErrorBanner message={error} />

      {creating && (
        <div className="mb-6">
          <QuoteEditor
            isNew
            quote={{ ...EMPTY, id: `q-${Date.now()}`, sort_order: items.length + 1 }}
            onSave={async (q) => save(q, 'Quote added')}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : items.length === 0 && !creating ? (
        <EmptyState title="No quotes yet" hint="Run npm run db:setup to seed initial content." />
      ) : (
        <div className="space-y-3">
          {items.map((q) => (
            <div key={q.id}>
              {editingId === q.id ? (
                <QuoteEditor
                  quote={q}
                  onSave={async (updated) => save(updated, 'Quote saved')}
                  onCancel={() => setEditingId(null)}
                  onDelete={async () => {
                    const ok = await remove(q.id);
                    if (ok) setEditingId(null);
                    return ok;
                  }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingId(q.id)}
                  className="w-full text-left p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)')}
                >
                  <p
                    className="font-cormorant text-cream-dark italic"
                    style={{ fontSize: '1.05rem' }}
                  >
                    &ldquo;{q.text.length > 140 ? q.text.slice(0, 140) + '…' : q.text}&rdquo;
                  </p>
                  <p
                    className="font-cinzel text-gold-dim tracking-[0.15em] uppercase mt-2"
                    style={{ fontSize: '0.7rem' }}
                  >
                    — {q.author} {q.era ? `· ${q.era}` : ''}
                  </p>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
