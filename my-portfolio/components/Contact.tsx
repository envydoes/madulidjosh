'use client';

import Reveal from './Reveal';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '@/lib/data';

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white px-5 py-20 text-black sm:px-6 md:px-16 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="left">
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Get in touch
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            You can reach me at
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 text-center">
          <a
            href="mailto:madulidjoshuam@gmail.com"
            className="inline-block break-all text-lg font-medium underline decoration-black/20 underline-offset-8 transition-colors hover:decoration-black sm:text-2xl md:text-3xl"
          >
            madulidjoshuam@gmail.com
          </a>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3">
          <a
            href="https://github.com/envydoes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm text-black/70 transition-colors hover:border-black/40 hover:text-black"
          >
            <FaGithub size={17} aria-hidden="true" />
            GitHub
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm text-black/70 hover:border-black/40 hover:text-black">
              <FaLinkedinIn size={17} aria-hidden="true" /> LinkedIn
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-black/20 px-5 py-3 text-sm text-black/60">
              <FaLinkedinIn size={17} aria-hidden="true" /> LinkedIn · TODO: Add profile URL
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
