import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import { ThemePreferencesProvider } from "@/lib/ThemePreferences";
import LoadingScreen from "@/components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://madulidjoshv2.vercel.app"),
  title: {
    default: "Joshua Madulid — Web Developer",
    template: "%s | Joshua Madulid",
  },
  description: "Joshua Madulid’s IT portfolio: web development and UI/UX design projects, technical skills, certifications, and education at NEUST in Web Systems Technology.",
  icons: {
    icon: "/images/cv_img.png",
    shortcut: "/images/cv_img.png",
    apple: "/images/cv_img.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-motion="full"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <LoadingScreen />
        <ThemePreferencesProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemePreferencesProvider>
      </body>
    </html>
  );
}
