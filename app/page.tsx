import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ScrollShowcase from '@/components/ScrollShowcase';
import TechMatrix from '@/components/TechMatrix';
import ProjectGrid from '@/components/ProjectGrid';
import Timeline from '@/components/Timeline';
import Certifications from '@/components/Certifications';

export default function Home() {
  return (
    <main>
      <Nav />
      <div id="hero">
        <Hero />
      </div>
      <div id="showcase">
        <ScrollShowcase />
      </div>
      <div id="stack">
        <TechMatrix />
      </div>
      <div id="projects">
        <ProjectGrid />
      </div>
      <Timeline />
      <Certifications />
    </main>
  );
}
