import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TechMatrix from '@/components/TechMatrix';
import ProjectGrid from '@/components/ProjectGrid';
import Timeline from '@/components/Timeline';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Education from '@/components/Education';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
      <div id="hero" className="scroll-mt-24">
        <Hero />
      </div>
      <About />
      <Education />
      <div id="stack" className="scroll-mt-24">
        <TechMatrix />
      </div>
      <div id="projects" className="scroll-mt-24">
        <ProjectGrid />
      </div>
      <Certifications />
      <Timeline />
      <Contact />
      </main>
      <Footer />
    </>
  );
}
