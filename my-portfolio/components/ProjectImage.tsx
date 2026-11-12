'use client';

import { useState } from 'react';

export default function ProjectImage({ src, alt, contain = false, priority = false }: { src: string; alt: string; contain?: boolean; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={alt} className="flex h-full min-h-40 items-center justify-center bg-neutral-100 p-6 text-center text-sm text-black/60">TODO: Add the project image.</div>;
  }
  return (
    // Local PNGs and source screenshots retain their original detail.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} width={1280} height={720} onError={() => setFailed(true)}
      className={'h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ' + (contain ? 'object-contain bg-white' : 'object-cover object-top')} />
  );
}
