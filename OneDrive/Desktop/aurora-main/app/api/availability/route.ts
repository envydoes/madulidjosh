import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/supabase/public';
import { isISODate, nightsBetween, todayManila } from '@/lib/dates';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const roomId = Number(body?.roomId);
  const { checkIn, checkOut } = body ?? {};
  if (!Number.isInteger(roomId) || !isISODate(checkIn) || !isISODate(checkOut))
    return NextResponse.json({ error: 'Missing or invalid data.' }, { status: 400 });
  if (nightsBetween(checkIn, checkOut) < 1 || checkIn < todayManila())
    return NextResponse.json({ error: 'Please choose valid future dates (check-out after check-in).' }, { status: 400 });

  const { data, error } = await publicClient().rpc('booked_dates', { p_room: roomId, p_from: checkIn, p_to: checkOut });
  if (error) return NextResponse.json({ error: 'Could not check availability.' }, { status: 500 });
  const conflictDates = (data ?? []) as string[];
  return NextResponse.json({ available: conflictDates.length === 0, conflictDates });
}
