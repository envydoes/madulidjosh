export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white px-5 py-16 text-black sm:px-6 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">A little about me</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">About Me</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-black/65">
            <p>I’m Joshua Madulid, a graduating Bachelor of Science in Information Technology student at Nueva Ecija University of Science and Technology (NEUST), specializing in Web Systems Technology. My portfolio brings together web development projects and interface design work, with a focus on clear, usable digital experiences.</p>
            <div className="border-l-2 border-emerald-400 pl-5">
              <h3 className="mb-2 text-sm font-semibold text-black">Career objective</h3>
              <p>To begin my career in web development, applying my Web Systems Technology education to build useful, accessible systems while learning from an experienced team.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6 sm:p-8">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Education</h3>
            <p className="text-lg font-semibold leading-snug">Nueva Ecija University of Science and Technology</p>
            <p className="mt-1 text-sm text-black/60">NEUST · Nueva Ecija, Philippines</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="text-black/50">Degree</dt><dd className="mt-1 font-medium">Bachelor of Science in Information Technology</dd></div>
              <div><dt className="text-black/50">Specialization</dt><dd className="mt-1 font-medium">Web Systems Technology</dd></div>
              <div><dt className="text-black/50">Years &amp; status</dt><dd className="mt-1 font-medium">2023–present · Graduating</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
