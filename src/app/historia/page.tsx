import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "História — Brivaldo Marques em Maceió e Alagoas",
  description:
    "A trajetória de Brivaldo Marques: de Colônia Leopoldina à liderança comunitária no Benedito Bentes, à Câmara Municipal de Maceió com 8.671 votos em 2024.",
  path: "/historia",
});

const timeline = [
  {
    ano: "1992",
    titulo: "Nascimento em Colônia Leopoldina",
    descricao:
      "Brivaldo Marques Silva Neto nasce em Colônia Leopoldina, no interior de Alagoas. Cresceu com valores de comunidade e serviço ao próximo que marcariam toda sua trajetória.",
    emoji: "🌱",
    destaque: false,
  },
  {
    ano: "Formação",
    titulo: "Fisioterapeuta pela UNCISAL",
    descricao:
      "Casado, pai de João Arthur e Lucca, formou-se em Fisioterapia pela Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL), construindo sua base na área da saúde.",
    emoji: "🎓",
    destaque: false,
  },
  {
    ano: "2017",
    titulo: "Prefeito Comunitário do Benedito Bentes",
    descricao:
      "Eleito prefeito comunitário do Benedito Bentes, liderou o bairro com determinação, implantando projetos que promoveram o esporte, a cultura, a saúde e a educação, com olhar especial para a juventude e o desenvolvimento humano.",
    emoji: "🏘️",
    destaque: false,
  },
  {
    ano: "2020",
    titulo: "Eleito Vereador de Maceió — 4.890 votos",
    descricao:
      "Ampliou sua missão ao ser eleito Vereador de Maceió com 4.890 votos, levando para a Câmara Municipal as demandas da população e suas bandeiras de Saúde e Juventude.",
    emoji: "🗳️",
    destaque: true,
  },
  {
    ano: "2024",
    titulo: "Reeleito com 8.671 votos",
    descricao:
      "Reafirmou a confiança da população com um crescimento expressivo, sendo reeleito Vereador de Maceió com 8.671 votos — quase o dobro da eleição anterior.",
    emoji: "⭐",
    destaque: true,
  },
  {
    ano: "Hoje",
    titulo: "Mandato ativo e pré-candidato a Deputado Estadual",
    descricao:
      "Com projetos de lei na Câmara Municipal e presença em toda Alagoas, Brivaldo segue trabalhando pela saúde, juventude e qualidade de vida da população maceioense e alagoana.",
    emoji: "⚡",
    destaque: true,
    atual: true,
  },
];

export default function HistoriaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-950">
        <div className="container-site">
          {/* Cabeçalho */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Nossa <span className="text-accent-500">História</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Da base comunitária em Colônia Leopoldina e no Benedito Bentes
              ao mandato na Câmara Municipal de Maceió — construindo Saúde e
              Juventude para Alagoas.
            </p>
            <div className="w-24 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto relative">
            {/* Linha vertical */}
            <div className="absolute left-7 sm:left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-5 sm:gap-7">
                  {/* Marcador */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl shadow-md transition-all
                        ${
                          item.atual
                            ? "bg-accent-500 shadow-accent-500/30"
                            : item.destaque
                            ? "bg-primary-600 shadow-primary-600/20 dark:bg-primary-700"
                            : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        }`}
                    >
                      {item.emoji}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 pb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest mb-1 block
                        ${
                          item.atual
                            ? "text-accent-500"
                            : item.destaque
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                    >
                      {item.ano}
                    </span>
                    <h2
                      className={`text-lg sm:text-xl font-bold font-display mb-2 leading-snug
                        ${
                          item.destaque
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-700 dark:text-slate-200"
                        }`}
                    >
                      {item.titulo}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
