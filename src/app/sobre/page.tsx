import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre Brivaldo Marques — Vereador de Maceió e Alagoas",
  description:
    "Conheça Brivaldo Marques, Vereador de Maceió e pré-candidato a Deputado Estadual. Trajetória, bandeiras de Saúde e Juventude em Maceió, região metropolitana e Alagoas.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Sobre <span className="text-accent-500">Brivaldo Marques</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Vereador de Maceió e pré-candidato a Deputado Estadual por Alagoas.
              Saúde e Juventude para a capital, a região metropolitana e todo o
              estado.
            </p>
            <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start max-w-4xl mx-auto">
            <div className="mx-auto w-[200px] sm:w-[220px] rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 bg-white">
              <Image
                src="/images/brivaldo-marques-white.png"
                alt="Brivaldo Marques — Vereador de Maceió"
                width={409}
                height={611}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-center lg:text-left">
              <p>
                Natural de Colônia Leopoldina, <strong className="text-slate-800 dark:text-slate-200">Brivaldo Marques Silva Neto</strong>, 32 anos,
                casado, pai de dois filhos — João Arthur e Lucca —, formado em Fisioterapia
                pela UNCISAL (Universidade Estadual de Ciências da Saúde de Alagoas).
              </p>
              <p>
                Em 2017, foi eleito prefeito comunitário do Benedito Bentes, onde liderou
                com determinação até o início das eleições de 2020. Durante esse período,
                implantou projetos que promoveram o esporte, a cultura, a saúde e a educação,
                com um olhar especial para a juventude e o desenvolvimento humano.
              </p>
              <p>
                Nas eleições de 2020, Brivaldo ampliou sua missão ao ser eleito Vereador de
                Maceió com <strong className="text-slate-800 dark:text-slate-200">4.890 votos</strong>.
                Em 2024, foi reeleito com expressivos{" "}
                <strong className="text-slate-800 dark:text-slate-200">8.671 votos</strong>,
                reafirmando a confiança da população e seu compromisso com a Saúde e a Juventude.
              </p>
              <p>
                Se você é de Rio Largo, Marechal Deodoro, Arapiraca, União dos Palmares,
                Penedo, Maragogi ou de qualquer cidade alagoana, este espaço é para
                acompanhar o trabalho e falar com a equipe.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
