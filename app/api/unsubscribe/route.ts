import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  if (!email) return NextResponse.redirect(new URL('/', request.url));

  if (supabaseAdmin) {
    await supabaseAdmin.from('email_subscribers').update({ active: false }).eq('email', email.toLowerCase());
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Unsubscribed — ChristCornerstone</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Cinzel:wght@400&display=swap" rel="stylesheet">
      <style>
        body { background: #0a0e1a; color: #f5efe0; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
        .wrap { max-width: 400px; padding: 2rem; }
        .label { font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: #8a6e2f; margin-bottom: 1rem; }
        h1 { font-size: 2.5rem; font-weight: 300; margin: 0 0 1rem; }
        p { color: #7a7060; line-height: 1.8; }
        a { color: #c9a84c; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <p class="label">✦ ChristCornerstone</p>
        <h1>You've been unsubscribed.</h1>
        <p>You won't receive any more emails from us. We're sorry to see you go.</p>
        <p style="margin-top:1.5rem;"><a href="https://christcornerstone.org">Return to site →</a></p>
      </div>
    </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}