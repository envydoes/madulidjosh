import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectImage from '@/components/ProjectImage';
import ProjectLinks from '@/components/ProjectLinks';
import ProjectGallery from '@/components/ProjectGallery';
import { projectScreenshots } from '@/lib/projectScreenshots';
import { projects } from '@/lib/data';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.id === slug);
  return { title: project?.title || 'Project not found', description: project?.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.id === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-white px-5 pb-20 pt-28 text-black sm:px-6 md:px-16 md:pt-36">
        <article className="mx-auto max-w-6xl">
          <Link href="/#projects" className="inline-flex min-h-11 items-center text-sm text-black/60 hover:text-black">← Back to projects</Link>
          <header className="mt-8 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">{project.badge} · {project.year}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/65">{project.description}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6">
              <h2 className="mb-5 text-sm font-semibold">Explore this project</h2>
              <ProjectLinks project={project} />
            </div>
          </header>

          <div className="my-12 aspect-video overflow-hidden rounded-2xl border border-black/10 bg-neutral-50">
            <ProjectImage src={project.image} alt={project.imageAlt} contain={project.imageFit === 'contain'} priority />
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <section aria-labelledby="objectives-heading">
              <h2 id="objectives-heading" className="text-2xl font-bold">Objectives</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-black/65">
                {project.objectives.map((objective) => <li key={objective}>{objective}</li>)}
              </ul>
              <h2 className="mb-4 mt-9 text-2xl font-bold">Technologies used</h2>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => <li key={tag} className="rounded-full border border-black/15 bg-neutral-100 px-4 py-2 text-sm">{tag}</li>)}
              </ul>
            </section>
            <section className="rounded-2xl border border-dashed border-black/25 p-6 sm:p-8" aria-labelledby="contribution-heading">
              <h2 id="contribution-heading" className="text-2xl font-bold">My contribution</h2>
              <p className="mt-5 text-sm leading-relaxed text-black/65">{project.contribution}</p>
            </section>
          </div>

          <ProjectGallery title={project.title} screenshots={projectScreenshots[project.id] || []} portrait={project.id === 'atom-ai-design'} />
          <div className="mt-12"><Link href="/#contact" className="inline-flex rounded-full bg-black px-6 py-3 text-sm text-white hover:bg-black/80">Get in touch ↗</Link></div>
        </article>
      </main>
      <Footer />
    </>
  );
}
