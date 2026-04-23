'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 lg:px-16 py-5 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(10,14,26,0.98)'
            : 'linear-gradient(to bottom, rgba(10,14,26,0.98), transparent)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="font-cinzel text-gold text-xl font-semibold tracking-[0.15em] no-underline flex items-center gap-1">
          CHRIST<span className="inline-block w-1.5 h-1.5 bg-gold rounded-full mx-1.5 mb-0.5 align-middle" />CORNERSTONE
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-10 list-none items-center">
          {[
            ['Doctrine', '/doctrine'],
            ['Apologetics', '/apologetics'],
            ['Religions', '/religions'],
            ['Scripture', '/scripture'],
            ['Library', '/library'],
            ['Quotes', '/quotes'],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                className="font-cinzel text-sm font-normal tracking-[0.15em] text-text-light uppercase no-underline transition-colors duration-300 hover:text-gold relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/start-here"
              className="font-cinzel text-[0.8rem] font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-6 py-2.5 rounded-full no-underline transition-all duration-300 hover:bg-gold-light"
            >
              Start Here
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 z-[200]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 bg-gold rounded transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-6 h-0.5 bg-gold rounded transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}
          />
          <span
            className="block w-6 h-0.5 bg-gold rounded transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-[150] flex flex-col items-center justify-center transition-opacity duration-300"
        style={{
          background: 'rgba(6,8,15,0.97)',
          backdropFilter: 'blur(12px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        <p className="font-cinzel text-gold text-xl tracking-[0.2em] mb-8">✦ CHRISTCORNERSTONE</p>
        {[
          ['Home', '/'],
          ['Doctrine', '/doctrine'],
          ['Apologetics', '/apologetics'],
          ['Religions', '/religions'],
          ['Scripture', '/scripture'],
          ['Library', '/library'],
          ['Quotes', '/quotes'],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            onClick={closeMenu}
            className="font-cinzel text-2xl tracking-[0.18em] uppercase text-text-light no-underline py-5 px-8 transition-colors duration-300 hover:text-gold border-b border-[rgba(201,168,76,0.08)] w-full text-center max-w-sm first:border-t"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/start-here"
          onClick={closeMenu}
          className="font-cinzel font-bold text-midnight bg-gold rounded-full mt-8 px-10 py-4 no-underline hover:bg-gold-light transition-all"
        >
          Start Here
        </Link>
      </div>
    </>
  );
}