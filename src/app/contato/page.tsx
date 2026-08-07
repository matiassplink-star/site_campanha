import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/home/ContactSection";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contato — Fale com Brivaldo Marques em Maceió e Alagoas",
  description:
    "Fale com a equipe de Brivaldo Marques. Contato para moradores de Maceió, região metropolitana e todos os municípios de Alagoas.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 sm:pt-24">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
