'use client';
import { useRef, useState } from 'react';

const ITEMS = [
  ['white-beach', 'White Beach', 'Crystal clear waters and pristine white sand beaches'],
  ['mountainview', 'Mountain View', 'Breathtaking views of the Sierra Madre mountain range'],
  ['dingalan-point', 'Sunset Point', 'Spectacular sunsets over the Pacific Ocean'],
  ['lighthouse', 'Lighthouse', 'The iconic Dingalan Lighthouse overlooking the Pacific Ocean'],
  ['seacliffs', 'Sea Cliffs', 'Dramatic cliffs overlooking the ocean'],
  ['coastline', 'Coastline', 'Stunning coastline views and dramatic seascapes'],
  ['hiddenwaterfall', 'Hidden Waterfall', 'Discover secluded waterfalls in the forest'],
  ['lamao-cave', 'Lamao Cave', 'Explore ancient cave formations'],
];

export default function Gallery() {
  const grid = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const scroll = (dir: number) => grid.current?.scrollBy({ left: dir * grid.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <section className="gallery">
      <div className="gallery-title"><h2>Gallery</h2></div>
      <div className="gallery-container">
        <button className="gallery-nav prev" aria-label="Previous image" onClick={() => scroll(-1)}></button>
        <div className="gallery-grid" ref={grid}>
          {ITEMS.map(([file, title, caption]) => (
            <div className="gallery-item" key={file} onClick={() => setLightbox({ src: `/images/${file}.jpg`, alt: title })}>
              <img src={`/images/${file}.jpg`} alt={title} className="gallery-img" />
              <div className="gallery-caption"><strong>{title}</strong>{caption}</div>
            </div>
          ))}
        </div>
        <button className="gallery-nav next" aria-label="Next image" onClick={() => scroll(1)}></button>
      </div>
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <button className="lightbox-close" onClick={() => setLightbox(null)}>&times;</button>
          </div>
        </div>
      )}
    </section>
  );
}
