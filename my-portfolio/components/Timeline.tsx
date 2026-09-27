'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/lib/data';

export default function Timeline() {
  return (
    <section id="timeline" className="bg-white px-6 md:px-16 py-24">
      <div className="max-w-4xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/40">Journey</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Timeline</h2>
      </div>

      <div className="max-w-4xl mx-auto relative pl-8 border-l border-black/10">
        {timeline.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
            <span className="text-xs uppercase tracking-wide text-emerald-400">{t.year}</span>
            <h3 className="text-xl font-semibold text-black mt-1 mb-2">{t.title}</h3>
            <p className="text-black/60 text-sm leading-relaxed max-w-2xl">{t.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
