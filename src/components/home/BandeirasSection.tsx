"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Zap, ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";

export default function BandeirasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bandeiras" ref={ref} className="py-20 sm:py-24 relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(28,43,102,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(28,43,102,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#1C2B66" }}>NOSSAS CAUSAS</p>
          <h2 className="text-3xl sm:text-4xl font-black italic font-display mb-4" style={{ color: "#1C2B66" }}>
            Nossas{" "}
            <span style={{ background: "linear-gradient(90deg, #EFC95E, #D4A93A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Bandeiras
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            As causas que guiam cada decisão e cada voto no mandato de Brivaldo Marques.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Saúde */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bandeira-card group relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #065F46 0%, #10B981 100%)", boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)" }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Shine sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              initial={{ x: "-100%", skewX: "-20deg" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", width: "60%" }}
            />

            <div className="relative z-10">
              {/* Icon with pulse */}
              <div className="relative mb-6 w-fit">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-2xl bg-white/30"
                />
                <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                  <Heart size={32} className="text-white" />
                </div>
              </div>

              <div className="badge bg-white/20 text-white mb-4">
                Bandeira Prioritária
              </div>
              <h3 className="text-3xl font-bold text-white font-display mb-3">
                Saúde
              </h3>
              <p className="text-white/80 leading-relaxed text-lg mb-6">
                Acesso universal à saúde pública, com investimento em UBSs,
                atenção básica, saúde mental e programas preventivos para a
                população de Maceió.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Fortalecimento das Unidades Básicas de Saúde",
                  "Atenção especial à saúde mental",
                  "Programas preventivos e educação em saúde",
                  "Saúde da mulher e da criança",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/bandeiras#saude"
                className="inline-flex items-center gap-2 text-white font-semibold group/link"
              >
                <span className="group-hover/link:underline">Saiba mais</span>
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Esporte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bandeira-card group relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)", boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Shine sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              initial={{ x: "-100%", skewX: "-20deg" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", width: "60%" }}
            />

            <div className="relative z-10">
              {/* Icon with pulse */}
              <div className="relative mb-6 w-fit">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute inset-0 rounded-2xl bg-white/30"
                />
                <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                  <Trophy size={32} className="text-white" />
                </div>
              </div>

              <div className="badge bg-white/20 text-white mb-4">
                Bandeira Prioritária
              </div>
              <h3 className="text-3xl font-bold text-white font-display mb-3">
                Esporte
              </h3>
              <p className="text-white/80 leading-relaxed text-lg mb-6">
                Incentivo ao esporte como ferramenta de inclusão social, saúde preventiva e oportunidades para nossas crianças e jovens.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Apoio a projetos esportivos comunitários",
                  "Revitalização de espaços de esporte e lazer",
                  "Inclusão social através de práticas esportivas",
                  "Competições e eventos para a juventude",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/bandeiras#esporte"
                className="inline-flex items-center gap-2 text-white font-semibold group/link"
              >
                <span className="group-hover/link:underline">Saiba mais</span>
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Juventude */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bandeira-card group relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #4C1D95 0%, #8B5CF6 100%)", boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Shine sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              initial={{ x: "-100%", skewX: "-20deg" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", width: "60%" }}
            />

            <div className="relative z-10">
              {/* Icon with pulse */}
              <div className="relative mb-6 w-fit">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 rounded-2xl bg-white/30"
                />
                <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                  <Zap size={32} className="text-white" />
                </div>
              </div>

              <div className="badge bg-white/20 text-white mb-4">
                Bandeira Prioritária
              </div>
              <h3 className="text-3xl font-bold text-white font-display mb-3">
                Juventude
              </h3>
              <p className="text-white/80 leading-relaxed text-lg mb-6">
                Educação, esporte, cultura e empregabilidade como ferramentas de
                transformação para os jovens de Maceió e de Alagoas.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Programas de capacitação e primeiro emprego",
                  "Esporte e lazer como instrumentos de inclusão",
                  "Cultura e arte para a juventude alagoana",
                  "Combate às drogas e violência juvenil",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/bandeiras#juventude"
                className="inline-flex items-center gap-2 text-white font-semibold group/link"
              >
                <span className="group-hover/link:underline">Saiba mais</span>
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
