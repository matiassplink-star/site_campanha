import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Award, Heart, Shield, Sparkles, CheckCircle2, Play } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre Brivaldo Marques — Vereador de Maceió e Alagoas",
  description:
    "Conheça Brivaldo Marques, Vereador de Maceió e liderança de Alagoas. Sua trajetória, bandeiras da Saúde, Juventude e ações por todo o estado.",
  path: "/sobre",
});

const achievements = [
  { label: "Votos em 2024", value: "8.671", description: "Reeleição histórica em Maceió" },
  { label: "Anos no Mandato", value: "+7 anos", description: "Dedicação e trabalho comunitário" },
  { label: "Bandeiras Principais", value: "Saúde & Juventude", description: "Foco nas pessoas" },
];

const timelineEvents = [
  {
    year: "2017",
    title: "Prefeito Comunitário do Benedito Bentes",
    description: "Eleito pela comunidade para liderar o maior bairro de Maceió, criando projetos sociais, esportivos e culturais.",
  },
  {
    year: "2020",
    title: "Primeiro Mandato na Câmara",
    description: "Eleito Vereador de Maceió com 4.890 votos, assumindo o compromisso de dar voz aos bairros e lutar pela saúde pública.",
  },
  {
    year: "2024",
    title: "Reeleição Expressiva",
    description: "Reeleito com 8.671 votos, consolidando um mandato de fortes entregas e proximidade com a população.",
  },
  {
    year: "Hoje",
    title: "Expandindo o Trabalho por Alagoas",
    description: "Trabalhando firme para defender a saúde, a juventude e o futuro das famílias de Maceió e de todo o estado.",
  },
];

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-36 pb-20 bg-slate-50">
        <div className="container-site">
          {/* Header Banner */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-50 text-accent-600 border border-accent-200/60 mb-4">
              <Sparkles size={14} /> Trajetória e Compromisso
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-display text-slate-900 mb-6 tracking-tight">
              Conheça a história de <span className="text-accent-500">Brivaldo Marques</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Fisioterapeuta, pai de família e representante do povo maceioense. Uma caminhada pautada pelo trabalho verdadeiro, amor a Alagoas e resultados para quem mais precisa.
            </p>
          </div>

          {/* Bio Grid */}
          <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto mb-20">
            {/* Left Photo & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 pt-6">
                <Image
                  src="/images/brivaldo-marques.png"
                  alt="Brivaldo Marques — Foto Oficial"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover object-bottom"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs uppercase tracking-widest font-bold text-accent-400">Vereador de Maceió</p>
                  <h3 className="text-xl font-bold font-display">Brivaldo Marques Silva Neto</h3>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
                  <p className="text-2xl font-black text-slate-900 font-display">8.671</p>
                  <p className="text-xs text-slate-500 font-medium">Votos em 2024</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
                  <p className="text-2xl font-black text-accent-500 font-display">+7 Anos</p>
                  <p className="text-xs text-slate-500 font-medium">Liderança Comunitária</p>
                </div>
              </div>
            </div>

            {/* Right Story & Timeline */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Origens e Formação
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Natural de Colônia Leopoldina, <strong className="text-slate-900">Brivaldo Marques Silva Neto</strong> tem 32 anos, é casado e pai orgulhoso do João Arthur e do Lucca. Formado em Fisioterapia pela UNCISAL (Universidade Estadual de Ciências da Saúde de Alagoas), aprendeu na saúde a importância do cuidado, da empatia e do olhar atento às necessidades do próximo.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Sua caminhada pública começou na comunidade: em 2017 foi eleito Prefeito Comunitário do Benedito Bentes, o maior bairro da capital alagoana. Ali, esteve lado a lado com a população criando projetos de esporte, cultura e assistência social.
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <Award className="text-accent-500" size={22} />
                  Marcos da Trajetória
                </h3>

                <div className="space-y-6 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {timelineEvents.map((event, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-accent-500 border-4 border-white shadow-sm flex items-center justify-center" />
                      <span className="text-xs font-bold text-accent-600 uppercase tracking-wider">{event.year}</span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">{event.title}</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Video Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
              
              <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-accent-400 mb-3">
                  <Play size={12} /> Mensagem em Vídeo
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display">
                  Assista ao recado de Brivaldo Marques
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Confira o compromisso e a visão de trabalho para Maceió e para todo o estado de Alagoas.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black max-w-3xl mx-auto">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/Brivaldo - Anuncio (disparo) (1).mp4" type="video/mp4" />
                  Seu navegador não suporta a reprodução deste vídeo.
                </video>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

