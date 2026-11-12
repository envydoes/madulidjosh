'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionPreferences } from '@/lib/MotionPreferences';
import ProjectImage from '@/components/ProjectImage';
import type { ProjectScreenshot } from '@/lib/projectScreenshots';

export default function ProjectGallery({ title, screenshots, portrait = false }: {
  title: string;
  screenshots: ProjectScreenshot[];
  portrait?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const gestureStart = useRef<{ x: number; y: number } | null>(null);
  const { reducedMotion } = useMotionPreferences();
  const screenshot = screenshots[active];

  useEffect(() => {
    const element = dialog.current;
    if (!isOpen || !element) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) thumbnails.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion ? 'instant' : 'smooth' });
  }, [active, isOpen, reducedMotion]);

  function show(index: number, event: MouseEvent<HTMLButtonElement>) {
    opener.current = event.currentTarget;
    setActive(index);
    setIsOpen(true);
  }

  function select(index: number) {
    setDirection(index >= active ? 1 : -1);
    setActive((index + screenshots.length) % screenshots.length);
  }

  if (!screenshot) return null;

  return (
    <section className="mt-16" aria-labelledby="screenshots-heading">
      <h2 id="screenshots-heading" className="scroll-mt-28 text-2xl font-bold">Project screenshots</h2>
      <div className={'mt-6 grid gap-4 sm:gap-6 ' + (portrait ? 'mx-auto max-w-3xl grid-cols-2' : 'md:grid-cols-2')}>
        {screenshots.slice(0, 2).map((item, index) => (
          <figure key={item.src} className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-50">
            <button type="button" aria-haspopup="dialog" aria-label={'View ' + item.title + ' in screenshot gallery'} onClick={(event) => show(index, event)}
              className={'group mx-auto block overflow-hidden ' + (portrait ? 'aspect-[428/928] max-h-[480px]' : 'aspect-video w-full')}>
              <ProjectImage src={item.src} alt={item.alt} contain />
            </button>
            <figcaption className="p-4 text-sm leading-relaxed text-black/60">{item.title}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-7 text-center">
        <button type="button" aria-haspopup="dialog" onClick={(event) => show(0, event)} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-black/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white">
          See all screenshots <span className="text-xs opacity-60">({screenshots.length})</span><span aria-hidden="true">↗</span>
        </button>
      </div>

      <dialog ref={dialog} aria-labelledby="gallery-title" aria-describedby="gallery-help" data-lenis-prevent
        onClose={() => setIsOpen(false)} onCancel={() => setIsOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }
          if (event.key === 'ArrowRight') { event.preventDefault(); select(active + 1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); select(active - 1); }
          if (event.key === 'Home') { event.preventDefault(); select(0); }
          if (event.key === 'End') { event.preventDefault(); select(screenshots.length - 1); }
        }}
        className="fixed inset-0 m-auto h-[92dvh] max-h-[960px] w-[calc(100%-1rem)] max-w-6xl overflow-hidden rounded-2xl bg-white p-0 text-black shadow-2xl sm:w-[calc(100%-3rem)]">
        {isOpen && (
          <div className="flex h-full min-h-0 flex-col">
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-black/10 px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Project gallery</p>
                <h2 id="gallery-title" className="mt-1 text-sm font-semibold sm:text-lg">{title}</h2>
              </div>
              <button type="button" autoFocus onClick={() => setIsOpen(false)} aria-label="Close screenshot gallery" className="min-h-11 shrink-0 rounded-full border border-black/20 px-4 text-sm hover:bg-black hover:text-white">Close ×</button>
            </header>
            <p id="gallery-help" className="sr-only">Use the previous and next buttons, left and right arrow keys, or swipe to browse. Escape closes the gallery.</p>
            <div role="region" aria-roledescription="carousel" aria-label={title + ' screenshots'} className="flex min-h-0 flex-1 flex-col">
              <div className="relative min-h-0 flex-1 cursor-grab overflow-hidden bg-neutral-100 active:cursor-grabbing" style={{ touchAction: 'pan-y pinch-zoom' }}
                onPointerDown={(event) => {
                  if (event.button !== 0) return;
                  gestureStart.current = { x: event.clientX, y: event.clientY };
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerUp={(event) => {
                  const start = gestureStart.current;
                  gestureStart.current = null;
                  if (!start) return;
                  const dx = event.clientX - start.x;
                  const dy = event.clientY - start.y;
                  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1));
                }} onPointerCancel={() => { gestureStart.current = null; }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div key={screenshot.src} custom={direction}
                    variants={{ enter: (d: number) => ({ opacity: 0, x: reducedMotion ? 0 : d * 40 }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: reducedMotion ? 0 : -d * 40 }) }}
                    initial="enter" animate="center" exit="exit" transition={{ duration: reducedMotion ? 0 : 0.18 }}
                    role="group" aria-roledescription="slide" aria-label={(active + 1) + ' of ' + screenshots.length + ': ' + screenshot.title}
                    className="absolute inset-0 flex items-center justify-center p-3 sm:p-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={screenshot.src} alt={screenshot.alt} draggable={false} className="h-full w-full select-none object-contain" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="shrink-0 border-t border-black/10 px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <button type="button" aria-label="Previous screenshot" onClick={() => select(active - 1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/20 text-xl hover:bg-black hover:text-white">←</button>
                  <div aria-live="polite" aria-atomic="true" className="min-w-0 text-center">
                    <p className="text-[11px] tabular-nums text-black/45">{active + 1} / {screenshots.length}</p>
                    <p className="mt-1 text-sm font-medium">{screenshot.title}</p>
                  </div>
                  <button type="button" aria-label="Next screenshot" onClick={() => select(active + 1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/20 text-xl hover:bg-black hover:text-white">→</button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 text-xs text-black/50">
                  <span>Swipe or use the arrows</span>
                  <a href={screenshot.src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center underline underline-offset-4 hover:text-black">View full size ↗</a>
                </div>
              </div>
              <div ref={thumbnails} aria-label="Choose a screenshot" className="flex shrink-0 gap-2 overflow-x-auto border-t border-black/10 px-4 py-3 sm:px-6">
                {screenshots.map((item, index) => (
                  <button key={item.src} type="button" aria-label={'Go to screenshot ' + (index + 1) + ': ' + item.title} aria-current={active === index ? 'true' : undefined}
                    onClick={() => select(index)} className={'relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-neutral-100 p-1 ' + (active === index ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100')}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt="" loading="lazy" className="h-full w-full object-contain" />
                    <span className="absolute bottom-0 right-0 rounded-tl bg-black px-1 text-[9px] text-white">{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
