import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import VideoSection from "@/components/home/VideoSection";
import BandeirasSection from "@/components/home/BandeirasSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Vereador de Maceió`,
  description: SITE_CONFIG.description,
  openGraph: {
    title: `${SITE_CONFIG.name} — Vereador de Maceió`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <VideoSection />
      <BandeirasSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
