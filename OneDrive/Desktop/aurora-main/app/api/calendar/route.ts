import { NextResponse } from 'next/server';
import { publicClient } from '@/lib/supabase/public';

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const room = Number(sp.get('room')), year = Number(sp.get('year')), month = Number(sp.get('month'));
  if (![room, year, month].every(Number.isInteger) || month < 1 || month > 12 || year < 2000 || year > 2100)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const pad = (n: number) => String(n).padStart(2, '0');
  const from = `${year}-${pad(month)}-01`;
  const to = month === 12 ? `${year + 1}-01-01` : `${year}-${pad(month + 1)}-01`;
  const { data, error } = await publicClient().rpc('booked_dates', { p_room: room, p_from: from, p_to: to });
  if (error) return NextResponse.json({ error: 'Failed to load calendar.' }, { status: 500 });
  return NextResponse.json({ booked: (data ?? []) as string[] });
}
