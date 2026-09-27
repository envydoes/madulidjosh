'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const socials = [
  { label: 'GitHub', icon: <FaGithub size={16} />, href: 'https://github.com/envydoes' },
  { label: 'Instagram', icon: <FaInstagram size={16} />, href: '#' },
  { label: 'LinkedIn', icon: <FaLinkedinIn size={16} />, href: '#' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white text-black overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative min-h-screen px-6 md:px-16 pt-28"
      >

        {/* Big split name — sits behind photo */}
        <motion.h1
          variants={item}
          className="relative z-0 mt-10 text-[13vw] md:text-[7.5rem] leading-[0.9] font-extrabold tracking-tight whitespace-nowrap text-center"
        >
          <span className="text-transparent [-webkit-text-stroke:1.5px_black]">JOSHUA</span>{' '}
          <span className="text-black">MADULID</span>
        </motion.h1>

        {/* Photo — large, centered, in front of name, bleeds to bottom */}
        <motion.div
          variants={item}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 w-[72vw] max-w-[880px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cv_img.png"
            alt="Joshua Madulid"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Lower-left: role + desc + CTA */}
        <motion.div
          variants={item}
          className="absolute bottom-24 left-6 md:left-[max(1.5rem,calc(50%-32.5vw))] max-w-[260px] z-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 leading-tight">
            Web Developer
          </h2>
          <p className="text-black/50 text-sm leading-relaxed mb-6">
            Building interactive, high-performance web experiences with clean systems underneath.
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-black !text-white px-6 py-3 text-sm font-medium hover:bg-black/90 transition-colors"
          >
            Let&apos;s collaborate ↗
          </a>
        </motion.div>

        {/* Lower-right: socials */}
        <motion.div
          variants={item}
          className="absolute bottom-24 right-6 md:right-[max(1.5rem,calc(50%-32.5vw))] flex flex-col gap-5 z-20"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm text-black/60 hover:text-black hover:border-black/40 transition-colors"
            >
              <span>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
