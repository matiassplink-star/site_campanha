import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "História — Brivaldo Marques em Maceió e Alagoas",
  description:
    "A trajetória de Brivaldo Marques: da liderança comunitária ao mandato de Vereador de Maceió e o caminho rumo ao Deputado Estadual por Alagoas.",
  path: "/historia",
});

export default function HistoriaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container-site max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            Nossa <span className="text-accent-500">História</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Da base comunitária em Maceió ao mandato na Câmara Municipal —
            construindo Saúde e Juventude para Alagoas.
          </p>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto mb-10" />
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Acompanhe a linha do tempo e as conquistas do mandato de Brivaldo
            Marques em Maceió e na região. Conteúdo completo em atualização
            com a equipe da campanha.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
