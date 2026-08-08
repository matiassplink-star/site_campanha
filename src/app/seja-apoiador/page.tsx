import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SejaApoiadorSection from "@/components/home/SejaApoiadorSection";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Seja Apoiador — Junte-se à equipe de Brivaldo Marques",
  description:
    "Cadastre-se como apoiador de Brivaldo Marques, Vereador de Maceió. Faça parte do movimento por saúde e juventude em Alagoas. Cadastro gratuito com envio direto pelo WhatsApp.",
  path: "/seja-apoiador",
});

export default function SejaApoiadorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 sm:pt-24">
        <SejaApoiadorSection />
      </main>
      <Footer />
    </>
  );
}
