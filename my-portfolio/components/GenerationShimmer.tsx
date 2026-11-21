'use client';

import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionPreferences } from '@/lib/MotionPreferences';

export const generationLead = 0.72;

type DotArea = { left: number; top: number; width: number; height: number; mask: string };
type Region = Omit<DotArea, 'mask'>;
const svgMask = (markup: string) => `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;

// Four repeating textures keep large text and photographs inexpensive:
// only four animated layers, regardless of how many dots fit in the content.
const dotTextures = Array.from({ length: 4 }, (_, layer) => {
  let circles = '';
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 24; column++) {
      const seed = (column * 37 + row * 19 + row * column * 11) % 101;
      if (seed % 4 !== layer) continue;
      circles += `<circle cx="${column * 6 + 3}" cy="${row * 6 + 3}" r="1.15" fill="white" opacity="${0.72 + seed / 360}"/>`;
    }
  }
  return svgMask(`<svg xmlns="http://www.w3.org/2000/svg" width="144" height="60">${circles}</svg>`);
});
const flicker = [
  [0, 0.95, 0.2, 0.75, 0.1, 1, 0.3, 0.8, 0],
  [0, 0.15, 0.9, 0.25, 0.85, 0.2, 1, 0.35, 0],
  [0, 0.6, 0.1, 1, 0.3, 0.75, 0.15, 0.95, 0],
  [0, 0.25, 0.75, 0.15, 1, 0.4, 0.85, 0.1, 0],
];

function measureContent(stage: HTMLElement): DotArea | null {
  const content = stage.firstElementChild as HTMLElement | null;
  if (!content || !content.offsetWidth || !content.offsetHeight) return null;
  const bounds = content.getBoundingClientRect();
  // Undo the entrance's scale/translation so dots stay at the final position.
  const scaleX = bounds.width / content.offsetWidth || 1;
  const scaleY = bounds.height / content.offsetHeight || 1;
  const regionFor = (rect: DOMRect): Region => ({
    left: (rect.left - bounds.left) / scaleX + content.offsetLeft,
    top: (rect.top - bounds.top) / scaleY + content.offsetTop,
    width: rect.width / scaleX,
    height: rect.height / scaleY,
  });
  const regions: Region[] = [];
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (!node.textContent?.trim() || node.parentElement?.closest('svg, [aria-hidden="true"]')) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    for (const rect of range.getClientRects()) {
      if (rect.width > 0 && rect.height > 0) regions.push(regionFor(rect));
    }
  }
  content.querySelectorAll('img, svg').forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) regions.push(regionFor(rect));
  });
  if (!regions.length) return null;

  const left = Math.min(...regions.map((region) => region.left));
  const top = Math.min(...regions.map((region) => region.top));
  const width = Math.max(...regions.map((region) => region.left + region.width)) - left;
  const height = Math.max(...regions.map((region) => region.top + region.height)) - top;
  const portrait = stage.classList.contains('generation-target--portrait') && content.querySelector('img');
  // The transparent portrait masks the dots to the person's silhouette.
  const mask = portrait
    ? `url(${JSON.stringify(portrait.currentSrc || portrait.src)})`
    : svgMask(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${regions.map((region) => `<rect x="${region.left - left}" y="${region.top - top}" width="${region.width}" height="${region.height}" fill="white"/>`).join('')}</svg>`);
  return { left, top, width, height, mask };
}

// Hidden output reserves its real layout; dots are an independent sibling.
export function GenerationStage({ children, delay, className = '', as: Tag = 'div' }: {
  children: ReactNode;
  delay: number;
  className?: string;
  as?: 'div' | 'span';
}) {
  const stageRef = useRef<HTMLElement | null>(null);
  const [area, setArea] = useState<DotArea | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const next = measureContent(stage);
      setArea((current) => JSON.stringify(current) === JSON.stringify(next) ? current : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    if (stage.firstElementChild) observer.observe(stage.firstElementChild);
    const images = Array.from(stage.querySelectorAll('img'));
    images.forEach((image) => image.addEventListener('load', measure));
    void document.fonts.ready.then(measure);
    return () => {
      disposed = true;
      observer.disconnect();
      images.forEach((image) => image.removeEventListener('load', measure));
    };
  }, [children]);

  return (
    <Tag ref={(node) => { stageRef.current = node; }} className={`generation-target ${className}`}>
      {children}
      <GenerationShimmer delay={delay} area={area} />
    </Tag>
  );
}

function GenerationShimmer({ delay, area }: { delay: number; area: DotArea | null }) {
  const { reducedMotion } = useMotionPreferences();
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = shimmerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [area]);

  if (reducedMotion || !area) return null;

  return (
    <motion.span ref={shimmerRef} aria-hidden="true" className="generation-shimmer"
      data-dot-rows={Math.max(2, Math.ceil(area.height / 6))}
      style={{ left: area.left, top: area.top, width: area.width, height: area.height, maskImage: area.mask }}
      initial={{ opacity: 0 }}
      animate={visible ? {
        opacity: [0, 1, 1, 0],
        transition: { duration: 1.35, times: [0, 0.12, 0.72, 1], delay },
      } : { opacity: 0 }}>
      {dotTextures.map((texture, index) => (
        <motion.span key={index} className="generation-shimmer__dots" style={{ maskImage: texture }}
          initial={{ opacity: 0 }}
          animate={visible ? {
            opacity: flicker[index],
            transition: { duration: 1.2, delay: delay + 0.02 + index * 0.015, ease: 'linear' },
          } : { opacity: 0 }} />
      ))}
    </motion.span>
  );
}

