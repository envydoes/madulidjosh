'use client';

import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';

type MotionMode = 'full' | 'reduced';
const preferenceKey = 'portfolio-motion';
const preferenceEvent = 'portfolio:motion-change';
const MotionPreferences = createContext<{ reducedMotion: boolean; setMotion: (mode: MotionMode) => void }>({ reducedMotion: true, setMotion: () => {} });
let temporaryPreference: MotionMode | undefined;

function subscribe(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  window.addEventListener('storage', callback);
  window.addEventListener(preferenceEvent, callback);
  return () => {
    media.removeEventListener('change', callback);
    window.removeEventListener('storage', callback);
    window.removeEventListener(preferenceEvent, callback);
  };
}

function getPreference(): MotionMode {
  if (temporaryPreference) return temporaryPreference;
  try {
    const saved = localStorage.getItem(preferenceKey);
    if (saved === 'full' || saved === 'reduced') return saved;
  } catch { /* Device preference still works when storage is unavailable. */ }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';
}

function setMotion(mode: MotionMode) {
  try { localStorage.setItem(preferenceKey, mode); } catch { temporaryPreference = mode; }
  window.dispatchEvent(new Event(preferenceEvent));
}

export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getPreference, () => 'reduced');
  return <MotionPreferences.Provider value={{ reducedMotion: mode === 'reduced', setMotion }}>{children}</MotionPreferences.Provider>;
}

export const useMotionPreferences = () => useContext(MotionPreferences);
