'use client';

import { motion, type Variants } from 'framer-motion';
import { FaEnvelope, FaFilePdf, FaGithub } from 'react-icons/fa';
import { profile } from '@/lib/data';

const nameReveal: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.94, rotateX: -8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const portraitReveal: Variants = {
  hidden: { opacity: 0, y: 120, scale: 0.84, rotateX: 12 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 78, damping: 18, delay: 0.48 },
  },
};

const leftReveal: Variants = {
  hidden: { opacity: 0, x: -64, scale: 0.96, rotateY: 8 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 105, damping: 19, delay: 0.12 },
  },
};

const rightReveal: Variants = {
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
  { label: 'GitHub', icon: <FaGithub size={16} aria-hidden="true" />, href: profile.github },
  { label: 'Email', icon: <FaEnvelope size={16} aria-hidden="true" />, href: 'mailto:' + profile.email },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-black">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ perspective: 1200 }}
        className="relative min-h-screen px-5 pb-10 pt-24 sm:px-6 lg:min-h-[800px] lg:px-16 lg:pb-0 lg:pt-28"
      >

        {/* Big split name — sits behind photo */}
        <motion.h1
          variants={nameReveal}
          className="relative z-0 mt-4 text-center text-[clamp(2.5rem,11vw,3.75rem)] font-extrabold leading-[0.9] tracking-tight sm:mt-6 lg:mt-10 lg:whitespace-nowrap lg:text-[clamp(4rem,10vw,7.5rem)]"
        >
          <span className="block text-transparent [-webkit-text-stroke:1.5px_black] lg:inline">JOSHUA</span>{' '}
          <span className="block text-black lg:inline">MADULID</span>
        </motion.h1>

        {/* Photo — large, centered, in front of name, bleeds to bottom */}
        <motion.div
          variants={portraitReveal}
          className="relative z-10 mx-auto mt-1 w-full max-w-[420px] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-[70vw] lg:max-w-[850px] lg:-translate-x-1/2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cv_img.png"
            alt="Portrait of Joshua Madulid wearing a black shirt"
            className="h-auto w-full"
          />
        </motion.div>

        {/* Lower-left: role + desc + CTA */}
        <motion.div
          variants={leftReveal}
          className="relative z-20 mx-auto mt-1 w-full max-w-xl lg:absolute lg:bottom-32 lg:left-[max(1.5rem,calc(50%-32.5vw))] lg:mx-0 lg:mt-0 lg:max-w-[260px]"
        >
          <h2 className="mb-3 text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
            Web Developer
          </h2>
          <p className="text-black/50 text-sm leading-relaxed mb-6">
            Building interactive, high-performance web experiences with clean systems underneath.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-medium !text-white transition-colors hover:bg-black/90 sm:px-6"
            >
              Let&apos;s collaborate ↗
            </a>
            <a
              href="/Joshua_Madulid_CV.pdf"
              download="Joshua_Madulid_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-3 text-sm font-medium text-black/70 transition-colors hover:border-black/50 hover:text-black sm:px-5"
            >
              <FaFilePdf size={15} aria-hidden="true" />
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Lower-right: socials */}
        <motion.div
          variants={rightReveal}
          className="relative z-20 mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2 lg:absolute lg:bottom-32 lg:right-[max(1.5rem,calc(50%-32.5vw))] lg:mx-0 lg:mt-0 lg:max-w-none lg:flex-col lg:gap-5"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-xs text-black/60 transition-colors hover:border-black/40 hover:text-black sm:px-4 sm:text-sm"
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
