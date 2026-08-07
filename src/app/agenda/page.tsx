import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Agenda Pública — Brivaldo Marques Maceió e Alagoas",
  description:
    "Agenda pública de Brivaldo Marques: eventos, visitas e compromissos em Maceió, região metropolitana e municípios de Alagoas.",
  path: "/agenda",
});

export default function AgendaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container-site max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            Agenda <span className="text-accent-500">Pública</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Compromissos em Maceió e por todo o estado de Alagoas.
          </p>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto" />
        </div>
      </main>
      <Footer />
    </>
  );
}
