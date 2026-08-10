"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Shield, TrendingUp } from "lucide-react";

const commitments = [
  {
    icon: MessageCircle,
    title: "DIÁLOGO",
    description: "Escutar para entender e representar melhor cada canto de Maceió e Alagoas.",
    color: "#1C2B66",
    bg: "rgba(28,43,102,0.1)",
  },
  {
    icon: Shield,
    title: "TRABALHO",
    description: "Atuação séria, com compromisso e responsabilidade no mandato.",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
  },
  {
    icon: TrendingUp,
    title: "RESULTADOS",
    description: "Mais oportunidades, desenvolvimento e qualidade de vida para todos.",
    color: "#EFC95E",
    bg: "rgba(239,201,94,0.12)",
  },
];

const timelineEvents = [
  {
    year: "2017",
    title: "Prefeito Comunitário do Benedito Bentes",
    description:
      "Eleito prefeito comunitário do Benedito Bentes, liderou o bairro com determinação, implantando projetos de esporte, cultura, saúde e educação.",
    icon: "🌱",
  },
  {
    year: "2020",
    title: "Eleito Vereador de Maceió",
    description:
      "Ampliou sua missão ao ser eleito vereador de Maceió com 4.890 votos, levando para a Câmara as demandas da população.",
    icon: "🗳️",
  },
  {
    year: "2024",
    title: "Reeleito com 8.671 votos",
    description:
      "Reafirmou a confiança da população com crescimento significativo de votos, consolidando seu mandato em defesa da saúde e juventude.",
    icon: "⭐",
  },
  {
    year: "Hoje",
    title: "Mandato em ação",
    description:
      "Projetos de lei, fiscalização e ações concretas em prol da saúde, juventude e qualidade de vida dos maceioenses.",
    icon: "⚡",
    current: true,
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* Commitments section — estilo Henrique Costa */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "#F4F6FA" }}
      >
        <div className="container-site">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold uppercase tracking-[0.15em] mb-3"
              style={{ color: "#1C2B66" }}
            >
              NOSSOS COMPROMISSOS
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black italic font-display"
              style={{ color: "#1C2B66" }}
            >
              Diálogo, trabalho e resultados
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {commitments.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon size={28} style={{ color: item.color }} />
                  </div>
                  <h3
                    className="font-black text-sm uppercase tracking-wider mb-3"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About + Timeline */}
      <section id="sobre" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white overflow-x-hidden">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative flex flex-col items-center lg:items-start"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]">
                <div
                  className="absolute -inset-3 sm:-inset-4 rounded-3xl -z-10"
                  style={{ background: "linear-gradient(135deg, #1C2B66, #EFC95E)", opacity: 0.15 }}
                />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-50 pt-8">
                  <Image
                    src="/images/brivaldo-marques.png"
                    alt="Brivaldo Marques"
                    width={600}
                    height={800}
                    quality={100}
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
                    className="w-full h-auto block object-cover object-bottom"
                  />
                </div>

                {/* Floating stats card */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-8 bg-white rounded-xl p-4 shadow-xl border border-slate-100 hidden sm:block"
                >
                  <p className="font-black text-2xl" style={{ color: "#1C2B66" }}>8.671</p>
                  <p className="text-xs text-slate-500 font-medium">votos em 2024</p>
                </motion.div>

                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-12 bg-white rounded-xl p-4 shadow-xl border border-slate-100 hidden sm:block"
                >
                  <p className="font-black text-2xl" style={{ color: "#10B981" }}>+7 anos</p>
                  <p className="text-xs text-slate-500 font-medium">em mandato</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-center lg:text-left"
            >
              <div
                className="w-12 h-1 rounded-full mb-6 mx-auto lg:mx-0"
                style={{ backgroundColor: "#EFC95E" }}
              />
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black italic font-display mb-6 leading-tight"
                style={{ color: "#1C2B66" }}
              >
                Conheça{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #EFC95E, #D4A93A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Brivaldo Marques
                </span>
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                <p>
                  Natural de Colônia Leopoldina,{" "}
                  <strong className="text-slate-800">Brivaldo Marques Silva Neto</strong>, 32 anos,
                  casado, pai de dois filhos — João Arthur e Lucca —, formado em
                  Fisioterapia pela UNCISAL.
                </p>
                <p>
                  Em 2020, eleito Vereador de Maceió com 4.890 votos. Em 2024, foi{" "}
                  <strong className="text-slate-800">reeleito com expressivos 8.671 votos</strong>,
                  reafirmando sua missão pelas bandeiras de Saúde e Juventude.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 text-left max-w-xl mx-auto lg:mx-0 mb-10">
                {timelineEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="relative"
                  >
                    <div
                      className={`absolute -left-[33px] w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs
                      ${event.current
                        ? "border-accent-400"
                        : "bg-white border-slate-200"
                      }`}
                      style={event.current ? { backgroundColor: "#EFC95E" } : {}}
                    >
                      {event.current && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>

                    <div>
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "#EFC95E" }}
                      >
                        {event.year}
                      </span>
                      <h4 className="font-bold text-slate-900 mt-1 mb-1">
                        {event.icon} {event.title}
                      </h4>
                      <p className="text-sm text-slate-500">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 shadow-lg"
                style={{ backgroundColor: "#1C2B66" }}
              >
                Ver história completa <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
