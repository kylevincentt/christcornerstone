'use client';
import { useState } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { LIBRARY_ITEMS } from '@/lib/data';
import type { LibraryItem } from '@/types';

const TABS: { key: LibraryItem['tab']; label: string }[] = [
  { key: 'bibles', label: 'Bibles Online' },
  { key: 'study', label: 'Study Tools' },
  { key: 'theologians', label: 'Theologians' },
  { key: 'media', label: 'Video & Podcast' },
];

export default function LibrarySection() {
  const [activeTab, setActiveTab] = useState<LibraryItem['tab']>('bibles');

  const items = LIBRARY_ITEMS.filter((item) => item.tab === activeTab);

  return (
    <section
      id="library"
      className="py-24 px-8 md:px-16"
      style={{ background: 'var(--deep-navy)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
    >
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto">
          <span className="section-label">Curated Resources</span>
          <h2 className="section-title">The Library</h2>
          <p className="text-text-light leading-relaxed mt-3" style={{ fontSize: '1.05rem', maxWidth: '560px' }}>
            Trusted tools, theologians, and materials — carefully selected to deepen your walk with God.
          </p>

          {/* Tabs */}
          <div
            className="flex gap-0 mt-8 mb-6 flex-wrap"
            style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="font-cinzel tracking-[0.15em] uppercase cursor-pointer border-none bg-transparent transition-all duration-300"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.9rem 1.6rem',
                  marginBottom: '-1px',
                  color: activeTab === tab.key ? 'var(--gold)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab.key ? '2px solid var(--gold)' : '2px solid transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 no-underline rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 group"
                style={{
                  background: 'var(--navy)',
                  border: '1px solid rgba(201,168,76,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <p className="font-cormorant text-cream" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {item.name}
                </p>
                <p className="text-text-muted leading-relaxed flex-1" style={{ fontSize: '0.95rem' }}>
                  {item.description}
                </p>
                <span
                  className="font-cinzel tracking-[0.15em] uppercase mt-3 transition-colors duration-300"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--gold-dim)',
                  }}
                >
                  {item.link_text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}