"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, ExternalLink } from "lucide-react";

const projetos = [
  {
    emoji: "💻",
    titulo: "Escola Conectada ao Futuro",
    pl: "PL nº 202/2026",
    descricao:
      "Tecnologia, inovação e cultura digital para preparar os estudantes para os desafios do futuro.",
    cor: "from-blue-500 to-cyan-500",
    corBg: "bg-blue-50 dark:bg-blue-950/30",
    corBorda: "border-blue-100 dark:border-blue-800/40",
    corTexto: "text-blue-600 dark:text-blue-400",
  },
  {
    emoji: "🛡️",
    titulo: "Esporte Seguro",
    pl: "PL nº 203/2026",
    descricao:
      "Mais segurança e proteção para crianças e adolescentes em ambientes esportivos.",
    cor: "from-green-500 to-emerald-500",
    corBg: "bg-green-50 dark:bg-green-950/30",
    corBorda: "border-green-100 dark:border-green-800/40",
    corTexto: "text-green-600 dark:text-green-400",
  },
  {
    emoji: "🤝",
    titulo: "Escola Antirracista",
    pl: "PL nº 205/2026",
    descricao:
      "Incentivo a práticas de combate ao racismo e promoção do respeito e da igualdade nas escolas.",
    cor: "from-purple-500 to-violet-500",
    corBg: "bg-purple-50 dark:bg-purple-950/30",
    corBorda: "border-purple-100 dark:border-purple-800/40",
    corTexto: "text-purple-600 dark:text-purple-400",
  },
  {
    emoji: "💙",
    titulo: "Pais e Responsáveis Atípicos",
    pl: "PL nº 204/2026",
    descricao:
      "Reconhecimento e apoio às famílias e aos responsáveis por pessoas com necessidades específicas.",
    cor: "from-sky-500 to-blue-500",
    corBg: "bg-sky-50 dark:bg-sky-950/30",
    corBorda: "border-sky-100 dark:border-sky-800/40",
    corTexto: "text-sky-600 dark:text-sky-400",
  },
  {
    emoji: "👵",
    titulo: "Patrulha Municipal da Pessoa Idosa",
    pl: "PL nº 184/2026",
    descricao:
      "Proteção, respeito e segurança para a população idosa.",
    cor: "from-amber-500 to-orange-500",
    corBg: "bg-amber-50 dark:bg-amber-950/30",
    corBorda: "border-amber-100 dark:border-amber-800/40",
    corTexto: "text-amber-600 dark:text-amber-400",
  },
  {
    emoji: "❤️",
    titulo: "Reabilitação Oral para Mulheres Vítimas de Violência",
    pl: "PL nº 269/2025",
    descricao:
      "Proposta de atendimento odontológico pelo SUS para mulheres vítimas de violência doméstica que sofreram danos à saúde bucal.",
    cor: "from-rose-500 to-pink-500",
    corBg: "bg-rose-50 dark:bg-rose-950/30",
    corBorda: "border-rose-100 dark:border-rose-800/40",
    corTexto: "text-rose-600 dark:text-rose-400",
  },
];

export default function ProjetosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <div className="section-line mx-auto" />
          <h1 className="section-title">
            Principais{" "}
            <span className="gradient-text">Projetos de Lei</span>
          </h1>
          <p className="section-subtitle mx-auto text-center">
            Conheça as propostas apresentadas pelo mandato de Brivaldo Marques
            na Câmara Municipal de Maceió.
          </p>
        </motion.div>

        {/* Grid de projetos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projetos.map((projeto, i) => (
            <motion.div
              key={projeto.pl}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300
                hover:shadow-lg hover:-translate-y-1 cursor-default
                ${projeto.corBg} ${projeto.corBorda}`}
            >
              {/* Emoji + PL badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-3xl leading-none" aria-hidden="true">
                  {projeto.emoji}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                    bg-white dark:bg-slate-900 border ${projeto.corBorda} ${projeto.corTexto} whitespace-nowrap`}
                >
                  <FileText size={11} />
                  {projeto.pl}
                </span>
              </div>

              {/* Gradiente decorativo */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-2xl opacity-5 blur-2xl bg-gradient-to-br ${projeto.cor} pointer-events-none`}
                aria-hidden="true"
              />

              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2 leading-snug">
                {projeto.titulo}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                {projeto.descricao}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Nota de rodapé */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-sm text-slate-400 dark:text-slate-500 mt-12"
        >
          Acompanhe a tramitação na Câmara Municipal de Maceió.
        </motion.p>
      </div>
    </section>
  );
}
