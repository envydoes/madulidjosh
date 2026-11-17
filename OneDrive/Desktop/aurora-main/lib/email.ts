export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function sendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.warn('RESEND_API_KEY not set; skipping email to', opts.to); return; }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.EMAIL_FROM, to: opts.to, subject: opts.subject, html: opts.html, reply_to: opts.replyTo }),
  });
  if (!res.ok) console.error('Email failed', res.status, await res.text());
}

const php = (n: number) => 'PHP ' + n.toLocaleString('en-PH', { minimumFractionDigits: 2 });

export function bookingEmails(b: { email: string; room: string; checkIn: string; checkOut: string; nights: number; price: number; total: number }) {
  const rows = `
    <p><strong>Room Type:</strong> ${esc(b.room)}</p>
    <p><strong>Check-in:</strong> ${b.checkIn}</p>
    <p><strong>Check-out:</strong> ${b.checkOut}</p>
    <p><strong>Nights:</strong> ${b.nights}</p>
    <p><strong>Price per Night:</strong> ${php(b.price)}</p>
    <p><strong>Total:</strong> ${php(b.total)}</p>`;
  const admin = { subject: 'New Booking Request', html: `<h3>A new booking has been made</h3><p><strong>Guest:</strong> ${esc(b.email)}</p>${rows}<p>Log in to the admin dashboard to confirm or manage it.</p>` };
  const guest = {
    subject: 'Your Booking Confirmation - Dingalan Aurora',
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#333">
      <div style="background:#1a5f7a;color:#fff;padding:20px;text-align:center"><h2>Booking Confirmation</h2></div>
      <div style="padding:20px;background:#f9f9f9">
        <p>Dear Guest,</p>
        <p>Thank you for choosing Dingalan Aurora. Your booking has been received and is pending confirmation.</p>
        <h3>Booking Details</h3>${rows}
        <div style="background:#fff3cd;padding:15px;border-left:4px solid #ffc107;margin:20px 0">
          <strong>Important</strong>
          <ul><li>Check-in time: 2:00 PM</li><li>Check-out time: 12:00 PM</li><li>Payment is due upon arrival</li><li>Please present this email upon check-in</li></ul>
        </div>
        <p>We will email you again once your booking is confirmed.</p>
        <p>Phone: 09288103008<br>Email: dingalantravels@gmail.com</p>
      </div></div>`,
  };
  return { admin, guest };
}
