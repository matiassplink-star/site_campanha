import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Notícias e Blog — Brivaldo Marques Maceió e Alagoas",
  description:
    "Notícias, projetos e ações do mandato de Brivaldo Marques em Maceió e Alagoas. Acompanhe saúde, juventude e política alagoana.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-white dark:bg-primary-950">
        <div className="container-site max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            Últimas <span className="text-accent-500">Notícias</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Acompanhe as ações do mandato em Maceió, na região metropolitana e
            em Alagoas.
          </p>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto" />
        </div>
      </main>
      <Footer />
    </>
  );
}
