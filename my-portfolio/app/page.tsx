import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TechMatrix from '@/components/TechMatrix';
import ProjectGrid from '@/components/ProjectGrid';
import Timeline from '@/components/Timeline';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Nav />
      <div id="hero" className="scroll-mt-24">
        <Hero />
      </div>
      <div id="stack" className="scroll-mt-24">
        <TechMatrix />
      </div>
      <div id="projects" className="scroll-mt-24">
        <ProjectGrid />
      </div>
      <Timeline />
      <Certifications />
      <Contact />
    </main>
  );
}
