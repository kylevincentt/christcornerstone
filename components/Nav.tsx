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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 lg:px-16 py-5 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(var(--page-bg), 0.98)'
            : 'linear-gradient(to bottom, rgba(var(--page-bg), 0.98), transparent)',
          borderBottom: '1px solid rgba(var(--gold-rgb), 0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Link href="/" className="font-cinzel text-gold text-xl font-semibold tracking-[0.15em] no-underline flex items-center gap-1" aria-label="ChristCornerstone home">
          CHRIST<span className="inline-block w-1.5 h-1.5 bg-gold rounded-full mx-1.5 mb-0.5 align-middle" aria-hidden="true" />CORNERSTONE
        </Link>

        <ul className="hidden lg:flex gap-10 list-none items-center">
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
          <li>
            <Link href="/start-here" aria-current={isActivePath(pathname, '/start-here') ? 'page' : undefined}
              className="font-cinzel text-[0.8rem] font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-6 py-2.5 rounded-full no-underline transition-all duration-300 hover:bg-gold-light">
              Start Here
            </Link>
          </li>
        </ul>

        <div className="lg:hidden flex items-center gap-3">
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
        className="fixed inset-0 z-[150] flex flex-col items-center justify-center transition-opacity duration-300"
        style={{ background: 'rgba(var(--page-bg), 0.97)', backdropFilter: 'blur(12px)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none' }}>
        <p className="font-cinzel text-gold text-xl tracking-[0.2em] mb-8">✦ CHRISTCORNERSTONE</p>
        {([['Home', '/'], ...NAV_LINKS] as ReadonlyArray<[string, string]>).map(([label, href]) => {
          const active = isActivePath(pathname, href);
          return (
            <Link key={label} href={href} onClick={closeMenu} aria-current={active ? 'page' : undefined}
              className={'font-cinzel text-2xl tracking-[0.18em] uppercase no-underline py-5 px-8 transition-colors duration-300 hover:text-gold w-full text-center max-w-sm first:border-t ' + (active ? 'text-gold' : 'text-text-light')}
              style={{ borderBottom: '1px solid rgba(var(--gold-rgb), 0.08)' }}>
              {label}
            </Link>
          );
        })}
        <Link href="/start-here" onClick={closeMenu}
          className="font-cinzel font-bold text-midnight bg-gold rounded-full mt-8 px-10 py-4 no-underline hover:bg-gold-light transition-all">
          Start Here
        </Link>
      </div>
    </>
  );
}
