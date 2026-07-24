import Link from 'next/link';
import DailyVerseSignup from './DailyVerseSignup';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--footer-bg)',
        borderTop: '1px solid rgba(var(--gold-rgb), 0.12)',
      }}
      className="px-4 sm:px-8 lg:px-16 pt-12 pb-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Audit L3: per-session dismissable signup card. */}
        <DailyVerseSignup />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          <div className="md:col-span-2">
            <p className="font-cinzel text-gold text-lg tracking-[0.15em] mb-4">CHRISTCORNERSTONE</p>
            <p className="font-cormorant text-text-muted leading-relaxed text-lg">
              A modern, aesthetic home for exploring the Christian faith — built for the curious and the convinced alike.
              Truth doesn&apos;t fear questions.
            </p>
          </div>
          <div>
            <p className="font-cinzel text-[0.75rem] tracking-[0.25em] uppercase text-gold-dim mb-4">Explore</p>
            <ul className="space-y-2 list-none">
              {[
                ['Start Here', '/start-here'],
                ['Doctrine', '/doctrine'],
                ['Revelation Study', '/revelation-study'],
                ['Weekly Discussion', '/weekly-discussion'],
                ['Apologetics', '/apologetics'],
                ['Religions', '/religions'],
                ['Scripture', '/scripture'],
                ['Library', '/library'],
                ['Quotes', '/quotes'],
                ['Videos', '/videos'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-text-muted no-underline hover:text-gold-light transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-cinzel text-[0.75rem] tracking-[0.25em] uppercase text-gold-dim mb-4">Resources</p>
            <ul className="space-y-2 list-none">
              {[
                ['Bible Gateway', 'https://biblegateway.com'],
                ['Blue Letter Bible', 'https://blueletterbible.org'],
                ['The Bible Project', 'https://bibleproject.com'],
                ['Reasonable Faith', 'https://reasonablefaith.org'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-text-muted no-underline hover:text-gold-light transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 max-w-6xl mx-auto"
          style={{ borderTop: '1px solid rgba(var(--gold-rgb), 0.08)' }}
        >
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} ChristCornerstone.org — Built with purpose and care.
          </p>
          {/* Audit L2: cross is now labeled (aria + tooltip) and links to /start-here. */}
          <Link
            href="/start-here"
            aria-label="Start your faith journey"
            title="Start Here"
            className="text-gold-dim text-2xl no-underline hover:text-gold transition-colors"
          >
            ✝
          </Link>
        </div>
      </div>
    </footer>
  );
}
