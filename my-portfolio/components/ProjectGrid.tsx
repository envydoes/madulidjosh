'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

export default function ProjectGrid() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 md:px-16 md:py-24">
      <div className="mx-auto mb-10 max-w-6xl md:mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/40">Selected Works</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Projects &amp; Systems</h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.liveUrl || p.githubUrl || p.designUrl || '#'}
            target={p.liveUrl || p.githubUrl || p.designUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? -48 : 48,
              y: 24,
              rotate: i % 2 === 0 ? -3 : 3,
              scale: 0.95,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 }}
            className="group relative rounded-2xl overflow-hidden border border-black/10 bg-black/5 backdrop-blur-md block"
          >
            <div className="relative aspect-video overflow-hidden bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.title}
                className={`w-full h-full ${p.imageFit === 'contain' ? 'object-contain bg-white' : 'object-cover'} transition-transform duration-500 ease-out group-hover:scale-[1.08]`}
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs text-white border border-white/20">
                  {p.badge}
                </span>
                <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs text-white/70 border border-white/20">
                  {p.year}
                </span>
              </div>
            </div>

            <div className="p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:p-6">
              <h3 className="text-xl font-semibold text-black mb-2">{p.title}</h3>
              <p className="text-sm text-black/60 leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs rounded-full border border-black/10 bg-black/5 px-3 py-1 text-black/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
