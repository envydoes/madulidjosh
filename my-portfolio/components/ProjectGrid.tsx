'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import Link from 'next/link';
import ProjectImage from './ProjectImage';

export default function ProjectGrid() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 md:px-16 md:py-24">
      <div className="mx-auto mb-10 max-w-6xl md:mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/40">Selected Works</span>
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Projects &amp; Systems</h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
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
            <Link href={`/projects/${p.id}`} className="block h-full" aria-label={`View ${p.title} project details`}>
            <div className="relative aspect-video overflow-hidden bg-neutral-100">
              <ProjectImage src={p.image} alt={p.imageAlt} contain={p.imageFit === 'contain'} />
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
              <p className="mb-4 border-l-2 border-emerald-400 pl-3 text-sm leading-relaxed text-black/75"><span className="font-semibold">Objective: </span>{p.objective}</p>
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
              <span className="mt-6 inline-flex min-h-11 items-center rounded-full bg-black px-5 py-2 text-sm text-white">View project ↗</span>
            </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
