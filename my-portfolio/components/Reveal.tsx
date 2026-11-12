'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMotionPreferences } from '@/lib/MotionPreferences';

export const revealEase = [0.22, 1, 0.36, 1] as const;

export default function Reveal({ children, direction = 'up', delay = 0, ...props }: HTMLMotionProps<'div'> & {
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}) {
  const { reducedMotion } = useMotionPreferences();
  return (
    <motion.div {...props} data-reveal
      initial={{ opacity: 0, x: reducedMotion ? 0 : direction === 'left' ? -30 : direction === 'right' ? 30 : 0, y: reducedMotion ? 0 : 24, scale: reducedMotion ? 1 : 0.985 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.12, margin: '0px 0px -32px 0px' }}
      transition={{ duration: reducedMotion ? 0.18 : 0.7, ease: revealEase, delay: reducedMotion ? 0 : delay }}>
      {children}
    </motion.div>
  );
}
