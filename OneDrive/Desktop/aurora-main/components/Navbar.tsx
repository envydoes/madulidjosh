'use client';
import { useEffect, useRef, useState } from 'react';

const LINKS = [['home', 'Home'], ['about', 'About'], ['attractions', 'Attractions'], ['rooms', 'Rooms'], ['booking', 'Book Now'], ['calendar', 'Calendar'], ['contact', 'Contact']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const el = header.current; if (!el) return;
      const y = window.scrollY;
      if (y <= 0) el.classList.remove('scroll-up');
      else if (y > last && !el.classList.contains('scroll-down')) { el.classList.remove('scroll-up'); el.classList.add('scroll-down'); }
      else if (y < last && el.classList.contains('scroll-down')) { el.classList.remove('scroll-down'); el.classList.add('scroll-up'); }
      last = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="header" ref={header}>
      <nav className="navbar">
        <div className="logo"><img src="/images/logo.png" alt="Dingalan Aurora Logo" /></div>
        <ul className={`nav-links${open ? ' active' : ''}`}>
          {LINKS.map(([id, label]) => (<li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>))}
        </ul>
        <div className={`hamburger${open ? ' active' : ''}`} onClick={() => setOpen(!open)}><span></span><span></span><span></span></div>
      </nav>
    </header>
  );
}
