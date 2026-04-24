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
import type { ApologeticsQuestion, ApologeticsCategory } from '@/types';
import { useEffect } from 'react';

const EMPTY: ApologeticsQuestion = {
  id: '',
  category: 'philosophical',
  question: '',
  objection: '',
  response: '',
  go_deeper: '',
  sort_order: 0,
};

function QuestionEditor({
  question,
  categories,
  onSave,
  onCancel,
  onDelete,
  isNew,
}: {
  question: ApologeticsQuestion;
  categories: ApologeticsCategory[];
  onSave: (q: ApologeticsQuestion) => Promise<boolean>;
  onCancel: () => void;
  onDelete?: () => Promise<boolean>;
  isNew?: boolean;
}) {
  const [form, setForm] = useState(question);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof ApologeticsQuestion>(key: K, val: ApologeticsQuestion[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <div
      className="space-y-4 p-6 rounded-2xl"
      style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FieldLabel>Category</FieldLabel>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            className="w-full"
            style={{
              background: 'var(--deep-navy)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '8px',
              color: 'var(--cream)',
              padding: '0.7rem 1rem',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'Lato, sans-serif',
            }}
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Sort Order</FieldLabel>
          <NumberInput value={form.sort_order} onChange={(v) => set('sort_order', v)} />
        </div>
      </div>
      <div>
        <FieldLabel>Question</FieldLabel>
        <TextInput
          value={form.question}
          onChange={(v) => set('question', v)}
          placeholder="If God is good, why is there evil and suffering?"
        />
      </div>
      <div>
        <FieldLabel>The Objection</FieldLabel>
        <TextArea
          value={form.objection}
          onChange={(v) => set('objection', v)}
          placeholder="A loving, all-powerful God could not allow such horrors…"
        />
      </div>
      <div>
        <FieldLabel>The Response</FieldLabel>
        <TextArea
          value={form.response}
          onChange={(v) => set('response', v)}
          minHeight={140}
          placeholder="The free-will defense, the soul-making theodicy…"
        />
      </div>
      <div>
        <FieldLabel>Go Deeper (recommended reading)</FieldLabel>
        <TextArea
          value={form.go_deeper}
          onChange={(v) => set('go_deeper', v)}
          placeholder="Alvin Plantinga, God, Freedom, and Evil · C.S. Lewis, The Problem of Pain"
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-end items-center pt-4">
        {!isNew && onDelete && (
          <div className="mr-auto">
            <DangerGhostButton
              onClick={async () => {
                if (!confirm('Delete this question?')) return;
                await onDelete();
              }}
            >
              Delete
            </DangerGhostButton>
          </div>
        )}
        <GhostButton onClick={onCancel}>Cancel</GhostButton>
        <PrimaryButton
          disabled={saving || !form.question}
          onClick={async () => {
            setSaving(true);
            const ok = await onSave(form);
            setSaving(false);
            if (ok) onCancel();
          }}
        >
          {saving ? 'Saving…' : isNew ? 'Create Question' : 'Save Question'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function AdminApologeticsPage() {
  const questions = useAdminContent<ApologeticsQuestion>('apologetics_questions');
  const [categories, setCategories] = useState<ApologeticsCategory[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Load categories independently for the dropdown
  useEffect(() => {
    fetch('/api/admin/content?type=apologetics_categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.items || []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-cormorant text-cream" style={{ fontSize: '2.2rem', fontWeight: 300 }}>
            Apologetics Questions
          </h1>
          <p className="text-text-muted mt-1" style={{ fontSize: '0.9rem' }}>
            Hard questions and their structured answers, grouped by category.
          </p>
        </div>
        {!creating && (
          <PrimaryButton onClick={() => setCreating(true)}>+ New Question</PrimaryButton>
        )}
      </div>

      <SaveBanner message={questions.saved} />
      <ErrorBanner message={questions.error} />

      {creating && (
        <div className="mb-6">
          <QuestionEditor
            isNew
            categories={categories}
            question={{
              ...EMPTY,
              id: `q-${Date.now()}`,
              sort_order: questions.items.length + 1,
            }}
            onSave={async (q) => questions.save(q, 'Question created')}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {questions.loading ? (
        <LoadingState />
      ) : questions.items.length === 0 && !creating ? (
        <EmptyState title="No questions yet" hint="Run npm run db:setup to seed initial content." />
      ) : (
        <div className="space-y-3">
          {questions.items.map((q) => (
            <div key={q.id}>
              {editingId === q.id ? (
                <QuestionEditor
                  question={q}
                  categories={categories}
                  onSave={async (updated) => questions.save(updated, 'Question saved')}
                  onCancel={() => setEditingId(null)}
                  onDelete={async () => {
                    const ok = await questions.remove(q.id);
                    if (ok) setEditingId(null);
                    return ok;
                  }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingId(q.id)}
                  className="w-full text-left flex items-center justify-between p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)')}
                >
                  <div className="flex-1">
                    <span className="font-cinzel text-gold-dim text-[0.62rem] tracking-[0.2em] uppercase">
                      {categories.find((c) => c.slug === q.category)?.title || q.category}
                    </span>
                    <h3 className="font-cormorant text-cream mt-0.5" style={{ fontSize: '1.15rem' }}>
                      {q.question}
                    </h3>
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
