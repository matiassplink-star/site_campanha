"use client";

import { motion, useInView } from "framer-motion";
import { ChevronDown, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { apoiadorSchema, type ApoiadorFormData } from "@/lib/validations";
import { generateWhatsAppUrl } from "@/lib/utils";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

function HeroForm() {
  const [submitted, setSubmitted] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApoiadorFormData>({
    resolver: zodResolver(apoiadorSchema),
    defaultValues: {
      lgpd_consent: undefined,
      whatsapp_authorization: undefined,
    },
  });

  const whatsappUrl = generateWhatsAppUrl(
    "558231990122",
    `Olá! Me cadastrei como apoiador(a) do Brivaldo Marques. Quero ajudar na campanha!`
  );

  const onSubmit = async (data: ApoiadorFormData) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch("/api/apoiador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Erro ao salvar cadastro");
      setRegisteredName(data.name.split(" ")[0]);
      setSubmitted(true);
      reset();
      toast.success("Cadastro realizado! Bem-vindo(a) ao time!");
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        toast.error("Tempo esgotado. Tente novamente ou entre pelo WhatsApp.");
      } else {
        toast.error("Erro ao realizar cadastro. Tente pelo WhatsApp.");
      }
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={36} className="text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
          {registeredName ? `Obrigado, ${registeredName}!` : "Cadastro realizado!"}
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Bem-vindo(a) ao time do Brivaldo! Em breve entraremos em contato.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-white transition-all"
          style={{ backgroundColor: "#22C55E" }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Abrir WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form id="hero-apoiador-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-slate-900 font-display uppercase tracking-tight">Seja Apoiador!</h2>
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="hero-name" className="block text-xs font-semibold text-slate-700 mb-1">
          Nome completo <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          id="hero-name"
          placeholder="Seu nome completo"
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          style={{ color: "#1C2B66" }}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="hero-phone" className="block text-xs font-semibold text-slate-700 mb-1">
          WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          {...register("phone")}
          id="hero-phone"
          placeholder="(82) 99999-9999"
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          style={{ color: "#1C2B66" }}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Cidade */}
      <div>
        <label htmlFor="hero-city" className="block text-xs font-semibold text-slate-700 mb-1">
          Cidade <span className="text-red-500">*</span>
        </label>
        <input
          {...register("city")}
          id="hero-city"
          placeholder="Sua cidade"
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          style={{ color: "#1C2B66" }}
        />
        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
        )}
      </div>

      {/* E-mail opcional */}
      <div>
        <label htmlFor="hero-email" className="block text-xs font-semibold text-slate-700 mb-1">
          E-mail <span className="text-slate-400 font-normal">(opcional)</span>
        </label>
        <input
          {...register("email")}
          id="hero-email"
          type="email"
          placeholder="voce@email.com"
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          style={{ color: "#1C2B66" }}
        />
      </div>

      {/* LGPD */}
      <label htmlFor="hero-lgpd" className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          id="hero-lgpd"
          {...register("lgpd_consent")}
          className="mt-0.5 w-4 h-4 rounded border-slate-300 flex-shrink-0 cursor-pointer"
          style={{ accentColor: "#1C2B66" }}
        />
        <span className="text-xs text-slate-500 leading-relaxed">
          Confirmo que os dados são meus e autorizo o tratamento conforme a{" "}
          <a
            href="/politica-de-privacidade"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
            style={{ color: "#1C2B66" }}
            onClick={(e) => e.stopPropagation()}
          >
            Política de Privacidade
          </a>{" "}
          e a LGPD. <span className="text-red-500">*</span>
        </span>
      </label>
      {errors.lgpd_consent && (
        <p className="text-red-500 text-xs -mt-2">{errors.lgpd_consent.message}</p>
      )}

      {/* WhatsApp authorization */}
      <label htmlFor="hero-whatsapp-auth" className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          id="hero-whatsapp-auth"
          {...register("whatsapp_authorization")}
          className="mt-0.5 w-4 h-4 rounded border-slate-300 flex-shrink-0 cursor-pointer"
          style={{ accentColor: "#22C55E" }}
        />
        <span className="text-xs text-slate-500 leading-relaxed">
          Autorizo contato via <strong className="text-green-600">WhatsApp</strong>. <span className="text-red-500">*</span>
        </span>
      </label>
      {errors.whatsapp_authorization && (
        <p className="text-red-500 text-xs -mt-2">{errors.whatsapp_authorization.message}</p>
      )}

      <button
        type="submit"
        id="hero-apoiador-submit-btn"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-lg relative overflow-hidden"
        style={{ backgroundColor: "#2563eb", color: "white" }}
      >
        {/* Shine sweep on button */}
        <span className="absolute inset-0 pointer-events-none hero-btn-shine" />
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Cadastrando...
          </>
        ) : (
          "Quero entrar pro time"
        )}
      </button>
    </form>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#1C2B66" }}
    >
      {/* Animated particles */}
      <ParticlesBackground count={45} />

      {/* Diagonal geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ backgroundColor: "#0f3a8b" }}>
        {/* Green shape */}
        <motion.div
          animate={{ skewX: [-15, -14, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -bottom-10 left-[15%] lg:left-[25%] w-[35%] shadow-2xl"
          style={{ backgroundColor: "#12963f", transformOrigin: "bottom" }}
        />
        {/* Yellow shape */}
        <motion.div
          animate={{ skewX: [-15, -16, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -bottom-10 left-[45%] lg:left-[55%] w-[12%] shadow-xl"
          style={{ backgroundColor: "#f5ca12", transformOrigin: "bottom" }}
        />
        {/* Light Blue shape */}
        <div
          className="absolute -top-10 -bottom-10 left-[55%] lg:left-[65%] right-[-50%] shadow-2xl"
          style={{ backgroundColor: "#1565d8", transform: "skewX(-15deg)", transformOrigin: "bottom" }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container-site relative z-10 w-full pt-20 sm:pt-24 pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[calc(100svh-5rem)]">

          {/* Left: Text content */}
          <div className="w-full lg:w-[45%] text-center lg:text-left z-20 pb-2 lg:pb-0">
            {/* Badge with shimmer */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 sm:mb-6 relative overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
            >
              <span className="relative z-10">Agora é oficial • Alagoas 2026</span>
              {/* shimmer sweep */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.div>

            {/* Headline */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <h1 className="font-display font-black italic leading-[0.95] text-[2.5rem] xs:text-[3rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] uppercase mb-1" style={{ color: "#f5ca12" }}>
                AGORA É
              </h1>
              <h1 className="font-display font-black italic leading-[0.95] text-[2.5rem] xs:text-[3rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] text-white uppercase mb-4">
                OFICIAL
              </h1>
              <p className="text-white font-display font-bold text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide mb-2 leading-tight">
                CANDIDATO A <br className="hidden lg:block" />
                <span style={{ color: "#f5ca12" }}>DEPUTADO ESTADUAL</span>
              </p>
            </motion.div>

            {/* Quote */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 sm:mt-6 text-base sm:text-xl text-white font-bold italic leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              &ldquo;Ensinar sempre foi minha missão.<br/>
              Transformar será meu legado.&rdquo;
            </motion.p>

            {/* Candidato photo on mobile — LARGER & BETTER PROPORTIONED */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 flex justify-center lg:hidden"
            >
              <div className="relative w-[200px] xs:w-[230px] sm:w-[280px]">
                {/* Glow behind photo on mobile */}
                <div
                  className="absolute -inset-4 rounded-full blur-2xl opacity-30"
                  style={{ background: "radial-gradient(circle, #f5ca12, #1C2B66)" }}
                />
                <Image
                  src="/images/brivaldo-marques.png"
                  alt="Brivaldo Marques"
                  width={409}
                  height={611}
                  priority
                  quality={100}
                  className="w-full h-auto block drop-shadow-2xl relative z-10"
                />
              </div>
            </motion.div>
          </div>

          {/* Center: Photo (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] xl:w-[500px] z-10 pointer-events-none"
          >
            {/* Desktop glow */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl opacity-40"
              style={{ background: "radial-gradient(ellipse, #f5ca12, transparent)" }}
            />
            <Image
              src="/images/brivaldo-marques.png"
              alt="Brivaldo Marques"
              width={600}
              height={800}
              priority
              quality={100}
              className="w-full h-auto block drop-shadow-2xl relative z-10"
            />
          </motion.div>

          {/* Right: Form card */}
          <div className="w-full lg:w-[400px] xl:w-[420px] z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full bg-white rounded-2xl shadow-2xl p-5 sm:p-7 relative overflow-hidden"
            >
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #1C2B66, #f5ca12, #12963f)" }} />
              <HeroForm />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
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

      {/* Button shine CSS */}
      <style jsx global>{`
        @keyframes heroBtnShine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        .hero-btn-shine {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: heroBtnShine 3s infinite;
        }
      `}</style>
    </section>
  );
}
