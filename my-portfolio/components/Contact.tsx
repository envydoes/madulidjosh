'use client';

import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white px-6 md:px-16 py-28 md:py-36 text-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Get in touch
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            You can reach me at
          </h2>
        </div>
        <div className="mt-8 text-center">
          <a
            href="mailto:madulidjoshuam@gmail.com"
            className="inline-block break-all text-xl font-medium underline decoration-black/20 underline-offset-8 transition-colors hover:decoration-black md:text-3xl"
          >
            madulidjoshuam@gmail.com
          </a>
        </div>

        <div className="mt-12 flex justify-center">
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
        </div>
      </motion.div>
    </section>
  );
}
