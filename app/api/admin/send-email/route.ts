import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { subject, body } = await request.json();
  if (!subject || !body) return NextResponse.json({ error: 'Missing subject or body' }, { status: 400 });

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'SendGrid not configured' }, { status: 500 });

  // Get subscribers
  let emails: string[] = [];
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin.from('email_subscribers').select('email').eq('active', true);
    emails = (data || []).map((s: { email: string }) => s.email);
  }

  if (emails.length === 0) {
    return NextResponse.json({ error: 'No active subscribers' }, { status: 400 });
  }

  const sgMail = (await import('@sendgrid/mail')).default;
  sgMail.setApiKey(apiKey);

  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@christcornerstone.org';
  const fromName = process.env.SENDGRID_FROM_NAME || 'ChristCornerstone';

  // Send in batches of 1000
  const batchSize = 1000;
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    await sgMail.sendMultiple({
      to: batch,
      from: { email: fromEmail, name: fromName },
      subject,
      text: body,
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f5efe0;color:#2a1f0e;">
        <div style="text-align:center;margin-bottom:30px;">
          <p style="font-family:Georgia,serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#8a6e2f;">CHRISTCORNERSTONE</p>
        </div>
        <div style="white-space:pre-line;font-size:18px;line-height:1.8;color:#2a1f0e;">${body.replace(/\n/g, '<br>')}</div>
        <div style="margin-top:40px;padding-top:20px;border-top:1px solid rgba(201,168,76,0.3);text-align:center;">
          <p style="font-size:12px;color:#7a7060;">
            You're receiving this because you subscribed at christcornerstone.org<br>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/api/unsubscribe?email={{email}}" style="color:#8a6e2f;">Unsubscribe</a>
          </p>
        </div>
      </div>`,
    });
  }

  return NextResponse.json({ success: true, count: emails.length });
}