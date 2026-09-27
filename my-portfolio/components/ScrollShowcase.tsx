'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { title: 'Google AI Certificate', tag: 'Certification', img: '/images/google-ai-professional-certificate.png' },
  { title: 'System Integration', tag: 'Enterprise', img: '/images/upskill-system-integration.png' },
  { title: 'Enterprise Architecture', tag: 'Enterprise', img: '/images/upskill-enterprise-architecture.png' },
];

export default function ScrollShowcase() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { scale: 0.95, y: 60, opacity: 0.5 },
          {
            scale: 1, y: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 40%', scrub: 0.6 },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleTilt(e, card) {
    const b = card.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width;
    const py = (e.clientY - b.top) / b.height;
    gsap.to(card, {
      rotateY: (px - 0.5) * 10,
      rotateX: (0.5 - py) * 10,
      scale: 1.03,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  function resetTilt(card) {
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
  }

  return (
    <section ref={sectionRef} className="min-h-screen bg-white py-32 px-6 md:px-16">
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={c.title}
            ref={(el) => (cardRefs.current[i] = el)}
            onPointerMove={(e) => handleTilt(e, cardRefs.current[i])}
            onPointerLeave={() => resetTilt(cardRefs.current[i])}
            className="rounded-2xl border border-black/10 bg-black/5 backdrop-blur-md p-6 will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="inline-block text-xs uppercase tracking-wide text-emerald-400 mb-3">{c.tag}</span>
            <h3 className="text-xl font-semibold text-black mb-4">{c.title}</h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
