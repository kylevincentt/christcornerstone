import Link from 'next/link';
import {
  getDoctrines,
  getApologeticsQuestions,
  getReligions,
  getQuotes,
  getLibraryItems,
  getDailyVerses,
} from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [doctrines, apoloQs, religions, quotes, library, verses] = await Promise.all([
    getDoctrines(),
    getApologeticsQuestions(),
    getReligions(),
    getQuotes(),
    getLibraryItems(),
    getDailyVerses(),
  ]);

  const stats = [
    { label: 'Doctrines', count: doctrines.length, href: '/admin/doctrines', icon: '✠' },
    { label: 'Apologetics Q&As', count: apoloQs.length, href: '/admin/apologetics', icon: '🚶' },
    { label: 'Religions', count: religions.length, href: '/admin/religions', icon: '🌍' },
    { label: 'Quotes', count: quotes.length, href: '/admin/quotes', icon: '"' },
    { label: 'Library Items', count: library.length, href: '/admin/library', icon: '📚' },
    { label: 'Daily Verses', count: verses.length, href: '/admin/verses', icon: '📖' },
  ];

  const quickLinks = [
    { label: 'Edit Doctrines', href: '/admin/doctrines', desc: 'Add or edit core doctrine cards and full articles' },
    { label: 'Edit Apologetics', href: '/admin/apologetics', desc: 'Add or edit hard questions and structured responses' },
    { label: 'Edit Religions', href: '/admin/religions', desc: 'Update comparison points and full articles' },
    { label: 'Add YouTube Video', href: '/admin/media', desc: 'Embed a YouTube video on the site' },
    { label: 'Send Newsletter', href: '/admin/email', desc: 'Send broadcast email to all subscribers' },
    { label: 'Site Settings', href: '/admin/settings', desc: 'Edit hero text, site title, and metadata' },
  ];

  return (
    <div>
      <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: '2.5rem', fontWeight: 300 }}>
        Dashboard
      </h1>
      <p className="text-text-muted mb-10" style={{ fontSize: '1rem' }}>
        Welcome back. Manage all ChristCornerstone content from here. Edits go live in seconds.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="hover-gold-card block no-underline rounded-2xl p-5 transition-all hover:-translate-y-0.5"
            style={{
              background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <span className="text-2xl block mb-2">{stat.icon}</span>
            <p className="font-cormorant text-cream" style={{ fontSize: '1.7rem', fontWeight: 600 }}>
              {stat.count}
            </p>
            <p
              className="font-cinzel text-gold-dim tracking-[0.1em] uppercase"
              style={{ fontSize: '0.65rem' }}
            >
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2
        className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-4"
        style={{ fontSize: '0.75rem' }}
      >
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {quickLinks.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="hover-gold-border-soft block no-underline rounded-xl p-5 transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
          >
            <p
              className="font-cinzel text-gold tracking-[0.1em] uppercase mb-1.5"
              style={{ fontSize: '0.78rem' }}
            >
              {link.label}
            </p>
            <p className="text-text-muted" style={{ fontSize: '0.88rem' }}>
              {link.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Help */}
      <div
        className="rounded-2xl p-7"
        style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.08)' }}
      >
        <h2
          className="font-cormorant text-cream mb-3"
          style={{ fontSize: '1.4rem', fontWeight: 600 }}
        >
          How Content Editing Works
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-muted"
          style={{ fontSize: '0.95rem', lineHeight: 1.7 }}
        >
          <div>
            <p className="text-gold-light mb-1 font-semibold">Edit a card</p>
            <p>
              Click any item in a list to open the editor. Save — and the public site updates within seconds, no rebuild needed.
            </p>
          </div>
          <div>
            <p className="text-gold-light mb-1 font-semibold">Long-form articles</p>
            <p>
              Doctrine and Religion full articles use a markdown editor with live preview. Use{' '}
              <code className="text-gold">**Heading**</code> on its own line for section headings.
            </p>
          </div>
          <div>
            <p className="text-gold-light mb-1 font-semibold">First-time setup</p>
            <p>
              If a section is empty, run <code className="text-gold">npm run db:setup</code> locally to seed initial content from the codebase&apos;s defaults.
            </p>
          </div>
          <div>
            <p className="text-gold-light mb-1 font-semibold">Sort order</p>
            <p>
              Each item has a numeric Sort Order field — lower numbers appear first on the public site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
