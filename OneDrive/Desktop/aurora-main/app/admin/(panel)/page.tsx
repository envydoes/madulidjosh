import { requireAdmin } from '@/lib/auth';

type Row = { id: number; guest_email: string; check_in: string; check_out: string; nights: number; status: string; rooms: { name: string } | null };

export default async function Dashboard() {
  const { supabase } = await requireAdmin();
  const [recent, total, pending] = await Promise.all([
    supabase.from('bookings').select('id,guest_email,check_in,check_out,nights,status,rooms(name)').order('created_at', { ascending: false }).limit(10),
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);
  const rows = (recent.data ?? []) as unknown as Row[];

  return (
    <>
      <h1>Dashboard</h1>
      <div className="adm-cards">
        <div className="adm-card"><b>{total.count ?? 0}</b>Total bookings</div>
        <div className="adm-card"><b>{pending.count ?? 0}</b>Pending bookings</div>
      </div>
      <h2>Recent bookings</h2>
      <div className="adm-box">
        <table>
          <thead><tr><th>Guest</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Nights</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id}>
                <td>{b.guest_email}</td><td>{b.rooms?.name}</td><td>{b.check_in}</td><td>{b.check_out}</td><td>{b.nights}</td>
                <td><span className={`badge ${b.status}`}>{b.status}</span></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6}>No bookings yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
