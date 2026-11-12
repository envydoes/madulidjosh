'use client';

import { motion, type Variants } from 'framer-motion';
import { FaEnvelope, FaFilePdf, FaGithub } from 'react-icons/fa';
import { profile } from '@/lib/data';
import { useMotionPreferences } from '@/lib/MotionPreferences';
import { revealEase } from './Reveal';

const socials = [
  { label: 'GitHub', icon: <FaGithub size={16} aria-hidden="true" />, href: profile.github },
  { label: 'Email', icon: <FaEnvelope size={16} aria-hidden="true" />, href: 'mailto:' + profile.email },
];

export default function Hero() {
  const { reducedMotion } = useMotionPreferences();
  const viewport = { once: false, amount: 0.15 };
  function entrance(x = 0, y = 32, delay = 0, scale = 0.98): Variants {
    return {
      hidden: { opacity: 0, x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y, scale: reducedMotion ? 1 : scale, transition: { duration: 0.2 } },
      show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: reducedMotion ? 0.18 : 0.9, ease: revealEase, delay: reducedMotion ? 0 : delay } },
    };
  }
  const group: Variants = { hidden: {}, show: {} };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="relative min-h-screen px-5 pb-10 pt-24 sm:px-6 lg:min-h-[800px] lg:px-16 lg:pb-0 lg:pt-28">
        <motion.h1 variants={group} initial="hidden" whileInView="show" viewport={viewport}
          className="relative z-0 mt-4 text-center text-[clamp(2.5rem,11vw,3.75rem)] font-extrabold leading-[0.9] tracking-tight sm:mt-6 lg:mt-10 lg:whitespace-nowrap lg:text-[clamp(4rem,10vw,7.5rem)]">
          <motion.span data-hero-reveal="first-name" variants={entrance(-22, 42, 0.1)} className="block text-transparent [-webkit-text-stroke:1.5px_black] lg:inline-block">JOSHUA</motion.span>{' '}
          <motion.span data-hero-reveal="last-name" variants={entrance(22, 42, 0.24)} className="block text-black lg:inline-block">MADULID</motion.span>
        </motion.h1>

        {/* Keep positioning separate from the animated transform. */}
        <div className="relative z-10 mx-auto mt-1 w-full max-w-[420px] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-[70vw] lg:max-w-[850px] lg:-translate-x-1/2">
          <motion.div data-hero-reveal="portrait" variants={entrance(0, 88, 0.36, 0.94)} initial="hidden" whileInView="show" viewport={viewport} style={{ transformOrigin: '50% 100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cv_img.png" alt="Portrait of Joshua Madulid wearing a black shirt" fetchPriority="high" className="h-auto w-full" />
          </motion.div>
        </div>

        <motion.div variants={group} initial="hidden" whileInView="show" viewport={viewport}
          className="relative z-20 mx-auto mt-1 w-full max-w-xl lg:absolute lg:bottom-32 lg:left-[max(1.5rem,calc(50%-32.5vw))] lg:mx-0 lg:mt-0 lg:max-w-[260px]">
          <motion.h2 data-hero-reveal="role" variants={entrance(-36, 16, 0.5)} className="mb-3 text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">Web Developer</motion.h2>
          <motion.p data-hero-reveal="description" variants={entrance(-24, 16, 0.64)} className="mb-6 text-sm leading-relaxed text-black/50">
            Building interactive, high-performance web experiences with clean systems underneath.
          </motion.p>
          <motion.div variants={group} className="flex flex-wrap gap-3">
            <motion.a data-hero-reveal="collaborate" variants={entrance(-16, 18, 0.78)} href="#contact" whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-medium !text-white transition-colors hover:bg-black/90 sm:px-6">
              Let&apos;s collaborate ↗
            </motion.a>
            <motion.a data-hero-reveal="cv" variants={entrance(-16, 18, 0.9)} href="/Joshua_Madulid_CV.pdf" download="Joshua_Madulid_CV.pdf" whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-3 text-sm font-medium text-black/70 transition-colors hover:border-black/50 hover:text-black sm:px-5">
              <FaFilePdf size={15} aria-hidden="true" /> Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div variants={group} initial="hidden" whileInView="show" viewport={viewport}
          className="relative z-20 mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2 lg:absolute lg:bottom-32 lg:right-[max(1.5rem,calc(50%-32.5vw))] lg:mx-0 lg:mt-0 lg:max-w-none lg:flex-col lg:gap-5">
          {socials.map((social, index) => (
            <motion.a key={social.label} data-hero-reveal={social.label.toLowerCase()} variants={entrance(36, 12, 0.64 + index * 0.14)} href={social.href} target="_blank" rel="noopener noreferrer"
              whileHover={reducedMotion ? undefined : { x: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-xs text-black/60 transition-colors hover:border-black/40 hover:text-black sm:px-4 sm:text-sm">
              <span>{social.icon}</span>{social.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
