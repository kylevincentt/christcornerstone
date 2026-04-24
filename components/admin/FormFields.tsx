'use client';
import type { ReactNode, CSSProperties } from 'react';

export const FIELD_STYLE: CSSProperties = {
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

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={FIELD_STYLE}
    />
  );
}

export function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
      style={FIELD_STYLE}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  minHeight = 80,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
}) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: `${minHeight}px` }}
    />
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="font-cinzel tracking-[0.12em] uppercase text-midnight bg-gold px-6 py-2.5 rounded-lg transition-colors hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ fontSize: '0.75rem', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-cinzel tracking-[0.12em] uppercase text-text-muted px-5 py-2 rounded-lg transition-colors hover:text-cream"
      style={{ fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {children}
    </button>
  );
}

export function DangerGhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-cinzel tracking-[0.12em] uppercase text-text-muted px-3 py-1.5 rounded-lg transition-colors hover:text-red-400"
      style={{ fontSize: '0.7rem', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {children}
    </button>
  );
}

export function SaveBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="mb-4 p-4 rounded-xl text-sm"
      style={{
        background: 'rgba(201,168,76,0.1)',
        border: '1px solid rgba(201,168,76,0.3)',
        color: 'var(--gold)',
      }}
    >
      ✓ {message}
    </div>
  );
}

export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="mb-4 p-4 rounded-xl text-sm"
      style={{
        background: 'rgba(220,80,80,0.08)',
        border: '1px solid rgba(220,80,80,0.3)',
        color: '#ff8a8a',
      }}
    >
      {message}
    </div>
  );
}

export function LoadingState() {
  return (
    <div
      className="p-8 rounded-xl text-center text-text-muted"
      style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.08)' }}
    >
      Loading…
    </div>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div
      className="p-8 rounded-xl text-center"
      style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.08)' }}
    >
      <p className="font-cormorant text-cream" style={{ fontSize: '1.2rem' }}>{title}</p>
      {hint && <p className="text-text-muted mt-2" style={{ fontSize: '0.9rem' }}>{hint}</p>}
    </div>
  );
}
