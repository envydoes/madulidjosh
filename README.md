# React/Next.js + Framer Motion Scaffold

A lean starting scaffold implementing the three pieces you asked for explicitly:
hero stagger reveal, pinned/scrubbed showcase, and hover-tilt cards, plus Lenis wiring.
It is **not** a full port of your existing vanilla site — treat it as the
animation foundation to build the rest of your sections onto (badges matrix,
project grid, timeline, certs) using the same patterns.

## Install
```bash
npx create-next-app@latest my-portfolio --tailwind --app
cd my-portfolio
npm install framer-motion gsap @studio-freight/lenis
```

Copy `lib/SmoothScrollProvider.jsx` and `components/*` into the new project.

## Wire it up
`app/layout.js`:
```jsx
import SmoothScrollProvider from '@/lib/SmoothScrollProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
```

`app/page.js`:
```jsx
import Hero from '@/components/Hero';
import ScrollShowcase from '@/components/ScrollShowcase';

export default function Page() {
  return (
    <main>
      <Hero />
      <ScrollShowcase />
    </main>
  );
}
```

## File map
- `lib/SmoothScrollProvider.jsx` — Lenis instance + rAF loop, synced to GSAP ScrollTrigger.
- `components/Hero.jsx` — Framer Motion staggered entrance (badges + headline), `y:30→0`, `opacity:0→1`.
- `components/ScrollShowcase.jsx` — GSAP ScrollTrigger scrub (scale/parallax on enter) + pointer-driven 3D tilt.

## Next steps (not included, to keep this scaffold lean)
- Floating tech-stack badge matrix with magnetic hover (`framer-motion`'s `useMotionValue` + `animate` on `pointermove`, same math as the tilt handler above).
- Project grid with image zoom-on-hover + text lift (`whileHover={{ scale: 1.08 }}` on the image, `y: -4` on the text, inside an `overflow-hidden` wrapper).
- Point the image `src`s at your actual asset paths/CDN.
