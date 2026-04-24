import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getAdminSession } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Read pathname from middleware-set header (Next 14 doesn't expose it directly to layouts).
  // Falls back to a referer/url heuristic. Critically: the /admin/login page must skip auth so it
  // can render the login form — otherwise auth-redirect loops on itself.
  const hdrs = await headers();
  const pathname =
    hdrs.get('x-invoke-path') ||
    hdrs.get('next-url') ||
    hdrs.get('x-pathname') ||
    '';

  const isLoginRoute = pathname.endsWith('/admin/login') || pathname === '/admin/login';
  const isAuthenticated = await getAdminSession();

  if (!isAuthenticated && !isLoginRoute) {
    redirect('/admin/login');
  }

  // Login page renders chrome-less so it doesn't show the sidebar before sign-in.
  if (isLoginRoute) {
    return <div style={{ background: '#06080f', minHeight: '100vh' }}>{children}</div>;
  }

  return (
    <div style={{ background: '#06080f', minHeight: '100vh' }}>
      {/* Admin top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(6,8,15,0.95)', borderBottom: '1px solid rgba(201,168,76,0.15)', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-4">
          <span className="font-cinzel text-gold text-sm tracking-[0.2em]">✦ ADMIN</span>
          <span className="text-gold-dim">|</span>
          <span className="font-cinzel text-[0.7rem] tracking-[0.2em] uppercase text-gold-dim">ChristCornerstone</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="font-cinzel text-[0.7rem] tracking-[0.15em] uppercase text-text-muted no-underline hover:text-gold transition-colors"
          >
            View Site ↗
          </a>
          <a
            href="/api/admin/logout"
            className="font-cinzel text-[0.7rem] tracking-[0.15em] uppercase text-text-muted no-underline hover:text-red-400 transition-colors"
          >
            Logout
          </a>
        </div>
      </div>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <nav
          className="fixed left-0 top-16 bottom-0 w-56 overflow-y-auto py-8 px-4"
          style={{ background: 'rgba(15,22,40,0.5)', borderRight: '1px solid rgba(201,168,76,0.1)' }}
        >
          <div className="space-y-1">
            {[
              { label: 'Dashboard', href: '/admin', icon: '⊗' },
              { label: 'Doctrines', href: '/admin/doctrines', icon: '✠' },
              { label: 'Apologetics', href: '/admin/apologetics', icon: '🚶' },
              { label: 'Religions', href: '/admin/religions', icon: '🌍' },
              { label: 'Quotes', href: '/admin/quotes', icon: '"' },
              { label: 'Library', href: '/admin/library', icon: '📚' },
              { label: 'Daily Verses', href: '/admin/verses', icon: '📖' },
              { label: 'Media', href: '/admin/media', icon: '▶' },
              { label: 'Email', href: '/admin/email', icon: '✉' },
              { label: 'Site Settings', href: '/admin/settings', icon: '⚙' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline transition-all text-text-muted hover:text-gold hover:bg-[rgba(201,168,76,0.06)]"
                style={{ fontSize: '0.85rem' }}
              >
                <span style={{ fontSize: '0.9rem', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                <span className="font-cinzel tracking-[0.1em] uppercase" style={{ fontSize: '0.72rem' }}>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="ml-56 flex-1 min-h-[calc(100vh-4rem)] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
