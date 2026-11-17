'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true); setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (res.ok) { setStatus({ ok: true, text: 'Thank You! Your message has been sent.' }); form.reset(); }
      else setStatus({ ok: false, text: (await res.json()).error ?? 'Something went wrong.' });
    } catch { setStatus({ ok: false, text: "Oops! We couldn't send your message." }); }
    finally { setBusy(false); }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit" className="submit-btn" disabled={busy}>{busy ? 'Sending...' : 'Send Message'}</button>
      {status && <div className={`alert ${status.ok ? 'alert-success' : 'alert-danger'}`} style={{ marginTop: 12 }}>{status.text}</div>}
    </form>
  );
}
