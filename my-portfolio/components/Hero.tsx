'use client';

import { motion } from 'framer-motion';
import { FaFacebookF, FaFilePdf, FaGithub, FaInstagram } from 'react-icons/fa';

const nameReveal = {
  hidden: { opacity: 0, y: 34, scale: 0.94, rotateX: -8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const portraitReveal = {
  hidden: { opacity: 0, y: 120, scale: 0.84, rotateX: 12 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 78, damping: 18, delay: 0.48 },
  },
};

const leftReveal = {
  hidden: { opacity: 0, x: -64, scale: 0.96, rotateY: 8 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 105, damping: 19, delay: 0.12 },
  },
};

const rightReveal = {
  hidden: { opacity: 0, x: 64, scale: 0.96, rotateY: -8 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 105, damping: 19, delay: 0.2 },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

const socials = [
  { label: 'Facebook', icon: <FaFacebookF size={16} />, href: 'https://www.facebook.com/Joshngmundo.lV/' },
  { label: 'GitHub', icon: <FaGithub size={16} />, href: 'https://github.com/envydoes' },
  { label: 'Instagram', icon: <FaInstagram size={16} />, href: 'https://www.instagram.com/envydoes_/' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white text-black overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ perspective: 1200 }}
        className="relative min-h-screen px-6 md:px-16 pt-28"
      >

        {/* Big split name — sits behind photo */}
        <motion.h1
          variants={nameReveal}
          className="relative z-0 mt-10 text-[13vw] md:text-[7.5rem] leading-[0.9] font-extrabold tracking-tight whitespace-nowrap text-center"
        >
          <span className="text-transparent [-webkit-text-stroke:1.5px_black]">JOSHUA</span>{' '}
          <span className="text-black">MADULID</span>
        </motion.h1>

        {/* Photo — large, centered, in front of name, bleeds to bottom */}
        <motion.div
          variants={portraitReveal}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 w-[80vw] max-w-[1000px]"
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
          variants={leftReveal}
          className="absolute bottom-32 left-6 md:left-[max(1.5rem,calc(50%-32.5vw))] max-w-[260px] z-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 leading-tight">
            Web Developer
          </h2>
          <p className="text-black/50 text-sm leading-relaxed mb-6">
            Building interactive, high-performance web experiences with clean systems underneath.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-black !text-white px-6 py-3 text-sm font-medium hover:bg-black/90 transition-colors"
            >
              Let&apos;s collaborate ↗
            </a>
            <a
              href="/Joshua_Madulid_CV.pdf"
              download="Joshua_Madulid_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm font-medium text-black/70 transition-colors hover:border-black/50 hover:text-black"
            >
              <FaFilePdf size={15} aria-hidden="true" />
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Lower-right: socials */}
        <motion.div
          variants={rightReveal}
          className="absolute bottom-32 right-6 md:right-[max(1.5rem,calc(50%-32.5vw))] flex flex-col gap-5 z-20"
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
