import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de Privacidade",
  description:
    "Política de privacidade do site de Brivaldo Marques — Vereador de Maceió e Alagoas.",
  path: "/politica-de-privacidade",
});

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-white dark:bg-primary-950">
        <div className="container-site max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-6 text-center">
            Política de <span className="text-accent-500">Privacidade</span>
          </h1>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto mb-10" />
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              Este site respeita a privacidade dos visitantes e dos moradores de
              Maceió e Alagoas que entram em contato com a equipe de Brivaldo
              Marques.
            </p>
            <p>
              Dados enviados pelo formulário de contato são usados apenas para
              atendimento e comunicação do mandato, em conformidade com a
              legislação brasileira aplicável, inclusive a LGPD.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
