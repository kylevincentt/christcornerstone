import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/admin/login', 'https://christcornerstone.org'));
  response.cookies.delete('admin_session');
  return response;
}