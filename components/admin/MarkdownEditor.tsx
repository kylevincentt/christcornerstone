'use client';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// Dynamic import — react-md-editor requires window, so SSR is disabled.
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-lg flex items-center justify-center"
      style={{
        background: 'var(--deep-navy)',
        border: '1px solid rgba(201,168,76,0.2)',
        minHeight: '300px',
        color: 'var(--text-muted)',
        fontFamily: 'Lato, sans-serif',
        fontSize: '0.85rem',
      }}
    >
      Loading editor…
    </div>
  ),
});

interface Props {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  preview?: 'live' | 'edit' | 'preview';
}

/**
 * Markdown editor for long-form content fields. Dark themed to match the admin shell.
 * Stored content is plain markdown text — the public-site renderers parse markdown-flavored
 * `**Heading**` blocks and `**bold**` spans (see app/doctrine/[slug]/page.tsx).
 */
export default function MarkdownEditor({
  value,
  onChange,
  height = 480,
  preview = 'edit',
}: Props) {
  return (
    <div data-color-mode="dark" className="cc-md-editor">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v || '')}
        height={height}
        preview={preview}
        visibleDragbar={false}
        textareaProps={{
          placeholder:
            'Use **Heading** on its own line for section headings; **bold** for emphasis. Paragraphs separated by blank lines.',
          spellCheck: true,
        }}
      />
      <style jsx global>{`
        .cc-md-editor .w-md-editor {
          background: var(--deep-navy);
          color: var(--cream);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 8px;
          --md-editor-box-shadow-color: transparent;
        }
        .cc-md-editor .w-md-editor-toolbar {
          background: rgba(15, 22, 40, 0.8);
          border-bottom: 1px solid rgba(201, 168, 76, 0.15);
        }
        .cc-md-editor .w-md-editor-toolbar ul li button {
          color: var(--text-light);
        }
        .cc-md-editor .w-md-editor-toolbar ul li button:hover {
          color: var(--gold);
          background: rgba(201, 168, 76, 0.08);
        }
        .cc-md-editor .w-md-editor-text-input,
        .cc-md-editor .w-md-editor-text,
        .cc-md-editor .w-md-editor-text-pre {
          color: var(--cream) !important;
          background: transparent !important;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        .cc-md-editor .w-md-editor-preview {
          background: rgba(10, 14, 26, 0.6);
          color: var(--text-light);
        }
        .cc-md-editor .wmde-markdown {
          background: transparent;
          color: var(--text-light);
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .cc-md-editor .wmde-markdown strong {
          color: var(--gold-light);
        }
        .cc-md-editor .wmde-markdown h1,
        .cc-md-editor .wmde-markdown h2,
        .cc-md-editor .wmde-markdown h3 {
          color: var(--cream);
          border-bottom-color: rgba(201, 168, 76, 0.2);
        }
      `}</style>
    </div>
  );
}
