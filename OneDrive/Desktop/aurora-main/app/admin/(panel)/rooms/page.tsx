import { requireAdmin } from '@/lib/auth';
import { addRoom, deleteRoom, updateRoomPrice } from '../../actions';

export default async function Rooms({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('rooms').select('id,name,description,price').order('price');
  const rooms = data ?? [];

  return (
    <>
      <h1>Rooms</h1>
      {error && <div className="err">{error}</div>}
      <div className="adm-box">
        <table>
          <thead><tr><th>Name</th><th>Price / night (PHP)</th><th></th></tr></thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>
                  <form action={updateRoomPrice} className="row">
                    <input type="hidden" name="id" value={r.id} />
                    <input type="number" name="price" step="0.01" min="0" defaultValue={Number(r.price)} style={{ width: 110 }} />
                    <button className="btn">Save</button>
                  </form>
                </td>
                <td>
                  <form action={deleteRoom}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className="btn danger">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Add a room</h2>
      <form action={addRoom} className="adm-box">
        <div className="row"><input name="name" placeholder="Name" required /></div>
        <div className="row"><input type="number" name="price" placeholder="Price" step="0.01" min="0" required /></div>
        <div className="row"><input name="description" placeholder="Description" style={{ width: 320 }} /></div>
        <button className="btn">Add</button>
      </form>
    </>
  );
}
