'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '@/lib/data';

export default function Certifications() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="certs" className="bg-white px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/40">Verified</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Certifications</h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {certifications.map((c, i) => (
          <motion.button
            key={c.title}
            onClick={() => setActive(i)}
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? -24 : 24,
              y: 18,
              rotate: i % 2 === 0 ? -2 : 2,
              scale: 0.95,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            whileHover={{ scale: 1.03 }}
            className="text-left rounded-xl overflow-hidden border border-black/10 bg-black/5 backdrop-blur-md"
          >
            <div className="aspect-[4/3] bg-black/30 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-black leading-snug">{c.title}</p>
              <p className="text-xs text-black/50 mt-1">{c.issuer}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-2xl overflow-hidden border border-black/10 bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={certifications[active].image} alt={certifications[active].title} className="w-full" />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-black">{certifications[active].title}</h3>
                <p className="text-sm text-black/50 mt-1">{certifications[active].issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
