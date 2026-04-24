import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/supabase';

// Simple but meaningful RFC-ish email check (mirrors the client)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

export async function POST(request: NextRequest) {
  let body: { email?: unknown; name?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
  const rawName = typeof body.name === 'string' ? body.name.trim() : '';

  if (!rawEmail || rawEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(rawEmail)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const email = rawEmail.toLowerCase();
  const name = rawName ? rawName.slice(0, 100) : null;

  // Save to Neon database
  if (sql) {
    try {
      await sql`
        INSERT INTO email_subscribers (email, name, subscribed_at, active)
        VALUES (${email}, ${name}, NOW(), TRUE)
        ON CONFLICT (email) DO UPDATE SET
          name = COALESCE(EXCLUDED.name, email_subscribers.name),
          subscribed_at = NOW(),
          active = TRUE
      `;
    } catch (err) {
      console.error('Subscribe DB error:', err);
      return NextResponse.json(
        { error: 'We could not save your subscription. Please try again in a moment.' },
        { status: 500 }
      );
    }
  }

  // Send welcome email via SendGrid (best-effort — do not fail the request on email errors)
  const apiKey = process.env.SENDGRID_API_KEY;
  if (apiKey) {
    try {
      const sgMail = (await import('@sendgrid/mail')).default;
      sgMail.setApiKey(apiKey);

      const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@christcornerstone.org';
      const fromName = process.env.SENDGRID_FROM_NAME || 'ChristCornerstone';
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christcornerstone.org';
      const unsubscribeUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`;

      await sgMail.send({
        to: email,
        from: { email: fromEmail, name: fromName },
        subject: 'Welcome to ChristCornerstone ✦',
        text: `${name ? `${name}, welcome` : 'Welcome'} to ChristCornerstone.\n\nYou'll receive a daily verse each morning — a quiet reminder of truth in the noise of the day.\n\nIn the meantime, explore the site at ${siteUrl}\n\nUnsubscribe any time: ${unsubscribeUrl}\n\nIn Christ,\nChristCornerstone`,
        html: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#0a0e1a;color:#f5efe0;">
          <div style="text-align:center;margin-bottom:40px;">
            <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#c9a84c;">✦ CHRISTCORNERSTONE</p>
          </div>
          <h1 style="font-family:Georgia,serif;font-size:36px;font-weight:300;color:#f5efe0;line-height:1.2;margin-bottom:20px;">
            ${name ? `${name},` : ''} welcome.
          </h1>
          <p style="font-size:18px;line-height:1.8;color:#d4c9b0;margin-bottom:20px;">
            You'll receive a daily verse each morning — a quiet reminder of truth in the noise of the day.
          </p>
          <p style="font-size:18px;line-height:1.8;color:#d4c9b0;margin-bottom:30px;">
            In the meantime, explore doctrine, apologetics, and Scripture at the site.
          </p>
          <div style="text-align:center;margin:40px 0;">
            <a href="${siteUrl}" style="display:inline-block;font-family:Georgia,serif;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#0a0e1a;background:#c9a84c;padding:14px 32px;border-radius:50px;text-decoration:none;">
              Visit ChristCornerstone
            </a>
          </div>
          <div style="margin-top:40px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.15);text-align:center;">
            <p style="font-size:12px;color:#7a7060;">
              <a href="${unsubscribeUrl}" style="color:#8a6e2f;">Unsubscribe</a>
            </p>
          </div>
        </div>`,
        // Standards-compliant list-unsubscribe so Gmail can show a one-click link
        mailSettings: {
          sandboxMode: { enable: false },
        },
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      });
    } catch (e) {
      console.error('SendGrid error:', e);
      // Don't fail the request if email fails — subscriber is saved
    }
  }

  return NextResponse.json({
    success: true,
    message: "You're subscribed! Your first verse arrives tomorrow morning.",
  });
}
