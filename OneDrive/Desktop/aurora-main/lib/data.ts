import { publicClient } from '@/lib/supabase/public';
import type { Room } from '@/lib/types';

export async function getRooms(): Promise<Room[]> {
  const { data, error } = await publicClient().from('rooms').select('id,name,description,price').order('price');
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => ({ ...r, price: Number(r.price) }));
}
