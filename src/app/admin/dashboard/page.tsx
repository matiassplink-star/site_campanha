"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  Calendar,
  Settings,
  Heart,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboardPage() {
  const [apoiadoresCount, setApoiadoresCount] = useState<number | null>(null);
  const [mensagensCount, setMensagensCount] = useState<number | null>(null);
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const supabase = createClient();
        
        // Count apoiadores
        const { count: countApoiadores } = await supabase
          .from("apoiadores")
          .select("*", { count: "exact", head: true });

        // Count mensagens
        const { count: countMensagens } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true });

        // Count posts
        const { count: countPosts } = await supabase
          .from("posts")
          .select("*", { count: "exact", head: true });

        setApoiadoresCount(countApoiadores ?? 0);
        setMensagensCount(countMensagens ?? 0);
        setPostsCount(countPosts ?? 0);
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const stats = [
    {
      label: "Apoiadores Cadastrados",
      value: loading ? "..." : (apoiadoresCount ?? 0).toString(),
      change: "Planilha de Lideranças",
      trend: "up",
      icon: Heart,
      color: "purple",
      href: "/admin/apoiadores",
    },
    {
      label: "Mensagens Recebidas",
      value: loading ? "..." : (mensagensCount ?? 0).toString(),
      change: "Contatos de Eleitores",
      trend: "up",
      icon: MessageSquare,
      color: "green",
      href: "/admin/mensagens",
    },
    {
      label: "Notícias & Blog",
      value: loading ? "..." : (postsCount ?? 0).toString(),
      change: "Publicações do Mandato",
      trend: "neutral",
      icon: FileText,
      color: "orange",
      href: "/admin/blog",
    },
    {
      label: "Acessos no Mês",
      value: "14.8K",
      change: "+18% este mês",
      trend: "up",
      icon: Eye,
      color: "blue",
      href: "#",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Dashboard da Campanha
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Painel de gestão de apoiadores, conteúdos e interações
          </p>
        </div>
        <Link
          href="/admin/apoiadores"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-accent-500/20"
        >
          <Heart size={16} />
          Ver Planilha de Apoiadores
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const colors = {
            blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
            orange: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            purple: "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400",
          };

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={stat.href}
                className="block bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[stat.color as keyof typeof colors]} group-hover:scale-105 transition-transform`}>
                    <stat.icon size={22} />
                  </div>
                  {stat.trend === "up" && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                      <TrendingUp size={12} />
                      {stat.change}
                    </span>
                  )}
                </div>
                <h3 className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  {stat.label}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display mt-1">
                  {stat.value}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display mb-5 flex items-center justify-between">
            <span>Visão Geral do Sistema</span>
            <span className="text-xs font-semibold text-accent-600 bg-accent-50 dark:bg-accent-900/20 px-2.5 py-1 rounded-full">Ativo</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Planilha de Apoiadores",
                desc: "Gestão completa de eleitores cadastrados pelo formulário 'Seja Apoiador'",
                time: "Atualizado em tempo real",
                icon: Heart,
                href: "/admin/apoiadores",
              },
              {
                title: "Central de Mensagens",
                desc: "Recebimento de mensagens diretas enviadas pelos cidadãos",
                time: "Integrado ao banco de dados",
                icon: MessageSquare,
                href: "/admin/mensagens",
              },
              {
                title: "Blog & Notícias",
                desc: "Gerenciador de publicações e notícias da atuação parlamentar",
                time: "Pronto para novas postagens",
                icon: FileText,
                href: "/admin/blog",
              },
            ].map((activity, i) => (
              <Link
                key={i}
                href={activity.href}
                className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-100 dark:group-hover:bg-accent-900/30 transition-colors">
                  <activity.icon size={18} className="text-slate-600 dark:text-slate-300 group-hover:text-accent-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {activity.title}
                    </p>
                    <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activity.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display mb-5">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 gap-3.5">
            <Link
              href="/admin/apoiadores"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-accent-500 hover:bg-accent-50/50 dark:hover:bg-accent-900/20 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Heart size={18} className="text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Apoiadores</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Ver planilha completa</p>
            </Link>

            <Link
              href="/admin/blog"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Novo Post</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Escrever no blog</p>
            </Link>

            <Link
              href="/admin/galeria"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Galeria</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Adicionar fotos</p>
            </Link>

            <Link
              href="/admin/configuracoes"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Settings size={18} className="text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Configurações</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Ajustes do site</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
