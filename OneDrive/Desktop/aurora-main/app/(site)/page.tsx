import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import BookingForm from '@/components/BookingForm';
import RoomCalendar from '@/components/RoomCalendar';
import ContactForm from '@/components/ContactForm';
import { getRooms } from '@/lib/data';
import { metaFor } from '@/lib/roomMeta';

export const revalidate = 60; // room edits in the admin show up within a minute

export default async function Home() {
  const rooms = await getRooms();

  return (
    <>
      <Navbar />

      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Dingalan Aurora</h1>
          <p className="hero-subtitle">A Hidden Gem on the Pacific Coast</p>
          <a href="#attractions" className="cta-button">Plan Your Journey</a>
        </div>
        <div className="hero-wave" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 100 }}>
            <path fill="#f5f9fa" d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120Z" />
          </svg>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2>About Dingalan</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Dingalan is a first-class municipality in the province of Aurora, Philippines. Known for its pristine beaches, majestic mountains, and rich cultural heritage, Dingalan offers visitors an unforgettable experience of natural beauty and local hospitality.</p>
              <p>With its strategic location along the Pacific coast, Dingalan boasts stunning coastal views, crystal-clear waters, and a perfect blend of adventure and relaxation.</p>
            </div>
            <div className="about-image">
              <img src="/images/dingalan-placeholder.jpg" alt="Dingalan View" className="about-img-placeholder" />
            </div>
          </div>
        </div>
      </section>

      <section id="attractions" className="attractions">
        <div className="container">
          <h2>Popular Attractions</h2>
          <div className="attractions-grid">
            {[
              ['white-beach', 'White Beach', 'Pristine white sand beach perfect for swimming and relaxation'],
              ['dingalan-point', 'Dingalan Point', 'Scenic viewpoint offering panoramic ocean views'],
              ['lamao-cave', 'Lamao Cave', 'Explore the mysterious underground cave system'],
            ].map(([file, title, text]) => (
              <div className="attraction-card" key={file}>
                <img src={`/images/${file}.jpg`} alt={title} className="attraction-img" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />

      <section id="activities" className="activities">
        <div className="container">
          <h2>Things to Do</h2>
          <div className="activities-grid">
            {[
              ['fa-swimmer', 'Beach Activities', 'Swimming, snorkeling, and beach volleyball'],
              ['fa-hiking', 'Hiking', 'Explore scenic trails and viewpoints'],
              ['fa-camera', 'Photography', 'Capture stunning landscapes and sunsets'],
            ].map(([icon, title, text]) => (
              <div className="activity-card" key={title}>
                <i className={`fas ${icon}`}></i>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rooms" className="rooms-section">
        <div className="container">
          <h2 className="section-title">Our Rooms</h2>
          <div className="room-list horizontal-scroll">
            {rooms.map((r) => {
              const meta = metaFor(r.name);
              return (
                <div className="room-card" key={r.id}>
                  <img src={meta.image} alt={r.name} />
                  <h3>{r.name}</h3>
                  <div className="room-features">{meta.features.map((f) => <span key={f}>{f}</span>)}</div>
                  <p>{r.description}</p>
                  <div className="room-price">PHP {r.price.toLocaleString('en-PH')} / night</div>
                  <a href="#booking" className="book-btn">Book Now</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BookingForm rooms={rooms} />

      <section id="calendar" className="calendar-section">
        <div className="container">
          <h2 className="section-title">Room Availability Calendar</h2>
          <div className="calendar-grid">
            {rooms.map((r) => <RoomCalendar key={r.id} roomId={r.id} name={r.name} />)}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item"><i className="fas fa-map-marker-alt"></i><p>Dingalan, Aurora, Philippines</p></div>
              <div className="info-item"><i className="fas fa-phone"></i><p>09288103008</p></div>
              <div className="info-item"><i className="fas fa-envelope"></i><p>dingalantravels@gmail.com</p></div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="location" className="location-section">
        <div className="container">
          <h2>Find Us</h2>
          <p className="location-desc">Dingalan is located on the eastern coast of Aurora province, Philippines. Use the map below to explore our beautiful location and plan your visit!</p>
          <div className="map-responsive">
            <iframe src="https://www.google.com/maps?q=Dingalan%2C+Aurora%2C+Philippines&output=embed" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section" style={{ minWidth: 220 }}>
              <img src="/images/logo.png" alt="Dingalan Aurora Logo" style={{ height: 48, marginBottom: 16 }} />
              <p>Discover the beauty of Dingalan, Aurora—where mountains meet the sea. Enjoy pristine beaches, breathtaking views, and the warmth of Filipino hospitality. Your adventure starts here!</p>
            </div>
            <div className="footer-section" style={{ marginLeft: 56 }}>
              <h3>Quick Links</h3>
              <ul className="footer-quicklinks">
                {[['home', 'Home'], ['about', 'About'], ['attractions', 'Attractions'], ['rooms', 'Rooms'], ['booking', 'Book Now'], ['calendar', 'Calendar'], ['contact', 'Contact']].map(([id, l]) => (
                  <li key={id}><a href={`#${id}`}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Dingalan Aurora Tourism. All rights reserved.</p></div>
        </div>
      </footer>
    </>
  );
}
