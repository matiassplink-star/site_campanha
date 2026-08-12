"use client";

import { useState } from "react";
import { Save, Settings, Globe, Phone, Share2, Video, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ConfiguracoesClient() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "Brivaldo Marques",
    slogan: "Cuidar de perto. Transforma de verdade. Cuidar faz parte de quem sou. Transformar é o que me move.",
    whatsapp: "82999999999",
    instagram: "https://instagram.com/brivaldomarques",
    facebook: "https://facebook.com/brivaldomarques",
    youtube: "https://youtube.com/@brivaldomarques",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Configurações do site salvas com sucesso!");
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">Configurações Gerais</h1>
        <p className="text-sm text-slate-500">Ajuste os dados principais do candidato e links sociais do site</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 font-display border-b border-slate-100 pb-3 flex items-center gap-2">
            <Globe className="text-accent-500" size={20} />
            Informações Principais
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Nome Exibido</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Número do WhatsApp (Envio Direto)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Slogan / Frase de Destaque</label>
              <textarea
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none resize-none"
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
              />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900 font-display border-b border-slate-100 pb-3 pt-4 flex items-center gap-2">
            <Share2 className="text-accent-500" size={20} />
            Redes Sociais
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Instagram</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-accent-500 outline-none text-sm"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Facebook</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-accent-500 outline-none text-sm"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">YouTube</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-accent-500 outline-none text-sm"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 text-white rounded-xl font-bold hover:bg-accent-600 transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </form>
    </div>
  );
}
