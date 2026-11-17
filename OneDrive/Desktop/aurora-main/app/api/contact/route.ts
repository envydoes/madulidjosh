import { NextResponse } from 'next/server';
import { esc, sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? '').trim().slice(0, 100);
  const email = String(body?.email ?? '').trim().slice(0, 254);
  const message = String(body?.message ?? '').trim().slice(0, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'Please complete the form and try again.' }, { status: 400 });

  await sendEmail({
    to: process.env.CONTACT_TO!, replyTo: email,
    subject: `New Contact Form Message from ${name}`,
    html: `<p><strong>Name:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
  });
  return NextResponse.json({ ok: true });
}
