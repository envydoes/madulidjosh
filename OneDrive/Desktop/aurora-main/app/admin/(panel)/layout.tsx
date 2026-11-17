import '../admin.css';
import { requireAdmin } from '@/lib/auth';
import { signOut } from '../actions';

export const metadata = { title: 'Admin - Dingalan Aurora' };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="adm">
      <aside className="adm-side">
        <img src="/images/logo.png" alt="Dingalan Aurora" />
        <a href="/admin">Dashboard</a>
        <a href="/admin/bookings">Bookings</a>
        <a href="/admin/rooms">Rooms</a>
        <a href="/" target="_blank">View site</a>
        <form action={signOut}><button>Logout</button></form>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
