import { NextRequest, NextResponse } from 'next/server';

/**
 * Forwards the request pathname into a header so server components and layouts
 * can read it (Next 14 doesn't expose pathname directly to layouts).
 *
 * Used by app/admin/layout.tsx to skip the auth gate when rendering /admin/login,
 * preventing an infinite redirect loop.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on every page route except Next internals and static assets.
  matcher: ['/((?!_next/static|_next/image|favicon|api/admin/logout).*)'],
};

