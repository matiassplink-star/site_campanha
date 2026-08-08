import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjetosSection from "@/components/home/ProjetosSection";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projetos de Lei — Mandato Brivaldo Marques em Maceió",
  description:
    "Conheça os principais projetos de lei do mandato de Brivaldo Marques: Escola Conectada ao Futuro, Esporte Seguro, Escola Antirracista, Pais Atípicos, Patrulha da Pessoa Idosa e Reabilitação Oral para mulheres vítimas de violência.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 sm:pt-24">
        <ProjetosSection />
      </main>
      <Footer />
    </>
  );
}
