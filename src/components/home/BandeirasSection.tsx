"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BANDEIRAS } from "@/lib/constants";

export default function BandeirasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bandeiras" ref={ref} className="py-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#1C2B66" }}>NOSSAS CAUSAS</p>
          <h2 className="text-3xl sm:text-4xl font-black italic font-display mb-4" style={{ color: "#1C2B66" }}>
            Nossas{" "}
            <span style={{ background: "linear-gradient(90deg, #EFC95E, #D4A93A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Bandeiras</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            As causas que guiam cada decisão e cada voto no mandato de Brivaldo Marques.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Saúde */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bandeira-card group"
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

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart size={32} className="text-white" />
              </div>

              {/* Content */}
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

              {/* Points */}
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
                className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-200"
              >
                Saiba mais <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Juventude */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bandeira-card group"
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

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap size={32} className="text-white" />
              </div>

              {/* Content */}
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

              {/* Points */}
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
                className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-200"
              >
                Saiba mais <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
