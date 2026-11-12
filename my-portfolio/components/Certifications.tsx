'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { certifications } from '@/lib/data';

export default function Certifications({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visibleCertifications = full ? certifications : certifications.slice(0, 3);
  const certificate = active === null ? null : certifications[active];

  useEffect(() => {
    const element = dialog.current;
    if (active === null || !element) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <section id="certs" className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 md:px-16 md:py-24">
      <div className="mx-auto mb-10 max-w-6xl md:mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">Learning &amp; credentials</p>
        {full ? <h1 className="mt-3 text-3xl font-bold text-black md:text-4xl">All Certifications</h1> : <h2 className="mt-3 text-3xl font-bold text-black md:text-4xl">Certifications</h2>}
        {full && <p className="mt-4 text-sm text-black/60">Select a certificate to see the full image and available credential details.</p>}
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCertifications.map((entry, index) => (
          <motion.button key={entry.title} type="button" aria-haspopup="dialog" aria-label={'View ' + entry.title + ' certificate'} onClick={() => setActive(index)}
            initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24, y: 18, rotate: index % 2 === 0 ? -2 : 2, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }} viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.06 }} whileHover={{ scale: 1.02 }}
            className="overflow-hidden rounded-xl border border-black/10 bg-neutral-50 text-left">
            <div className="aspect-[4/3] overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={entry.image} alt={entry.title + ' certificate issued by ' + entry.issuer} loading="lazy" className="h-full w-full object-contain" />
            </div>
            <div className="p-4"><p className="text-sm font-medium leading-snug text-black">{entry.title}</p><p className="mt-1 text-xs text-black/60">{entry.issuer}</p></div>
          </motion.button>
        ))}
      </div>
      {!full && <div className="mx-auto mt-8 max-w-6xl text-center"><Link href="/certifications" className="inline-flex min-h-11 items-center rounded-full border border-black/20 px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white">View all certifications ↗</Link></div>}

      <dialog ref={dialog} onClose={() => setActive(null)} onCancel={() => setActive(null)} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}
        aria-labelledby="certificate-title" data-lenis-prevent className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl bg-white p-0 text-black shadow-2xl">
        {certificate && <div>
          <div className="sticky top-0 z-10 flex justify-end bg-white/95 p-3">
            <button type="button" autoFocus onClick={() => setActive(null)} className="min-h-11 rounded-full border border-black/20 px-4 text-sm hover:bg-black hover:text-white" aria-label="Close certificate">Close ×</button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={certificate.image} alt={certificate.title + ' certificate issued by ' + certificate.issuer} className="max-h-[60dvh] w-full object-contain" />
          <div className="p-5 sm:p-7">
            <h2 id="certificate-title" className="text-lg font-semibold">{certificate.title}</h2>
            <p className="mt-1 text-sm text-black/60">{certificate.issuer}</p>
            {certificate.date && <p className="mt-2 text-sm text-black/60">Issued {certificate.date}</p>}
            {certificate.credentialId && <p className="mt-2 break-all text-xs text-black/60">Credential ID: {certificate.credentialId}</p>}
            {certificate.description && <p className="mt-3 text-sm leading-relaxed text-black/70">{certificate.description}</p>}
            {certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/80">Verify Certificate ↗</a>}
          </div>
        </div>}
      </dialog>
    </section>
  );
}
