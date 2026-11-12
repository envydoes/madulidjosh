'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/lib/data';

export default function Timeline() {
  return (
    <section id="experience" className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 md:px-16 md:py-24">
      <div id="timeline" className="mx-auto mb-10 max-w-6xl scroll-mt-24 md:mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/40">Journey</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Experience &amp; Accomplishments</h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative border-l border-black/10 pl-7 sm:pl-8">
        {timeline.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? -36 : 36,
              y: 16,
              rotate: i % 2 === 0 ? -2 : 2,
              scale: 0.97,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-[36px] top-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)] sm:-left-[41px]" />
            <span className="text-xs uppercase tracking-wide text-emerald-400">{t.year}</span>
            <h3 className="text-xl font-semibold text-black mt-1 mb-2">{t.title}</h3>
            <p className="text-black/60 text-sm leading-relaxed max-w-2xl">{t.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-black">Accomplishments</h3>
        <ul className="mt-6 space-y-5 text-sm leading-relaxed text-black/65">
          <li><p className="font-semibold text-black">Dean’s Lister</p><p className="mt-1">1st and 2nd semesters, 2023–2024</p><p>1st semester, 2025</p></li>
          <li className="border-t border-dashed border-black/20 pt-5">TODO: Add other accomplishments, seminars, contests, or internship/OJT experience, including dates and your role. Include only items you have completed.</li>
        </ul>
      </div>
      </div>
    </section>
  );
}
