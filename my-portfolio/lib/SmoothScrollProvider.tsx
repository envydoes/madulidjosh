'use client';

import { useEffect, type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { MotionPreferencesProvider, useMotionPreferences } from './MotionPreferences';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <MotionPreferencesProvider><ScrollMotion>{children}</ScrollMotion></MotionPreferencesProvider>;
}

function ScrollMotion({ children }: { children: ReactNode }) {
  const { reducedMotion } = useMotionPreferences();
  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full';
    if (reducedMotion) return;
    const lenis = new Lenis({
      duration: 0.9,
      lerp: 0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Capture same-page anchors before Next Link handles them and prevents default.
    function handleAnchorClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const target = e.target instanceof Element ? e.target.closest('a') : null;
      if (!target || target.hasAttribute('download') || (target.target && target.target !== '_self')) return;
      const href = target.getAttribute('href');
      if (!href) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, '', url.hash);
      const offset = -(parseFloat(getComputedStyle(el).scrollMarginTop) || 96);
      const distance = Math.abs(el.getBoundingClientRect().top + offset);
      lenis.scrollTo(el, {
        offset,
        duration: Math.min(1.55, Math.max(0.65, distance / 3200)),
        onComplete: () => {
          // Keep keyboard navigation at the destination without another scroll jump.
          if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '-1');
            el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
          }
          el.focus({ preventScroll: true });
        },
      });
    }

    function handleContentResize() {
      lenis.resize();
    }

    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('portfolio:content-resize', handleContentResize);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('portfolio:content-resize', handleContentResize);
    };
  }, [reducedMotion]);

  // Remount motion elements when this explicit preference changes so their
  // transform policy and entrance sequence both update immediately.
  return <MotionConfig key={reducedMotion ? 'reduced' : 'full'} reducedMotion={reducedMotion ? 'always' : 'never'}>{children}</MotionConfig>;
}
