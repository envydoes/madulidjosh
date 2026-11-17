'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';

const STATUSES = ['pending', 'confirmed', 'checkedin', 'checkedout', 'cancelled'];

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
  });
  if (error || data.user?.app_metadata?.role !== 'admin') {
    await supabase.auth.signOut();
    redirect('/admin/login?error=1');
  }
  redirect('/admin');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

const back = (path: string, error?: string): never => redirect(error ? `${path}?error=${encodeURIComponent(error)}` : path);

export async function updateBookingStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const status = String(formData.get('status'));
  if (!STATUSES.includes(status)) back('/admin/bookings', 'Invalid status.');
  const { error } = await supabase.from('bookings').update({ status }).eq('id', Number(formData.get('id')));
  revalidatePath('/admin', 'layout');
  back('/admin/bookings', error ? (error.code === '23P01' ? 'Those dates are now held by another booking.' : error.message) : undefined);
}

export async function deleteBooking(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from('bookings').delete().eq('id', Number(formData.get('id')));
  revalidatePath('/admin', 'layout');
  back('/admin/bookings', error?.message);
}

export async function addRoom(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from('rooms').insert({
    name: String(formData.get('name') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    price: Number(formData.get('price')),
  });
  revalidatePath('/', 'layout');
  back('/admin/rooms', error?.message);
}

export async function updateRoomPrice(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from('rooms').update({ price: Number(formData.get('price')) }).eq('id', Number(formData.get('id')));
  revalidatePath('/', 'layout');
  back('/admin/rooms', error?.message);
}

export async function deleteRoom(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from('rooms').delete().eq('id', Number(formData.get('id')));
  revalidatePath('/', 'layout');
  back('/admin/rooms', error ? 'Cannot delete a room that has bookings.' : undefined);
}
