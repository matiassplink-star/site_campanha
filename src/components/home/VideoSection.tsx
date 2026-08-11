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
      className="py-16 sm:py-20 lg:py-24 overflow-x-hidden relative"
      style={{ backgroundColor: "#0A0F24" }}
    >
      {/* Animated background glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #EFC95E, transparent)" }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1C2B66, transparent)" }}
      />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="w-12 h-1 rounded-full mb-4 mx-auto" style={{ backgroundColor: "#EFC95E" }} />
          <h2 className="text-3xl sm:text-4xl font-black italic font-display text-white mb-3">
            Veja o{" "}
            <span style={{ color: "#EFC95E" }}>vídeo</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Conheça de perto o mandato e as ideias de Brivaldo Marques.
          </p>
        </motion.div>

        <div className="max-w-sm mx-auto px-2 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Outer glow — animated */}
            <motion.div
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.01, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 sm:-inset-3 rounded-2xl sm:rounded-3xl blur-[6px] pointer-events-none"
              style={{ background: "linear-gradient(135deg, #EFC95E60, #1C2B6660, #10B98160)" }}
            />

            {/* Inner frame */}
            <div className="absolute -inset-1 sm:-inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent-500/40 via-primary-600/30 to-accent-600/20 blur-[1px]" />

            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 aspect-[9/16] group">
              <video
                className="w-full h-full object-cover bg-black"
                controls
                playsInline
                preload="metadata"
                aria-label="Vídeo de campanha de Brivaldo Marques"
              >
                <source src="/videos/Vídeo 03 prova social (site).mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeo.
              </video>

              {/* Nome overlay */}
              <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-white font-bold font-display text-lg">Brivaldo Marques</h3>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Play size={16} className="text-accent-500" />
              </motion.div>
              <span>Toque para assistir</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
