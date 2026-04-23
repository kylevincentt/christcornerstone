import Link from 'next/link';
import EmailSignup from './EmailSignup';

export default function Footer() {
  return (
    <footer style={{ background: '#06080f', borderTop: '1px solid rgba(201,168,76,0.12)' }} className="px-4 sm:px-8 lg:px-16 pt-12 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Email signup banner */}
        <div
          className="rounded-2xl p-10 mb-12 text-center"
          style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <span className="section-label block mb-3">Daily Verse & Study Material</span>
          <h3 className="font-cormorant text-3xl font-light text-cream mb-2">
            Begin each day with <em className="not-italic text-gold-light">Scripture</em>
          </h3>
          <p className="text-text-muted mb-8 max-w-md mx-auto leading-relaxed">
            Receive a daily verse and curated study material — delivered quietly to your inbox each morning.
          </p>
          <EmailSignup />
        </div>

        {/* Footer grid */}
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
                ['Doctrine', '/doctrine'],
                ['Apologetics', '/apologetics'],
                ['Religions', '/religions'],
                ['Scripture', '/scripture'],
                ['Library', '/library'],
                ['Quotes', '/quotes'],
                ['Start Here', '/start-here'],
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
          style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
        >
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} ChristCornerstone.org — Built with purpose and care.
          </p>
          <span className="text-gold-dim text-2xl">✝</span>
        </div>
      </div>
    </footer>
  );
}