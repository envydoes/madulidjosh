'use client';
import { useEffect, useState } from 'react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function RoomCalendar({ roomId, name }: { roomId: number; name: string }) {
  const now = new Date();
  const [ym, setYm] = useState({ year: now.getFullYear(), month: now.getMonth() + 1 });
  const [booked, setBooked] = useState<Set<string> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    setBooked(null); setFailed(false);
    fetch(`/api/calendar?room=${roomId}&year=${ym.year}&month=${ym.month}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => live && setBooked(new Set<string>(d.booked)))
      .catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [roomId, ym]);

  const shift = (delta: number) => setYm(({ year, month }) => {
    const m = month + delta;
    return m < 1 ? { year: year - 1, month: 12 } : m > 12 ? { year: year + 1, month: 1 } : { year, month: m };
  });

  const first = new Date(ym.year, ym.month - 1, 1).getDay();
  const days = new Date(ym.year, ym.month, 0).getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const rows = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
  const iso = (d: number) => `${ym.year}-${String(ym.month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  return (
    <div className="room-calendar">
      <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{name}</h3>
      <div className="cal-nav">
        <button onClick={() => shift(-1)} aria-label="Previous month">&lsaquo;</button>
        <span>{MONTHS[ym.month - 1]} {ym.year}</span>
        <button onClick={() => shift(1)} aria-label="Next month">&rsaquo;</button>
      </div>
      <div className="calendar-table-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {failed ? <div style={{ color: 'red' }}>Failed to load calendar.</div> : (
          <table className="calendar-table">
            <thead><tr>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <th key={d}>{d}</th>)}</tr></thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>{row.map((d, j) => d === null ? <td key={j}></td> :
                  <td key={j} className={booked?.has(iso(d)) ? 'booked' : 'available'}>{d}</td>)}</tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ marginTop: 10, fontSize: '0.95em' }}>
        <span className="calendar-legend-booked"></span> Booked <span className="calendar-legend-available"></span> Available
      </div>
    </div>
  );
}
