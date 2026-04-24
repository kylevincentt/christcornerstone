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
import type { LibraryItem } from '@/types';

const TABS: LibraryItem['tab'][] = ['bibles', 'study', 'theologians', 'media'];

const EMPTY: LibraryItem = {
  id: '',
  tab: 'bibles',
  icon: '📖',
  name: '',
  description: '',
  url: '',
  link_text: 'Visit →',
  sort_order: 0,
};

function LibraryEditor({
  item,
  onSave,
  onCancel,
  onDelete,
  isNew,
}: {
  item: LibraryItem;
  onSave: (l: LibraryItem) => Promise<boolean>;
  onCancel: () => void;
  onDelete?: () => Promise<boolean>;
  isNew?: boolean;
}) {
  const [form, setForm] = useState(item);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof LibraryItem>(key: K, val: LibraryItem[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <div
      className="space-y-4 p-6 rounded-2xl"
      style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FieldLabel>Section / Tab</FieldLabel>
          <select
            value={form.tab}
            onChange={(e) => set('tab', e.target.value as LibraryItem['tab'])}
            style={{
              background: 'var(--deep-navy)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '8px',
              color: 'var(--cream)',
              padding: '0.7rem 1rem',
              fontSize: '0.95rem',
              width: '100%',
              outline: 'none',
              fontFamily: 'Lato, sans-serif',
            }}
          >
            {TABS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Icon</FieldLabel>
          <TextInput value={form.icon} onChange={(v) => set('icon', v)} placeholder="📖" />
        </div>
        <div>
          <FieldLabel>Sort Order</FieldLabel>
          <NumberInput value={form.sort_order} onChange={(v) => set('sort_order', v)} />
        </div>
      </div>
      <div>
        <FieldLabel>Name</FieldLabel>
        <TextInput value={form.name} onChange={(v) => set('name', v)} placeholder="Bible Gateway" />
      </div>
      <div>
        <FieldLabel>Description</FieldLabel>
        <TextArea
          value={form.description}
          onChange={(v) => set('description', v)}
          placeholder="Read and search the Bible in over 200 versions…"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FieldLabel>URL</FieldLabel>
          <TextInput
            value={form.url}
            onChange={(v) => set('url', v)}
            placeholder="https://www.biblegateway.com"
          />
        </div>
        <div>
          <FieldLabel>Link Text</FieldLabel>
          <TextInput value={form.link_text} onChange={(v) => set('link_text', v)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-end items-center pt-4">
        {!isNew && onDelete && (
          <div className="mr-auto">
            <DangerGhostButton
              onClick={async () => {
                if (!confirm('Delete this resource?')) return;
                await onDelete();
              }}
            >
              Delete
            </DangerGhostButton>
          </div>
        )}
        <GhostButton onClick={onCancel}>Cancel</GhostButton>
        <PrimaryButton
          disabled={saving || !form.name || !form.url}
          onClick={async () => {
            setSaving(true);
            const ok = await onSave(form);
            setSaving(false);
            if (ok) onCancel();
          }}
        >
          {saving ? 'Saving…' : isNew ? 'Add Resource' : 'Save Resource'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function AdminLibraryPage() {
  const { items, loading, error, saved, save, remove } =
    useAdminContent<LibraryItem>('library_items');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [filterTab, setFilterTab] = useState<LibraryItem['tab'] | 'all'>('all');

  const visible = filterTab === 'all' ? items : items.filter((i) => i.tab === filterTab);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-cormorant text-cream" style={{ fontSize: '2.2rem', fontWeight: 300 }}>
            Library
          </h1>
          <p className="text-text-muted mt-1" style={{ fontSize: '0.9rem' }}>
            Curated resources shown on the Library page.
          </p>
        </div>
        {!creating && <PrimaryButton onClick={() => setCreating(true)}>+ New Resource</PrimaryButton>}
      </div>

      <SaveBanner message={saved} />
      <ErrorBanner message={error} />

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', ...TABS] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilterTab(t)}
            className="font-cinzel tracking-[0.15em] uppercase px-3 py-1.5 rounded-full transition-colors"
            style={{
              fontSize: '0.7rem',
              background: filterTab === t ? 'var(--gold)' : 'transparent',
              color: filterTab === t ? 'var(--midnight)' : 'var(--text-muted)',
              border: '1px solid rgba(201,168,76,0.25)',
              cursor: 'pointer',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {creating && (
        <div className="mb-6">
          <LibraryEditor
            isNew
            item={{ ...EMPTY, id: `l-${Date.now()}`, sort_order: items.length + 1 }}
            onSave={async (l) => save(l, 'Resource added')}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : visible.length === 0 && !creating ? (
        <EmptyState
          title={filterTab === 'all' ? 'No resources yet' : `No resources in ${filterTab}`}
          hint={filterTab === 'all' ? 'Run npm run db:setup to seed initial content.' : undefined}
        />
      ) : (
        <div className="space-y-3">
          {visible.map((l) => (
            <div key={l.id}>
              {editingId === l.id ? (
                <LibraryEditor
                  item={l}
                  onSave={async (u) => save(u, 'Resource saved')}
                  onCancel={() => setEditingId(null)}
                  onDelete={async () => {
                    const ok = await remove(l.id);
                    if (ok) setEditingId(null);
                    return ok;
                  }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingId(l.id)}
                  className="w-full text-left flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)')}
                >
                  <span className="text-2xl flex-shrink-0">{l.icon}</span>
                  <div className="flex-1">
                    <p className="font-cormorant text-cream" style={{ fontSize: '1.1rem' }}>
                      {l.name}
                    </p>
                    <p className="font-cinzel text-gold-dim text-[0.62rem] tracking-[0.2em] uppercase">
                      {l.tab}
                    </p>
                    <p className="text-text-muted mt-1" style={{ fontSize: '0.82rem' }}>
                      {l.description.slice(0, 100)}
                      {l.description.length > 100 ? '…' : ''}
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
