'use client';

import { useMotionPreferences } from '@/lib/MotionPreferences';

export default function MotionToggle() {
  const { reducedMotion, setMotion } = useMotionPreferences();
  return (
    <button type="button" aria-pressed={!reducedMotion} aria-label="Enable full animations"
      onClick={() => setMotion(reducedMotion ? 'full' : 'reduced')}
      className="inline-flex min-h-11 items-center rounded-full border border-black/15 px-4 text-xs hover:border-black/40 hover:text-black">
      Motion: {reducedMotion ? 'reduced' : 'full'}
    </button>
  );
}
