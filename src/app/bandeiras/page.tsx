import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Bandeiras — Saúde e Juventude em Maceió e Alagoas",
  description:
    "Bandeiras prioritárias de Brivaldo Marques: Saúde pública e Juventude para Maceió, Região Metropolitana e todos os municípios de Alagoas.",
  path: "/bandeiras",
});

export default function BandeirasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container-site max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
            Nossas <span className="text-accent-500">Bandeiras</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Saúde e Juventude — prioridades para Maceió, a região metropolitana
            e Alagoas.
          </p>
          <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-white">
              <h2 className="text-xl font-bold font-display mb-2">Saúde</h2>
              <p className="text-white/90 text-sm leading-relaxed">
                UBSs, atenção básica, saúde mental e programas preventivos para
                maceioenses e alagoanos.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-800 to-violet-500 text-white">
              <h2 className="text-xl font-bold font-display mb-2">Juventude</h2>
              <p className="text-white/90 text-sm leading-relaxed">
                Educação, esporte, cultura e emprego para os jovens de Maceió e
                de Alagoas.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
