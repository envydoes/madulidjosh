import Reveal from './Reveal';

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 bg-white px-5 py-16 text-black sm:px-6 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">Academic background</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Education</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
          <Reveal direction="left" delay={0.08}>
            <h3 className="max-w-lg text-xl font-semibold leading-snug sm:text-2xl">Nueva Ecija University of Science and Technology</h3>
            <p className="mt-3 text-sm text-black/60">NEUST · Nueva Ecija, Philippines</p>
          </Reveal>
          <Reveal direction="right" delay={0.16}><dl className="space-y-5 text-sm">
            <div>
              <dt className="text-black/50">Degree</dt>
              <dd className="mt-1 font-medium leading-relaxed">Bachelor of Science in Information Technology</dd>
            </div>
            <div>
              <dt className="text-black/50">Specialization</dt>
              <dd className="mt-1 font-medium">Web Systems Technology</dd>
            </div>
            <div>
              <dt className="text-black/50">Years &amp; status</dt>
              <dd className="mt-1 font-medium">2023–present · Graduating</dd>
            </div>
          </dl></Reveal>
        </div>
      </div>
    </section>
  );
}
