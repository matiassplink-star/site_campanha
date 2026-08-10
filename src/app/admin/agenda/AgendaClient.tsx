"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "confirmado" | "pendente" | "concluido";
}

export default function AgendaClient() {
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: "1",
      title: "Caminhada de Saúde e Juventude",
      date: "2026-08-15",
      time: "09:00",
      location: "Benedito Bentes — Praça Padre Cícero",
      status: "confirmado",
    },
    {
      id: "2",
      title: "Reunião com Lideranças Comunitárias",
      date: "2026-08-18",
      time: "19:00",
      location: "Tabuleiro do Martins",
      status: "confirmado",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    status: "confirmado" as "confirmado" | "pendente" | "concluido",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      return toast.error("Título e data são obrigatórios.");
    }

    const newEvent: EventItem = {
      id: Date.now().toString(),
      ...formData,
    };

    setEvents([newEvent, ...events]);
    toast.success("Compromisso adicionado à agenda!");
    setIsModalOpen(false);
    setFormData({ title: "", date: "", time: "", location: "", status: "confirmado" });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja cancelar/excluir este compromisso?")) return;
    setEvents(events.filter((ev) => ev.id !== id));
    toast.success("Compromisso removido!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Agenda & Compromissos</h1>
          <p className="text-sm text-slate-500">Organize as caminhadas, reuniões e eventos oficiais</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-500 text-white rounded-xl font-bold hover:bg-accent-600 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Novo Evento
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-bold">Compromisso</th>
                <th className="px-6 py-4 font-bold">Data & Hora</th>
                <th className="px-6 py-4 font-bold">Local</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum compromisso agendado.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{event.title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <CalendarIcon size={14} className="text-accent-500" />
                        {event.date} às {event.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin size={14} className="text-slate-400" />
                        {event.location || "Maceió"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900 font-display">Novo Compromisso</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Título do Evento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Encontro de Saúde no Jacintinho"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Data</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Horário</label>
                  <input
                    type="time"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Localização</label>
                <input
                  type="text"
                  placeholder="Ex: Associação de Bairro"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors"
                >
                  Salvar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
