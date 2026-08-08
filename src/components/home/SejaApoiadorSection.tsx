"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Heart,
  CheckCircle,
  Loader2,
  MessageCircle,
  Megaphone,
  CalendarDays,
  HandCoins,
  UserCheck,
  HelpCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { apoiadorSchema, type ApoiadorFormData } from "@/lib/validations";
import { SITE_CONFIG } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

const HOW_HELP_OPTIONS = [
  { value: "divulgacao", label: "Divulgação nas redes sociais", icon: Megaphone },
  { value: "evento", label: "Organização de eventos", icon: CalendarDays },
  { value: "doacao", label: "Doação financeira", icon: HandCoins },
  { value: "voluntario", label: "Trabalho voluntário", icon: UserCheck },
  { value: "outro", label: "Outra forma", icon: HelpCircle },
];

export default function SejaApoiadorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ApoiadorFormData>({
    resolver: zodResolver(apoiadorSchema),
    defaultValues: {
      lgpd_consent: undefined,
      whatsapp_authorization: undefined,
    },
  });

  const onSubmit = async (data: ApoiadorFormData) => {
    try {
      const response = await fetch("/api/apoiador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao salvar cadastro");

      setRegisteredName(data.name.split(" ")[0]);
      setSubmitted(true);
      reset();
      toast.success("Cadastro realizado! Bem-vindo(a) à equipe de apoiadores!");
    } catch {
      toast.error("Erro ao realizar cadastro. Tente novamente ou fale pelo WhatsApp.");
    }
  };

  const whatsappMessage = `Olá! Me cadastrei como apoiador(a) do Brivaldo Marques. Quero ajudar na campanha!`;
  const whatsappUrl = generateWhatsAppUrl("558231990122", whatsappMessage);


  return (
    <section
      id="seja-apoiador"
      ref={ref}
      className="py-24 relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-accent-950 dark:from-slate-950 dark:via-primary-950 dark:to-slate-900"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
      />

      <div className="container-site relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-300 text-sm font-semibold mb-6">
            <Heart size={14} className="fill-accent-400 text-accent-400" />
            Faça parte do movimento
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
            Seja um{" "}
            <span className="bg-gradient-to-r from-accent-400 to-yellow-300 bg-clip-text text-transparent">
              Apoiador
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Juntos somos mais fortes. Cadastre-se e faça parte da equipe que vai
            transformar Maceió e Alagoas com saúde e oportunidades para todos.
          </p>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white dark:bg-slate-900 p-10 text-center shadow-2xl"
            >
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display mb-3">
                {registeredName ? `Obrigado, ${registeredName}!` : "Cadastro realizado!"}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                Bem-vindo(a) à família de apoiadores do Brivaldo Marques!
                Nossa equipe vai entrar em contato em breve.
              </p>

              {/* CTA WhatsApp */}
              <div className="space-y-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="apoiador-whatsapp-cta"
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/30"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Abrir WhatsApp agora
                </a>
                <button
                  id="apoiador-novo-cadastro-btn"
                  onClick={() => { setSubmitted(false); setRegisteredName(""); }}
                  className="w-full py-3 px-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Indicar outro apoiador
                </button>
              </div>
            </motion.div>
          ) : (
            <form
              id="apoiador-form"
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl space-y-6"
            >
              <div className="text-center pb-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  Cadastro de Apoiador
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Preencha seus dados e junte-se ao movimento
                </p>
              </div>

              {/* Nome e Telefone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="apoiador-name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name")}
                    id="apoiador-name"
                    placeholder="Seu nome completo"
                    className="input-field"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="apoiador-phone"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    WhatsApp / Telefone <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("phone")}
                    id="apoiador-phone"
                    placeholder="(82) 99999-9999"
                    className="input-field"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* E-mail */}
              <div>
                <label
                  htmlFor="apoiador-email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  E-mail <span className="text-slate-400 text-xs font-normal">(opcional)</span>
                </label>
                <input
                  {...register("email")}
                  id="apoiador-email"
                  type="email"
                  placeholder="seu@email.com"
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Cidade e Bairro */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="apoiador-city"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Cidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("city")}
                    id="apoiador-city"
                    placeholder="Sua cidade"
                    className="input-field"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="apoiador-neighborhood"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Bairro <span className="text-slate-400 text-xs font-normal">(opcional)</span>
                  </label>
                  <input
                    {...register("neighborhood")}
                    id="apoiador-neighborhood"
                    placeholder="Seu bairro"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Como quer ajudar */}
              <div>
                <label
                  htmlFor="apoiador-how-help"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3"
                >
                  Como quer ajudar? <span className="text-slate-400 text-xs font-normal">(opcional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HOW_HELP_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const currentValue = watch("how_help");
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm
                          ${currentValue === opt.value
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                            : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                      >
                        <input
                          type="radio"
                          value={opt.value}
                          {...register("how_help")}
                          className="sr-only"
                        />
                        <Icon size={14} />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Divisor */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Autorizações obrigatórias
                </p>

                {/* LGPD */}
                <div>
                  <label
                    htmlFor="apoiador-lgpd"
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      errors.lgpd_consent
                        ? "border-red-400 bg-red-50 dark:bg-red-900/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="apoiador-lgpd"
                      {...register("lgpd_consent")}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Li e aceito a{" "}
                      <a
                        href="/politica-de-privacidade"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Política de Privacidade
                      </a>{" "}
                      e autorizo o tratamento dos meus dados pessoais conforme a
                      Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.lgpd_consent && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.lgpd_consent.message}</p>
                  )}
                </div>

                {/* WhatsApp Authorization */}
                <div>
                  <label
                    htmlFor="apoiador-whatsapp-auth"
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      errors.whatsapp_authorization
                        ? "border-red-400 bg-red-50 dark:bg-red-900/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="apoiador-whatsapp-auth"
                      {...register("whatsapp_authorization")}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Autorizo o contato da equipe do Brivaldo Marques pelo{" "}
                      <strong className="text-green-600 dark:text-green-400">WhatsApp</strong>{" "}
                      para receber informações sobre o mandato, eventos e a campanha.{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.whatsapp_authorization && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.whatsapp_authorization.message}</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="apoiador-submit-btn"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-4 text-base rounded-2xl gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    Quero ser Apoiador!
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 text-center">
                Seus dados são protegidos e utilizados exclusivamente para comunicação do mandato.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
