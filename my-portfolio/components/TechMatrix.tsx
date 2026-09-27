'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { techStack, colorFor } from '@/lib/data';

function MagneticPill({ name, category, index }: { name: string; category: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const color = colorFor(category);
  const fromX = index % 2 === 0 ? -50 : 50;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    x.set((e.clientX - b.left - b.width / 2) * 0.3);
    y.set((e.clientY - b.top - b.height / 2) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileHover={{
        backgroundColor: 'rgba(255,255,255,0.09)',
        borderColor: color,
        boxShadow: `0 0 20px ${color}33`,
      }}
      className="flex items-center gap-2 rounded-full border border-black/15 bg-neutral-100 backdrop-blur-md px-4 py-2 text-sm text-black cursor-default select-none"
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {name}
    </motion.div>
  );
}

export default function TechMatrix() {
  return (
    <section className="bg-white px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/40">Tech Stack Matrix</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Toolkit</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {techStack.map((t, i) => (
          <MagneticPill key={t.name} name={t.name} category={t.category} index={i} />
        ))}
      </div>
    </section>
  );
}
