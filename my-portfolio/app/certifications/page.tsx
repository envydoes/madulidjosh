import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Explore Joshua Madulid’s certificates in information technology, AI, and professional skills.',
};

export default function CertificationsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-white pt-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Link href="/#certs" className="inline-flex min-h-11 items-center text-sm text-black/60 hover:text-black">← Back to portfolio</Link>
        </div>
        <Certifications full />
      </main>
      <Footer />
    </>
  );
}
