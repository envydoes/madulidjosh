'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#showcase', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#certs', label: 'Certs' },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setShrunk(v > 60));

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl px-2 transition-all duration-300 ${
        shrunk ? 'py-1.5' : 'py-2.5'
      }`}
    >
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-sm text-black/70 hover:text-black px-4 py-1.5 rounded-full hover:bg-black/10 transition-colors"
        >
          {l.label}
        </a>
      ))}
      <a
        href="#contact"
        className="ml-1 text-sm font-medium text-black bg-black/8 border border-black/15 px-4 py-1.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors"
      >
        Let&apos;s Talk
      </a>
    </motion.nav>
  );
}
