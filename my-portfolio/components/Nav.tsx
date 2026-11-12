'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#education', label: 'Education' },
  { href: '#stack', label: 'Technical Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certs', label: 'Certifications' },
  { href: '#experience', label: 'Experience & Accomplishments' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useMotionValueEvent(scrollY, 'change', (value) => setShrunk(value > 60));
  const hrefFor = (hash: string) => pathname === '/' ? hash : '/' + hash;
  return (
    <motion.nav aria-label="Main navigation"
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && mobileOpen) { setMobileOpen(false); menuButton.current?.focus(); }
      }}
      className={'fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-black/10 bg-white/95 px-3 py-2 backdrop-blur-xl xl:top-4 xl:w-auto xl:max-w-none xl:rounded-full xl:px-2 ' + (shrunk ? 'xl:py-1.5' : 'xl:py-2.5')}
    >
      <div className="flex items-center justify-between gap-2 xl:hidden">
        <Link href={hrefFor('#hero')} onClick={() => setMobileOpen(false)} className="py-2 pl-2 text-sm font-semibold tracking-tight text-black">
          Joshua <span className="font-normal text-black/50">Madulid</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href={hrefFor('#contact')} onClick={() => setMobileOpen(false)} className="rounded-full bg-black px-4 py-3 text-xs font-medium text-white hover:bg-black/80">Let's Talk</Link>
          <button ref={menuButton} type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black hover:bg-black/5">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {mobileOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden items-center gap-1 xl:flex">
        {links.map((link) => <Link key={link.href} href={hrefFor(link.href)} className="whitespace-nowrap rounded-full px-4 py-3 text-sm text-black/70 transition-colors hover:bg-black/10 hover:text-black">{link.label}</Link>)}
      </div>
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div id="mobile-navigation" data-lenis-prevent initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="grid max-h-[70dvh] grid-cols-1 gap-1 overflow-y-auto border-t border-black/10 pt-2 sm:grid-cols-2 xl:hidden">
            {links.map((link) => <Link key={link.href} href={hrefFor(link.href)} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm text-black/70 hover:bg-black/5 hover:text-black">{link.label}</Link>)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
