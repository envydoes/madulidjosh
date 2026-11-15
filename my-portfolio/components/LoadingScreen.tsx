'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading Joshua Madulid portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="loading-screen fixed inset-0 z-[100] grid place-items-center bg-white"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.7, rotate: -18 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid h-28 w-28 place-items-center rounded-full border border-black/10"
            >
              <motion.span
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-1 rounded-full border-2 border-transparent border-t-black border-r-black/20"
              />
              <Logo href="/" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50"
            >
              Joshua Madulid
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
