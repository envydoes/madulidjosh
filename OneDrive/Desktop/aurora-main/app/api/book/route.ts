import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/admin';
import { isISODate, nightsBetween, todayManila } from '@/lib/dates';
import { bookingEmails, sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const roomId = Number(body?.roomId);
  const { checkIn, checkOut } = body ?? {};
  const email = String(body?.email ?? '').trim().toLowerCase();

  if (!Number.isInteger(roomId) || !isISODate(checkIn) || !isISODate(checkOut) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return NextResponse.json({ status: 'error', message: 'Missing or invalid data.' }, { status: 400 });
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1 || nights > 60 || checkIn < todayManila())
    return NextResponse.json({ status: 'error', message: 'Please choose valid dates (1 to 60 nights, not in the past).' }, { status: 400 });

  const supabase = createServiceClient();
  const { data: room } = await supabase.from('rooms').select('id,name,price').eq('id', roomId).single();
  if (!room) return NextResponse.json({ status: 'error', message: 'Room not found.' }, { status: 404 });

  const price = Number(room.price);
  const total = nights * price; // price always comes from the DB, never from the browser
  const { error } = await supabase.from('bookings').insert({
    room_id: room.id, guest_email: email, check_in: checkIn, check_out: checkOut, total_price: total,
  });
  if (error) {
    // 23P01 = exclusion violation: someone else holds those nights
    if (error.code === '23P01')
      return NextResponse.json({ status: 'conflict', message: 'Sorry, that room was just booked for some of these dates. Please choose different dates.' }, { status: 409 });
    console.error('Booking insert failed', error);
    return NextResponse.json({ status: 'error', message: 'There was an error processing your booking.' }, { status: 500 });
  }

  const mail = bookingEmails({ email, room: room.name, checkIn, checkOut, nights, price, total });
  await Promise.allSettled([
    sendEmail({ to: process.env.BOOKING_NOTIFY_TO!, ...mail.admin, replyTo: email }),
    sendEmail({ to: email, ...mail.guest }),
  ]);
  return NextResponse.json({ status: 'success', nights, total_price: total });
}
