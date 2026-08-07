"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

export default function VideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="video"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-primary-950 overflow-x-hidden"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="section-line mx-auto bg-accent" />
          <h2 className="section-title text-white">
            Veja o{" "}
            <span className="gradient-text">vídeo</span>
          </h2>
          <p className="section-subtitle mx-auto text-center text-slate-400">
            Conheça de perto o mandato e as ideias de Brivaldo Marques.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Moldura */}
          <div className="absolute -inset-1 sm:-inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent-500/40 via-primary-600/30 to-accent-600/20 blur-[1px]" />

          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 aspect-video">
            <video
              className="w-full h-full object-contain bg-black"
              controls
              playsInline
              preload="metadata"
              poster="/images/brivaldo-marques.png"
              aria-label="Vídeo de campanha de Brivaldo Marques"
            >
              <source src="/videos/brivaldo-marques.mp4" type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>

          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Play size={16} className="text-accent-500" />
            <span>Toque para assistir</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
