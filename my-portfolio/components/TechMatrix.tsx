'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiApache,
  SiClaudecode,
  SiCoolify,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbApi, TbBrandCss3, TbBrandOpenai } from 'react-icons/tb';
import { techStack, colorFor } from '@/lib/data';

const techIcons: Record<string, { Icon: IconType; color: string }[]> = {
  PHP: [{ Icon: SiPhp, color: '#777BB4' }],
  MySQL: [{ Icon: SiMysql, color: '#4479A1' }],
  JavaScript: [{ Icon: SiJavascript, color: '#C9A900' }],
  TypeScript: [{ Icon: SiTypescript, color: '#3178C6' }],
  'Tailwind CSS': [{ Icon: SiTailwindcss, color: '#06B6D4' }],
  'HTML5 & CSS3': [
    { Icon: SiHtml5, color: '#E34F26' },
    { Icon: TbBrandCss3, color: '#1572B6' },
  ],
  'Node.js': [{ Icon: SiNodedotjs, color: '#5FA04E' }],
  'RESTful APIs': [{ Icon: TbApi, color: '#64748B' }],
  Docker: [{ Icon: SiDocker, color: '#2496ED' }],
  Coolify: [{ Icon: SiCoolify, color: '#6C4CE4' }],
  'Git & GitHub': [
    { Icon: SiGit, color: '#F05032' },
    { Icon: SiGithub, color: '#181717' },
  ],
  Figma: [{ Icon: SiFigma, color: '#F24E1E' }],
  'Claude Code': [{ Icon: SiClaudecode, color: '#D97757' }],
  'Google Gemini': [{ Icon: SiGooglegemini, color: '#4285F4' }],
  OpenAI: [{ Icon: TbBrandOpenai, color: '#412991' }],
  'Linux / Apache': [
    { Icon: SiLinux, color: '#E3A800' },
    { Icon: SiApache, color: '#D22128' },
  ],
};

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
      initial={{ opacity: 0, x: fromX, y: 12, rotate: index % 2 === 0 ? -3 : 3, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
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
      <span className="flex items-center gap-1">
        {techIcons[name]?.map(({ Icon, color: iconColor }, iconIndex) => (
          <Icon
            key={`${name}-${iconIndex}`}
            size={15}
            color={iconColor}
            aria-hidden="true"
          />
        ))}
      </span>
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
