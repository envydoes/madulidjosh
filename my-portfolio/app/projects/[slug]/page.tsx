import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectImage from '@/components/ProjectImage';
import ProjectLinks from '@/components/ProjectLinks';
import { projects } from '@/lib/data';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

const capturedScreenshotCaptions: Record<string, string> = {
  'unbounded-1': 'Unbounded landing page with its Live Without Limits headline and interactive garment viewer.',
  'unbounded-2': 'Unbounded collection showcasing the Signature, U, and Live Without Limits graphic tees.',
  'sumeste-portal-1': 'SumEste Portal landing page — the third carousel photo shows the Sumacab Este barangay hall.',
  'sumeste-portal-2': 'SumEste Portal landing page — the green introduction slide welcomes residents to barangay services.',
  'aurora-1': 'Aurora landing page with a Dingalan coastal photograph and Plan Your Journey introduction.',
  'aurora-2': 'Aurora room listings with accommodation features and reservation options.',
  'atom-ai-design-1': 'ATOM AI Figma login screen with email, password, Google, and Facebook sign-in options.',
  'atom-ai-design-2': 'ATOM AI Figma chat screen showing a conversation about interaction design and the message composer.',
};

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

          <section className="mt-16" aria-labelledby="screenshots-heading">
            <h2 id="screenshots-heading" className="scroll-mt-28 text-2xl font-bold">Project screenshots</h2>
            <div className={'mt-6 grid gap-6 md:grid-cols-2 ' + (project.id === 'atom-ai-design' ? 'mx-auto max-w-3xl' : '')}>
              {[1, 2].map((number) => {
                const caption = capturedScreenshotCaptions[project.id + '-' + number]
                  || 'TODO: Replace screenshot ' + number + ' with a real ' + project.title + ' screen and update its alt text.';
                return (
                  <figure key={number} className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-50">
                    <a href={'/images/projects/' + project.id + '-' + number + '.png'} target="_blank" rel="noopener noreferrer" aria-label={'Open ' + project.title + ' screenshot ' + number + ' at full size'} className={'mx-auto block ' + (project.id === 'atom-ai-design' ? 'aspect-[428/928] max-h-[640px]' : 'aspect-video')}>
                      <ProjectImage src={'/images/projects/' + project.id + '-' + number + '.png'} alt={caption} contain />
                    </a>
                    <figcaption className="p-4 text-sm leading-relaxed text-black/60">{caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
          <div className="mt-12"><Link href="/#contact" className="inline-flex rounded-full bg-black px-6 py-3 text-sm text-white hover:bg-black/80">Get in touch ↗</Link></div>
        </article>
      </main>
      <Footer />
    </>
  );
}
