'use client';

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#certs', label: 'Certs' },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setShrunk(v > 60));

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-1/2 top-3 z-50 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 flex-col rounded-2xl border border-black/10 bg-white/90 px-3 py-2 backdrop-blur-xl transition-all duration-300 md:top-4 md:w-auto md:max-w-none md:flex-row md:items-center md:gap-1 md:rounded-full md:bg-white/70 md:px-2 ${
        shrunk ? 'md:py-1.5' : 'md:py-2.5'
      }`}
    >
      <div className="flex items-center justify-between gap-2 md:hidden">
        <a href="#hero" onClick={() => setMobileOpen(false)} className="px-2 text-sm font-semibold tracking-tight text-black">
          Joshua <span className="font-normal text-black/50">Madulid</span>
        </a>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-black/80"
          >
            Let&apos;s Talk
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition-colors hover:bg-black/5"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {mobileOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-4 py-1.5 text-sm text-black/70 transition-colors hover:bg-black/10 hover:text-black"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ml-1 rounded-full border border-black/15 bg-black/5 px-4 py-1.5 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black hover:text-white"
        >
          Let&apos;s Talk
        </a>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-1 overflow-hidden border-t border-black/10 pt-2 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-black/70 transition-colors hover:bg-black/5 hover:text-black"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
