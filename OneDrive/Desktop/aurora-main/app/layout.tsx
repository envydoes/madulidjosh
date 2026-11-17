import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dingalan Aurora - Discover Paradise in the Philippines',
  description: 'A hidden gem on the Pacific coast. Book your stay in Dingalan, Aurora.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
