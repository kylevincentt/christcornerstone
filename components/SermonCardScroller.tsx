'use client';

import { useRef, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function SermonCardScroller({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 16);
  }

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 390, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {children}
      </div>

      {/* Right-edge arrow hint */}
      {canScrollRight && (
        <div
          className="absolute top-0 right-0 h-full pointer-events-none"
          style={{
            width: '80px',
            background: 'linear-gradient(to right, transparent, var(--midnight))',
            zIndex: 10,
          }}
        >
          <button
            onClick={scrollRight}
            aria-label="Scroll right for more sermons"
            className="pointer-events-auto absolute flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              width: '38px',
              height: '38px',
              top: '50%',
              right: '12px',
              transform: 'translateY(-50%)',
              background: 'rgba(var(--gold-rgb), 0.14)',
              border: '1px solid rgba(var(--gold-rgb), 0.4)',
              color: 'var(--gold)',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
