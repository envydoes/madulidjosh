import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectGrid from '@/components/ProjectGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore Joshua Madulid’s web development, real-estate, full-stack, and UI/UX projects.',
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-white pt-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Link href="/#projects" className="inline-flex min-h-11 items-center text-sm text-black/60 hover:text-black">
            ← Back to portfolio
          </Link>
        </div>
        <ProjectGrid full />
      </main>
      <Footer />
    </>
  );
}
