import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white px-5 py-7 text-black/60 sm:px-6 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <p>Joshua Madulid · Web Developer</p>
        <div className="flex items-center gap-5">
          <a href="https://www.facebook.com/Joshngmundo.lV/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-black"><FaFacebookF aria-hidden="true" />Facebook</a>
          <a href="https://www.instagram.com/envydoes_/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-black"><FaInstagram aria-hidden="true" />Instagram</a>
        </div>
      </div>
    </footer>
  );
}
