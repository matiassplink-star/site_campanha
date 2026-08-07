import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria de Imagens",
};

export default function GaleriaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center">
        <div className="container-site">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6">
            <span className="text-accent-500">Galeria</span> de Fotos
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            (Página Fictícia) — As fotos oficiais dos eventos serão gerenciadas via painel.
          </p>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto" />
        </div>
      </main>
      <Footer />
    </>
  );
}
