import Image from "next/image";

const projects = [
  {
    title: "Unbounded",
    label: "E-commerce / Brand",
    description:
      "A bold streetwear storefront for people who refuse the box. Built around a high-impact visual identity, sharp product presentation, and a frictionless shopping experience.",
    image: "/unbounded-cover.png",
    href: "https://unbounded-nu.vercel.app/",
    source: "https://github.com/envydoes/unbounded",
    featured: true,
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav">
        <a className="wordmark" href="#top" aria-label="Josh Madulid home">
          JM<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="mailto:hello@joshmadulid.dev">Contact</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Designer &amp; developer / Philippines</p>
          <h1>
            Digital work
            <br />
            with <em>character.</em>
          </h1>
          <p className="hero-intro">
            I make thoughtful, expressive websites and products for people
            building something worth remembering.
          </p>
          <a className="text-link" href="#work">
            Explore selected work <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span>J</span>
          <span>M</span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">01 / Selected work</p>
          <p className="section-note">A small selection of things I&apos;ve made.</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <a
                className="project-image"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} live site`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} landing page`}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 75vw"
                />
                <span className="image-overlay">Visit live site ↗</span>
              </a>
              <div className="project-details">
                <div>
                  <p className="project-label">{project.label}</p>
                  <h2>{project.title}</h2>
                </div>
                <div className="project-meta">
                  <p>{project.description}</p>
                  <a
                    className="source-link"
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View source <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <p className="eyebrow">02 / A little about me</p>
        <div className="about-content">
          <h2>
            Good work lives somewhere between a clear idea and a little
            <em> weirdness.</em>
          </h2>
          <p>
            I&apos;m Josh, a designer and developer who enjoys turning early
            ideas into polished digital experiences. I care about the details,
            the feeling, and making sure the final thing works beautifully.
          </p>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <p>Have a good idea?</p>
        <a href="mailto:hello@joshmadulid.dev">Let&apos;s talk <span>↗</span></a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Josh Madulid</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </main>
  );
}
