'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_LINKS: ReadonlyArray<[string, string]> = [
  ['Doctrine', '/doctrine'],
  ['Apologetics', '/apologetics'],
  ['Religions', '/religions'],
  ['Scripture', '/scripture'],
  ['Library', '/library'],
  ['Quotes', '/quotes'],
  ['Videos', '/videos'],
];

function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [menuOpen]);

  // Close drawer on Escape key (a11y).
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Drawer links — Home + the seven public NAV_LINKS. Tracked here so the
  // last index is known for the audit-H8 last-link border strip.
  const drawerLinks: ReadonlyArray<[string, string]> = [['Home', '/'], ...NAV_LINKS];
  const drawerLast = drawerLinks.length - 1;

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-3 px-3 sm:px-4 lg:px-16 py-5 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(var(--page-bg), 0.98)'
            : 'linear-gradient(to bottom, rgba(var(--page-bg), 0.98), transparent)',
          borderBottom: '1px solid rgba(var(--gold-rgb), 0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Link href="/" className="font-cinzel text-gold font-semibold no-underline flex items-center gap-1 min-w-0 text-[0.95rem] tracking-[0.08em] sm:text-base sm:tracking-[0.12em] lg:text-xl lg:tracking-[0.15em] whitespace-nowrap" aria-label="ChristCornerstone home">
          CHRIST<span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gold rounded-full mx-1 sm:mx-1.5 mb-0.5 align-middle" aria-hidden="true" />CORNERSTONE
        </Link>

        <ul className="hidden lg:flex gap-6 xl:gap-10 list-none items-center">
          {NAV_LINKS.map(([label, href]) => {
            const active = isActivePath(pathname, href);
            return (
              <li key={label}>
                <Link href={href} aria-current={active ? 'page' : undefined}
                  className={'font-cinzel text-sm font-normal tracking-[0.15em] uppercase no-underline transition-colors duration-300 hover:text-gold relative group ' + (active ? 'text-gold' : 'text-text-light')}>
                  {label}
                  <span className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full" style={{ width: active ? '100%' : '0' }} />
                </Link>
              </li>
            );
          })}
          <li className="ml-2"><ThemeToggle /></li>
          <li className="flex-shrink-0">
            <Link
              href="/start-here"
              aria-current={isActivePath(pathname, '/start-here') ? 'page' : undefined}
              className="font-cinzel text-[0.8rem] font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-6 py-2.5 rounded-full no-underline transition-all duration-300 hover:bg-gold-light whitespace-nowrap"
            >
              Start Here
            </Link>
          </li>
        </ul>

        <div className="lg:hidden flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <ThemeToggle />
          <button className="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 z-[200]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen} aria-controls="mobile-menu">
            <span className="block w-6 h-0.5 bg-gold rounded transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span className="block w-6 h-0.5 bg-gold rounded transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }} />
            <span className="block w-6 h-0.5 bg-gold rounded transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" role="dialog" aria-modal={menuOpen || undefined} aria-label="Mobile navigation"
        className="fixed inset-0 z-[150] transition-opacity duration-300"
        style={{ background: 'rgba(var(--page-bg), 0.97)', backdropFilter: 'blur(12px)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none' }}
        onClick={closeMenu}>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); closeMenu(); }}
          aria-label="Close menu"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center justify-center w-11 h-11 bg-transparent border-none cursor-pointer text-gold hover:text-gold-light transition-colors duration-200 z-[210] rounded-full"
          style={{ border: '1px solid rgba(var(--gold-rgb), 0.25)' }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center h-full px-4"
        >
          <p className="font-cinzel text-gold text-base tracking-[0.2em] mb-4">&bull; CHRISTCORNERSTONE</p>
          <Link href="/start-here" onClick={closeMenu}
            className="font-cinzel font-bold text-midnight bg-gold rounded-full mb-4 px-8 py-3 no-underline hover:bg-gold-light transition-all text-sm tracking-[0.15em] uppercase whitespace-nowrap">
            Start Here
          </Link>
          {drawerLinks.map(([label, href], i) => {
            const active = isActivePath(pathname, href);
            const isLast = i === drawerLast;
            return (
              <Link key={label} href={href} onClick={closeMenu} aria-current={active ? 'page' : undefined}
                className={'font-cinzel text-lg tracking-[0.18em] uppercase no-underline py-2.5 px-8 transition-colors duration-300 hover:text-gold w-full text-center max-w-sm first:border-t ' + (active ? 'text-gold' : 'text-text-light')}
                style={{ borderBottom: isLast ? 'none' : '1px solid rgba(var(--gold-rgb), 0.08)' }}>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
