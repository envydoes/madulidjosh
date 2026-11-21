'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import Link from 'next/link';
import ProjectImage from './ProjectImage';
import Reveal from './Reveal';
import { GenerationStage, generationLead } from './GenerationShimmer';
import { useMotionPreferences } from '@/lib/MotionPreferences';

export default function ProjectGrid({ full = false }: { full?: boolean }) {
  const { reducedMotion } = useMotionPreferences();
  const visibleProjects = full ? projects : projects.slice(0, 4);
  return (
    <section className="bg-white px-5 py-16 sm:px-6 md:px-16 md:py-24">
      <Reveal className="mx-auto mb-10 max-w-6xl md:mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-black/40">Selected Works</span>
        {full
          ? <h1 className="text-3xl md:text-4xl font-bold text-black mt-3">All Projects &amp; Systems</h1>
          : <h2 className="text-3xl md:text-4xl font-bold text-black mt-3">Projects &amp; Systems</h2>}
      </Reveal>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {visibleProjects.map((p, i) => {
          const delay = (i % 2) * 0.1;
          const outputDelay = reducedMotion ? 0 : delay + generationLead;
          return (
          <motion.div key={p.id} className="h-full" variants={{ hidden: {}, show: {} }} initial="hidden" whileInView="show"
            viewport={{ once: false, amount: 0.12, margin: '0px 0px -32px 0px' }}
          >
          <GenerationStage delay={delay} className="h-full">
          <motion.article
            variants={{
              hidden: {
                opacity: 0, visibility: 'hidden',
                x: reducedMotion ? 0 : i % 2 === 0 ? -30 : 30,
                y: reducedMotion ? 0 : 24,
                rotate: reducedMotion ? 0 : i % 2 === 0 ? -1 : 1,
                scale: reducedMotion ? 1 : 0.985,
                transition: { duration: 0.18, visibility: { duration: 0 } },
              },
              show: {
                opacity: 1, visibility: 'visible', x: 0, y: 0, rotate: 0, scale: 1,
                transition: { duration: reducedMotion ? 0.18 : 0.75, ease: [0.22, 1, 0.36, 1], delay: outputDelay, visibility: { duration: 0, delay: outputDelay } },
              },
            }}
            className="group relative h-full rounded-2xl overflow-hidden border border-black/10 bg-black/5 backdrop-blur-md block"
          >
            <Link href={`/projects/${p.id}`} className="flex h-full flex-col" aria-label={`View ${p.title} project details`}>
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

            <div className="flex flex-1 flex-col p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:p-6">
              <h3 className="text-xl font-semibold text-black mb-2">{p.title}</h3>
              <p className="mb-4 min-h-[4.5rem] text-sm leading-relaxed text-black/60">{p.description}</p>
              <p className="mb-4 min-h-[3rem] border-l-2 border-emerald-400 pl-3 text-sm leading-relaxed text-black/75"><span className="font-semibold">Objective: </span>{p.objective}</p>
              <div className="mb-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs rounded-full border border-black/10 bg-black/5 px-3 py-1 text-black/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-auto inline-flex min-h-11 items-center self-start rounded-full bg-black px-5 py-2 text-sm text-white">View project ↗</span>
            </div>
            </Link>
          </motion.article>
          </GenerationStage>
          </motion.div>
          );
        })}
      </div>
      {!full && (
        <div className="mx-auto mt-8 max-w-6xl text-center">
          <Link href="/projects" className="inline-flex min-h-11 items-center rounded-full border border-black/20 px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white">
            View more projects ↗
          </Link>
        </div>
      )}
    </section>
  );
}
