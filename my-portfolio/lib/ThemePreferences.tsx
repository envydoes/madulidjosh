'use client';

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';

const preferenceKey = 'portfolio-theme';
const preferenceEvent = 'portfolio:theme-change';
const ThemePreferences = createContext<{ mode: ThemeMode; setMode: (mode: ThemeMode) => void }>({
  mode: 'system',
  setMode: () => {},
});

function getStoredMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(preferenceKey);
    if (saved === 'system' || saved === 'light' || saved === 'dark') return saved;
  } catch {
    // System mode remains the default when storage is unavailable.
  }
  return 'system';
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(preferenceEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(preferenceEvent, callback);
  };
}

function setStoredMode(mode: ThemeMode) {
  try {
    localStorage.setItem(preferenceKey, mode);
  } catch {
    // The current tab still applies the mode through the provider effect.
  }
  window.dispatchEvent(new Event(preferenceEvent));
}

export function ThemePreferencesProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore<ThemeMode>(subscribe, getStoredMode, () => 'system');

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const isDark = mode === 'dark' || (mode === 'system' && prefersDark.matches);
      root.dataset.theme = isDark ? 'dark' : 'light';
    };

    applyTheme();
    prefersDark.addEventListener('change', applyTheme);
    return () => prefersDark.removeEventListener('change', applyTheme);
  }, [mode]);

  return <ThemePreferences.Provider value={{ mode, setMode: setStoredMode }}>{children}</ThemePreferences.Provider>;
}

export const useThemePreferences = () => useContext(ThemePreferences);
