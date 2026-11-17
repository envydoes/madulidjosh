import '../admin.css';
import { signIn } from '../actions';

export const metadata = { title: 'Admin Login - Dingalan Aurora' };

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="adm">
      <form className="adm-login" action={signIn}>
        <h1>Admin Login</h1>
        {error && <div className="err">Invalid email or password.</div>}
        <input type="email" name="email" placeholder="Email" required autoComplete="username" />
        <input type="password" name="password" placeholder="Password" required autoComplete="current-password" />
        <button className="btn" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
}
