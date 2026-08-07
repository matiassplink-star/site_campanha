import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center">
        <div className="container-site">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6">
            Sobre <span className="text-accent-500">Brivaldo Marques</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            (Página Fictícia) — O conteúdo oficial será cadastrado via painel administrativo.
          </p>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto" />
        </div>
      </main>
      <Footer />
    </>
  );
}
