'use client';
import { useState } from 'react';
import type { Room } from '@/lib/types';
import { nightsBetween, todayManila } from '@/lib/dates';

const json = (body: unknown) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const fmt = (n: number) => n.toLocaleString('en-PH');

export default function BookingForm({ rooms }: { rooms: Room[] }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomId, setRoomId] = useState<number>(rooms[0]?.id ?? 0);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState(false);
  const [done, setDone] = useState(false);

  const room = rooms.find((r) => r.id === roomId);
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const total = room ? nights * room.price : 0;

  async function checkAvailability(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (nights < 1) { setError('Check-out must be after check-in.'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/availability', json({ roomId, checkIn, checkOut }));
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Could not check availability.');
      else if (data.available) setSummary(true);
      else setError(`Sorry, ${room?.name} is already booked for: ${data.conflictDates.join(', ')}. Please choose different dates.`);
    } catch { setError('Network error. Please try again.'); }
    finally { setBusy(false); }
  }

  async function book() {
    setBusy(true);
    try {
      const res = await fetch('/api/book', json({ roomId, checkIn, checkOut, email }));
      const data = await res.json();
      setSummary(false);
      if (data.status === 'success') setDone(true);
      else setError(data.message ?? 'There was an error processing your booking. Please try again.');
    } catch { setSummary(false); setError('There was an error processing your booking. Please try again.'); }
    finally { setBusy(false); }
  }

  return (
    <section id="booking" className="booking">
      <div className="container">
        <h2>Book Your Visit</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="booking-content">
          <div className="booking-info">
            <h3>Plan Your Perfect Trip</h3>
            <p>Book your accommodation, tours, and activities in advance to ensure a memorable experience in Dingalan.</p>
            <div className="booking-features">
              <div className="feature"><i className="fas fa-hotel"></i><h4>Accommodations</h4><p>Find the perfect place to stay</p></div>
              <div className="feature"><i className="fas fa-map-marked-alt"></i><h4>Guided Tours</h4><p>Explore with local experts</p></div>
              <div className="feature"><i className="fas fa-calendar-check"></i><h4>Easy Booking</h4><p>Simple and secure process</p></div>
            </div>
          </div>
          <form className="booking-form" onSubmit={checkAvailability}>
            <div className="form-group">
              <label htmlFor="check-in">Check-in Date</label>
              <input type="date" id="check-in" required min={todayManila()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="check-out">Check-out Date</label>
              <input type="date" id="check-out" required min={checkIn || todayManila()} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="accommodation">Room Type</label>
              <select id="accommodation" required value={roomId} onChange={(e) => setRoomId(Number(e.target.value))}>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="booking-btn" disabled={busy}>{busy && !summary ? 'Checking...' : 'Check Availability'}</button>
          </form>
        </div>
      </div>

      {summary && room && (
        <div className="bk-overlay" onClick={() => setSummary(false)}>
          <div className="bk-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bk-close" onClick={() => setSummary(false)}>&times;</button>
            <h4>Booking Summary</h4>
            <p><strong>Room Type:</strong> {room.name}</p>
            <p><strong>Check-in:</strong> {checkIn}</p>
            <p><strong>Check-out:</strong> {checkOut}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Number of Nights:</strong> {nights}</p>
            <p><strong>Price per Night:</strong> PHP {fmt(room.price)}</p>
            <p style={{ fontSize: '1.2em' }}><strong>Total Price:</strong> PHP {fmt(total)}</p>
            <button className="booking-btn" style={{ marginTop: 18, width: '100%' }} onClick={book} disabled={busy}>{busy ? 'Booking...' : 'Book Now'}</button>
          </div>
        </div>
      )}

      {done && room && (
        <div className="bk-overlay" onClick={() => setDone(false)}>
          <div className="bk-modal success" onClick={(e) => e.stopPropagation()}>
            <button className="bk-close" onClick={() => setDone(false)}>&times;</button>
            <h4>Thank You for Booking!</h4>
            <p>Your booking has been received. Please check your email for confirmation and payment instructions.</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Room Type:</strong> {room.name}</p>
            <p><strong>Check-in:</strong> {checkIn}</p>
            <p><strong>Check-out:</strong> {checkOut}</p>
            <p><strong>Number of Nights:</strong> {nights}</p>
            <p style={{ fontSize: '1.2em' }}><strong>Total Price:</strong> PHP {fmt(total)}</p>
            <button className="booking-btn" style={{ marginTop: 20 }} onClick={() => setDone(false)}>Back to Home</button>
          </div>
        </div>
      )}
    </section>
  );
}
