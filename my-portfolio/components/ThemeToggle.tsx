'use client';

import { useThemePreferences, type ThemeMode } from '@/lib/ThemePreferences';

const options: { mode: ThemeMode; label: string }[] = [
  { mode: 'system', label: 'Use system theme' },
  { mode: 'light', label: 'Use light theme' },
  { mode: 'dark', label: 'Use dark theme' },
];

function Icon({ mode }: { mode: ThemeMode }) {
  if (mode === 'system') {
    return <><rect x="4" y="5" width="12" height="10" rx="1" /><path d="M2 19h16M8 15v4m4-4v4" /></>;
  }
  if (mode === 'light') {
    return <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>;
  }
  return <path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />;
}

export default function ThemeToggle() {
  const { mode, setMode } = useThemePreferences();

  return (
    <div className="flex items-center rounded-full border border-black/10 bg-black/5 p-1" aria-label="Theme preference">
      {options.map((option) => (
        <button
          key={option.mode}
          type="button"
          aria-label={option.label}
          aria-pressed={mode === option.mode}
          onClick={() => setMode(option.mode)}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${mode === option.mode ? 'bg-black text-white' : 'text-black/60 hover:bg-black/10 hover:text-black'}`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Icon mode={option.mode} />
          </svg>
        </button>
      ))}
    </div>
  );
}
