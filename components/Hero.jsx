'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const badges = ['Available for Hire', 'Based in Philippines', 'Full-Stack + UI/UX'];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0F0F10] text-white flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
        <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
          {badges.map((b) => (
            <motion.span
              key={b}
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(16,185,129,0.3)' }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {b}
            </motion.span>
          ))}
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
          Full-Stack Web Developer
          <br />
          <span className="text-white/40">&amp; UI/UX Specialist</span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
