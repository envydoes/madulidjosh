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
import { techStack, skillGroups, colorFor } from '@/lib/data';
import Reveal from './Reveal';
import { useMotionPreferences } from '@/lib/MotionPreferences';

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
  const { reducedMotion } = useMotionPreferences();

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || e.pointerType !== 'mouse') return;
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
    <Reveal direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.04}>
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}
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
    </Reveal>
  );
}

export default function TechMatrix() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 md:px-16 md:py-24">
      <Reveal className="mx-auto mb-10 max-w-6xl md:mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/50">My toolkit</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Technical Skills</h2>
      </Reveal>
      <div className="mx-auto max-w-6xl divide-y divide-black/10">
        {skillGroups.map((group) => (
          <div key={group} className="grid gap-4 py-6 first:pt-0 md:grid-cols-[190px_1fr] md:gap-8">
            <Reveal direction="left"><h3 className="pt-2 text-sm font-semibold text-black">{group}</h3></Reveal>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {techStack.filter((tech) => tech.category === group).map((tech, index) => (
                <MagneticPill key={tech.name} name={tech.name} category={tech.category} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
