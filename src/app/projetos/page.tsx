import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projetos — Mandato Brivaldo Marques em Maceió",
  description:
    "Projetos de lei, ações e iniciativas do mandato de Brivaldo Marques para saúde, juventude e desenvolvimento de Maceió e Alagoas.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container-site max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            Nossos <span className="text-accent-500">Projetos</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Ações e projetos do mandato em Maceió com impacto na região e no
            estado de Alagoas.
          </p>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto" />
        </div>
      </main>
      <Footer />
    </>
  );
}
