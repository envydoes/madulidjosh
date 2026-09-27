'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Wrap your root layout's children with this. Ties Lenis into
// GSAP's ticker so ScrollTrigger and Lenis stay in sync.
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if it's loaded elsewhere in the tree.
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      lenis.on('scroll', ScrollTrigger.update);
    }).catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
