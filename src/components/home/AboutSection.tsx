"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const timelineEvents = [
  {
    year: "[ANO]",
    title: "Início na vida pública",
    description:
      "[INSERIR: Informação sobre o início da trajetória política de Brivaldo Marques.]",
    icon: "🌱",
  },
  {
    year: "[ANO]",
    title: "Eleito Vereador de Maceió",
    description: "[INSERIR: Detalhes sobre a eleição para vereador de Maceió.]",
    icon: "🗳️",
  },
  {
    year: "Hoje",
    title: "Mandato em ação",
    description:
      "Projetos de lei, fiscalização e ações em prol da saúde e juventude maceioense.",
    icon: "⚡",
    current: true,
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-primary-950 overflow-x-hidden">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex flex-col items-center lg:items-start"
          >
            <div className="relative w-[180px] sm:w-[220px] lg:w-[260px]">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-slate-100 dark:border-slate-800">
                <Image
                  src="/images/brivaldo-marques-white.png"
                  alt="Brivaldo Marques — Vereador de Maceió"
                  width={409}
                  height={611}
                  quality={100}
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
                  className="w-full h-auto block"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-accent-500/30 -z-10 hidden sm:block" />
            </div>

            {/* Info card — no fluxo no mobile, flutuante no desktop */}
            <div className="mt-5 sm:mt-0 sm:absolute sm:right-0 sm:top-8 lg:-right-2 xl:-right-4 card p-4 sm:p-5 shadow-xl w-full max-w-[240px] sm:max-w-[200px]">
              <div className="flex items-center gap-3 mb-2 sm:mb-3 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                  <MapPin size={16} className="text-accent-600 dark:text-accent-400" />
                </div>
                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                  Maceió, AL
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Vereador e pré-candidato a Deputado Estadual
              </p>
            </div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            <div className="section-line mx-auto lg:mx-0" />
            <h2 className="section-title mb-4">
              Conheça{" "}
              <span className="gradient-text">Brivaldo Marques</span>
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              <p>
                <span className="text-slate-400 text-sm italic">
                  [INSERIR: Biografia oficial fornecida pela campanha de Brivaldo
                  Marques. Este texto pode ser editado diretamente pelo painel
                  administrativo, sem necessidade de alterar o código.]
                </span>
              </p>
              <p>
                Brivaldo Marques é Vereador de Maceió e pré-candidato a Deputado
                Estadual por Alagoas. Suas principais bandeiras são Saúde e
                Juventude.
              </p>
            </div>

            <a
              href="https://instagram.com/brivaldo.marques"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent-600 transition-colors mb-10"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @brivaldo.marques
            </a>

            {/* Timeline */}
            <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-8 text-left max-w-xl mx-auto lg:mx-0">
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
                    ${
                      event.current
                        ? "bg-accent-500 border-accent-400"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {event.current && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
                      {event.year}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white mt-1 mb-1">
                      {event.icon} {event.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex justify-center lg:justify-start">
              <Link href="/sobre" className="btn-primary w-full sm:w-auto justify-center">
                Ver história completa <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
