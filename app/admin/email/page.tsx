'use client';
import { useState, useEffect } from 'react';

const FIELD_STYLE = {
  background: 'var(--deep-navy)',
  border: '1px solid rgba(201,168,76,0.2)',
  borderRadius: '8px',
  color: 'var(--cream)',
  padding: '0.7rem 1rem',
  fontSize: '0.95rem',
  width: '100%',
  outline: 'none',
  fontFamily: 'Lato, sans-serif',
};

export default function AdminEmailPage() {
  const [subscribers, setSubscribers] = useState<{ email: string; subscribed_at: string }[]>([]);
  const [form, setForm] = useState({ subject: '', body: '' });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?type=subscribers')
      .then((r) => r.json())
      .then((data) => setSubscribers(data.items || []))
      .catch(() => {});
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm(`Send email to ${subscribers.length} subscribers?`)) return;
    setSending(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(res.ok ? `✓ Sent to ${data.count} subscribers` : `Error: ${data.error}`);
      if (res.ok) setForm({ subject: '', body: '' });
    } catch {
      setMessage('Error sending. Check SendGrid is configured.');
    }
    setSending(false);
  };

  return (
    <div>
      <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: '2.2rem', fontWeight: 300 }}>Email Newsletter</h1>
      <p className="text-text-muted mb-8">Send emails to your subscribers and view your subscriber list.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-7" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <h2 className="font-cormorant text-cream mb-5" style={{ fontSize: '1.4rem', fontWeight: 600 }}>Compose Email</h2>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">Subject Line</label>
                <input
                  style={FIELD_STYLE}
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  placeholder="Today's verse — Romans 8:28"
                  required
                />
              </div>
              <div>
                <label className="font-cinzel text-gold-dim text-[0.65rem] tracking-[0.2em] uppercase block mb-1">
                  Email Body (plain text — line breaks are preserved)
                </label>
                <textarea
                  style={{ ...FIELD_STYLE, resize: 'vertical', minHeight: '280px' }}
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  placeholder={`And we know that in all things God works for the good of those who love him...\n— Romans 8:28\n\nToday's Reflection:\n\nThis verse reminds us that...`}
                  required
                />
              </div>
              {message && (
                <p style={{ color: message.startsWith('✓') ? 'var(--gold)' : '#f87171', fontSize: '0.9rem' }}>{message}</p>
              )}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="font-cinzel tracking-[0.12em] uppercase text-midnight bg-gold px-8 py-3 rounded-lg transition-colors hover:bg-gold-light disabled:opacity-60"
                  style={{ fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
                >
                  {sending ? 'Sending…' : `Send to ${subscribers.length} Subscribers`}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Subscriber count */}
        <div>
          <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
            <p className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-2" style={{ fontSize: '0.7rem' }}>Total Subscribers</p>
            <p className="font-cormorant text-cream" style={{ fontSize: '3rem', fontWeight: 600 }}>{subscribers.length}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}>
            <p className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-3" style={{ fontSize: '0.7rem' }}>Recent Subscribers</p>
            {subscribers.length === 0 ? (
              <p className="text-text-muted text-sm">No subscribers yet. Share the site to grow your list.</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {subscribers.slice(-10).reverse().map((sub, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-text-light text-sm">{sub.email}</span>
                    <span className="text-text-muted text-xs">{new Date(sub.subscribed_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}