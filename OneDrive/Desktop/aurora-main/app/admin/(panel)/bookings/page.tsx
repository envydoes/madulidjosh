import { requireAdmin } from '@/lib/auth';
import { deleteBooking, updateBookingStatus } from '../../actions';

const STATUSES = ['pending', 'confirmed', 'checkedin', 'checkedout', 'cancelled'];
type Row = { id: number; guest_email: string; check_in: string; check_out: string; nights: number; total_price: number; status: string; rooms: { name: string } | null };

export default async function Bookings({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('bookings')
    .select('id,guest_email,check_in,check_out,nights,total_price,status,rooms(name)')
    .order('check_in', { ascending: false });
  const rows = (data ?? []) as unknown as Row[];

  return (
    <>
      <h1>Bookings</h1>
      {error && <div className="err">{error}</div>}
      <div className="adm-box">
        <table>
          <thead><tr><th>Guest</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Nights</th><th>Total (PHP)</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id}>
                <td>{b.guest_email}</td><td>{b.rooms?.name}</td><td>{b.check_in}</td><td>{b.check_out}</td><td>{b.nights}</td>
                <td>{Number(b.total_price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                <td>
                  <form action={updateBookingStatus} className="row">
                    <input type="hidden" name="id" value={b.id} />
                    <select name="status" defaultValue={b.status}>{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                    <button className="btn">Update</button>
                  </form>
                </td>
                <td>
                  <form action={deleteBooking}>
                    <input type="hidden" name="id" value={b.id} />
                    <button className="btn danger">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={8}>No bookings yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
