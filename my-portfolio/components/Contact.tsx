'use client';

import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white px-5 py-20 text-black sm:px-6 md:px-16 md:py-36"
    >
      <motion.div
        initial={{ opacity: 0, x: -28, y: 18, rotateY: -4, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Get in touch
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            You can reach me at
          </h2>
        </div>
        <div className="mt-8 text-center">
          <a
            href="mailto:madulidjoshuam@gmail.com"
            className="inline-block break-all text-lg font-medium underline decoration-black/20 underline-offset-8 transition-colors hover:decoration-black sm:text-2xl md:text-3xl"
          >
            madulidjoshuam@gmail.com
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3">
          <a
            href="https://www.facebook.com/Joshngmundo.lV/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook profile"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm text-black/70 transition-colors hover:border-black/40 hover:text-black"
          >
            <FaFacebookF size={17} aria-hidden="true" />
            Facebook
          </a>
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
          <a
            href="https://www.instagram.com/envydoes_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm text-black/70 transition-colors hover:border-black/40 hover:text-black"
          >
            <FaInstagram size={17} aria-hidden="true" />
            Instagram
          </a>
        </div>
      </motion.div>
    </section>
  );
}
