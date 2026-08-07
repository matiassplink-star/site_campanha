import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Termos de Uso",
  description:
    "Termos de uso do site oficial de Brivaldo Marques — Vereador de Maceió e Alagoas.",
  path: "/termos-de-uso",
});

export default function TermosDeUsoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-white dark:bg-primary-950">
        <div className="container-site max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-6 text-center">
            Termos de <span className="text-accent-500">Uso</span>
          </h1>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto mb-10" />
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              Ao utilizar este site, você concorda com estes termos. O conteúdo
              refere-se ao mandato e à campanha de Brivaldo Marques em Maceió e
              Alagoas.
            </p>
            <p>
              Ao utilizar nosso formulário de contato ou redes sociais
              integradas, você concorda em enviar informações verdadeiras e
              respeitosas.
            </p>
            <p>
              Nosso site pode conter links para sites externos (como redes
              sociais e portais de notícias). Não nos responsabilizamos pelo
              conteúdo de terceiros.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
