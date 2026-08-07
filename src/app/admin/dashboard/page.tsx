"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Eye,
  TrendingUp,
  Clock
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "Visitas no Mês",
      value: "12.4K",
      change: "+14%",
      trend: "up",
      icon: Eye,
      color: "blue",
    },
    {
      label: "Mensagens Recebidas",
      value: "145",
      change: "+5%",
      trend: "up",
      icon: MessageSquare,
      color: "green",
    },
    {
      label: "Posts Publicados",
      value: "24",
      change: "2 rascunhos",
      trend: "neutral",
      icon: FileText,
      color: "orange",
    },
    {
      label: "Novos Cadastros",
      value: "89",
      change: "+22%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-display">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Bem-vindo ao painel de controle da campanha.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const colors = {
            blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
            orange: "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400",
            purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
          };

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[stat.color as keyof typeof colors]}`}>
                  <stat.icon size={24} />
                </div>
                {stat.trend === "up" && (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                    <TrendingUp size={12} />
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {stat.label}
              </h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white font-display mt-1">
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-6">
            Atividades Recentes
          </h2>
          <div className="space-y-6">
            {[
              {
                user: "Administrador",
                action: "publicou um novo artigo no blog",
                time: "Há 2 horas",
                icon: FileText,
              },
              {
                user: "Sistema",
                action: "recebeu 3 novas mensagens de contato",
                time: "Há 4 horas",
                icon: MessageSquare,
              },
              {
                user: "Administrador",
                action: "atualizou a galeria de fotos do evento",
                time: "Ontem às 15:30",
                icon: ImageIcon,
              },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <activity.icon size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-900 dark:text-white">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock size={12} />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-6">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all text-left group">
              <div className="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText size={18} className="text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Novo Post</h3>
              <p className="text-xs text-slate-500 mt-1">Escrever no blog</p>
            </button>

            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Adicionar Fotos</h3>
              <p className="text-xs text-slate-500 mt-1">Atualizar galeria</p>
            </button>

            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-left group">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Calendar size={18} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Novo Evento</h3>
              <p className="text-xs text-slate-500 mt-1">Atualizar agenda</p>
            </button>

            <button className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-left group">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Settings size={18} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Configurações</h3>
              <p className="text-xs text-slate-500 mt-1">Ajustar site</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
