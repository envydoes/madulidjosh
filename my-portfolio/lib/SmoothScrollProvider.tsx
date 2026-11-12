'use client';

import { useEffect, type ReactNode } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// Wrap your root layout's children with this. Ties Lenis into
// GSAP's ticker so ScrollTrigger and Lenis stay in sync.
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if it's loaded elsewhere in the tree.
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      lenis.on('scroll', ScrollTrigger.update);
    }).catch(() => {});

    // Intercept all anchor hash-link clicks and smooth-scroll via Lenis
    function handleAnchorClick(e: MouseEvent) {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const target = e.target instanceof Element ? e.target.closest('a') : null;
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      const el = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!el) return;
      e.preventDefault();
      history.pushState(null, '', href);
      lenis.scrollTo(el, { offset: -96, duration: 1.2 });
    }

    function handleContentResize() {
      lenis.resize();
    }

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('portfolio:content-resize', handleContentResize);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('portfolio:content-resize', handleContentResize);
    };
  }, [reducedMotion]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
