"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, Trash2, Phone, Mail, User, Send } from "lucide-react";
import { formatDateShort, generateWhatsAppUrl } from "@/lib/utils";
import toast from "react-hot-toast";

interface ContactMessage {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  message: string;
  city?: string;
  created_at: string;
}

export default function MensagensClient() {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: "1",
      name: "Carlos Eduardo",
      phone: "82999998888",
      email: "carlos@gmail.com",
      message: "Gostaria de saber mais sobre as propostas para a saúde nos bairros.",
      city: "Maceió",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Mariana Santos",
      phone: "82988887777",
      email: "mariana@outlook.com",
      message: "Parabéns pelo trabalho na Câmara! Estamos juntos nessa caminhada.",
      city: "Rio Largo",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta mensagem?")) return;
    setMessages(messages.filter((m) => m.id !== id));
    toast.success("Mensagem excluída!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Mensagens & Contatos</h1>
          <p className="text-sm text-slate-500">Recados enviados pelos leitores e apoiadores pelo site</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-bold">Nome & Contato</th>
                <th className="px-6 py-4 font-bold">Mensagem</th>
                <th className="px-6 py-4 font-bold">Cidade</th>
                <th className="px-6 py-4 font-bold">Data</th>
                <th className="px-6 py-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhuma mensagem recebida ainda.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <User size={14} className="text-slate-400" />
                        {msg.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {msg.phone && <span className="mr-2">📱 {msg.phone}</span>}
                        {msg.email && <span>✉️ {msg.email}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-slate-700 truncate" title={msg.message}>
                        {msg.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {msg.city || "Maceió"}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatDateShort(msg.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {msg.phone && (
                          <a
                            href={generateWhatsAppUrl(msg.phone, `Olá ${msg.name}, obrigado pelo contato com o vereador Brivaldo Marques!`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                            title="Responder no WhatsApp"
                          >
                            <Send size={14} /> WhatsApp
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
