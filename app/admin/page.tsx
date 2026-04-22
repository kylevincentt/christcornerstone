import Link from 'next/link';
import { DOCTRINES, APOLOGETICS_QUESTIONS, QUOTES, RELIGIONS } from '@/lib/data';

export default function AdminDashboard() {
  const stats = [
    { label: 'Doctrines', count: DOCTRINES.length, href: '/admin/doctrines', icon: '✠' },
    { label: 'Apologetics Q&As', count: APOLOGETICS_QUESTIONS.length, href: '/admin/apologetics', icon: '🚶' },
    { label: 'Quotes', count: QUOTES.length, href: '/admin/quotes', icon: '"' },
    { label: 'Religions', count: RELIGIONS.length, href: '/admin/religions', icon: '🌍' },
  ];

  const quickLinks = [
    { label: 'Edit Daily Verse', href: '/admin/verses', desc: 'Change or schedule the daily verse' },
    { label: 'Add YouTube Video', href: '/admin/media', desc: 'Embed a YouTube video on the site' },
    { label: 'Add X Post', href: '/admin/media', desc: 'Embed a tweet/X post on the site' },
    { label: 'Send Email', href: '/admin/email', desc: 'Send newsletter to all subscribers' },
    { label: 'Site Settings', href: '/admin/settings', desc: 'Edit site title, description, and more' },
  ];

  return (
    <div>
      <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: '2.5rem', fontWeight: 300 }}>
        Dashboard
      </h1>
      <p className="text-text-muted mb-10" style={{ fontSize: '1rem' }}>
        Welcome back. Manage all ChristCornerstone content from here.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="block no-underline rounded-2xl p-6 transition-all hover:-translate-y-0.5"
            style={{
              background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)')}
          >
            <span className="text-3xl block mb-3">{stat.icon}</span>
            <p className="font-cormorant text-cream" style={{ fontSize: '2rem', fontWeight: 600 }}>
              {stat.count}
            </p>
            <p className="font-cinzel text-gold-dim tracking-[0.1em] uppercase" style={{ fontSize: '0.7rem' }}>
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-4" style={{ fontSize: '0.75rem' }}>
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {quickLinks.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="block no-underline rounded-xl p-5 transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)')}
          >
            <p className="font-cinzel text-gold tracking-[0.1em] uppercase mb-1.5" style={{ fontSize: '0.78rem' }}>
              {link.label}
            </p>
            <p className="text-text-muted" style={{ fontSize: '0.88rem' }}>{link.desc}</p>
          </Link>
        ))}
      </div>

      {/* Help */}
      <div
        className="rounded-2xl p-7"
        style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.08)' }}
      >
        <h2 className="font-cormorant text-cream mb-3" style={{ fontSize: '1.4rem', fontWeight: 600 }}>
          How to Edit Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
          <div>
            <p className="text-gold-light mb-1 font-semibold">Editing Existing Content</p>
            <p>Use the sidebar to navigate to any content type. Click any item to edit it inline — changes save immediately.</p>
          </div>
          <div>
            <p className="text-gold-light mb-1 font-semibold">Adding New Content</p>
            <p>Each section has an &quot;Add New&quot; button at the top. Fill in the fields and click Save — it&apos;ll appear on the site right away.</p>
          </div>
          <div>
            <p className="text-gold-light mb-1 font-semibold">YouTube & X Embeds</p>
            <p>Go to Media → paste the YouTube URL or X post URL → choose which page section to display it on.</p>
          </div>
          <div>
            <p className="text-gold-light mb-1 font-semibold">Email Newsletter</p>
            <p>Go to Email → compose your message → Send to all subscribers. Or schedule the daily verse automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
}