'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

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
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [bottomY, setBottomY] = useState(800);
  const sectionNav = useRef<HTMLElement>(null);
  const sectionLinks = useRef<HTMLDivElement>(null);
  const hrefFor = (hash: string) => pathname === '/' ? hash : '/' + hash;

  useEffect(() => {
    const updateNavPosition = () => {
      const about = document.getElementById('about');
      const hero = document.getElementById('hero');
      const threshold = about?.offsetTop ?? ((hero?.offsetTop ?? 0) + (hero?.offsetHeight ?? 0));
      setPastHero(window.scrollY >= threshold - 24);
      if (sectionNav.current) {
        setBottomY(Math.max(12, window.innerHeight - sectionNav.current.offsetHeight - 16));
      }
    };

    updateNavPosition();
    window.addEventListener('scroll', updateNavPosition, { passive: true });
    window.addEventListener('resize', updateNavPosition);

    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection('#' + visible.target.id);
    }, { rootMargin: '-25% 0px -55%', threshold: [0.05, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', updateNavPosition);
      window.removeEventListener('resize', updateNavPosition);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const activeLink = sectionLinks.current?.querySelector('[aria-current="location"]');
    activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSection]);

  return (
    <>
      <AnimatePresence>
        {!pastHero && (
          <motion.nav
            aria-label="Identity and theme"
            initial={{ y: -32, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -32, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="site-nav fixed left-1/2 top-3 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full border border-black/10 bg-white/95 px-2 py-1.5 shadow-sm backdrop-blur-xl sm:gap-5"
          >
            <Logo href={hrefFor('#hero')} />
            <ThemeToggle />
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.nav
        ref={sectionNav}
        aria-label="Section navigation"
        data-lenis-prevent
        initial={false}
        animate={{
          y: pastHero ? 12 : bottomY,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="section-nav fixed left-1/2 top-0 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-full border border-black/10 bg-white/95 px-2 py-2 shadow-lg backdrop-blur-xl"
      >
        <div ref={sectionLinks} className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          {links.map((link) => {
            const active = activeSection === link.href;
            return (
              <Link
                key={link.href}
                href={hrefFor(link.href)}
                aria-current={active ? 'location' : undefined}
                className={
                  'shrink-0 whitespace-nowrap rounded-full px-3 py-2.5 text-xs font-medium transition-all duration-300 sm:px-4 sm:text-sm ' +
                  (active
                    ? 'bg-black text-white shadow-sm'
                    : 'text-black/65 hover:bg-black/10 hover:text-black')
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
