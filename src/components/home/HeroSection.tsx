"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const whatsappUrl = generateWhatsAppUrl(
    SITE_CONFIG.whatsappDefault,
    SITE_CONFIG.whatsappMessage
  );

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A0F24 0%, #1C2B66 45%, #2A3F88 75%, #3C55A5 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-accent-500/15 rounded-full blur-3xl" />
      </div>

      <div className="container-site relative z-10 w-full pt-24 sm:pt-28 pb-20 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm max-w-full"
            >
              <Star size={14} className="text-accent-400 fill-accent-400 flex-shrink-0" />
              <span className="text-left">
                Vereador de Maceió · Pré-candidato a Deputado Estadual
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[1.75rem] leading-tight sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-display sm:leading-[1.1] text-balance"
            >
              Vereador que{" "}
              <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                transforma
              </span>{" "}
              Maceió em cidade de todos
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-5 sm:mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Saúde e Juventude como prioridades para um Maceió mais justo,
              saudável e com oportunidades reais para todos os alagoanos.
            </motion.p>

            {/* CTAs — full width no mobile */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center justify-center lg:justify-start"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="btn-whatsapp text-base py-3.5 px-6 sm:px-7 shadow-glow-health justify-center w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Fale pelo WhatsApp
              </a>

              <Link
                href="/sobre"
                id="hero-about-btn"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-200 w-full sm:w-auto"
              >
                Conheça a história
                <ArrowRight size={18} />
              </Link>
            </motion.div>



            {/* Bandeiras chips */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 flex items-center justify-center lg:justify-start gap-2 sm:gap-3 flex-wrap"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-health/20 border border-health/30">
                <span className="text-sm">💚</span>
                <span className="text-health text-xs font-semibold">Saúde</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-youth/20 border border-youth/30">
                <span className="text-sm">💜</span>
                <span className="text-youth text-xs font-semibold">Juventude</span>
              </div>
            </motion.div>
          </div>

          {/* Foto — no mobile fica acima do texto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-[180px] xs:w-[200px] sm:w-[240px] lg:w-[280px]">
              <div className="absolute -inset-2 rounded-2xl border border-accent-500/25 pointer-events-none hidden sm:block" />

              <div className="relative rounded-2xl overflow-hidden bg-primary shadow-2xl border border-white/10">
                <Image
                  src="/images/brivaldo-marques.png"
                  alt="Brivaldo Marques — Vereador de Maceió"
                  width={409}
                  height={611}
                  priority
                  quality={100}
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
                  className="w-full h-auto block"
                />
              </div>

              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-white font-display font-bold text-sm sm:text-base leading-tight">
                  Brivaldo Marques
                </p>
                <p className="text-accent-400 text-xs sm:text-sm font-medium">
                  Vereador de Maceió
                </p>
              </div>

              {/* Floating cards — só desktop */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-1/4 glass rounded-2xl p-3 shadow-xl hidden xl:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-health flex items-center justify-center">
                    <span className="text-white text-xs">💚</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Saúde</p>
                    <p className="text-white/60 text-[10px]">Bandeira prioritária</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-10 bottom-1/3 glass rounded-2xl p-3 shadow-xl hidden xl:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-youth flex items-center justify-center">
                    <span className="text-white text-xs">💜</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Juventude</p>
                    <p className="text-white/60 text-[10px]">Nosso futuro</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — esconde em telas baixas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs">Rolar para baixo</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
