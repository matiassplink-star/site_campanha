"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { formatDateShort, truncate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  published_at: string | null;
  reading_time: number;
  category?: { name: string; color: string; slug: string };
}

// Posts de exemplo para a landing — serão substituídos por dados reais do Supabase
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Brivaldo Marques apresenta projeto para ampliar UBSs em Maceió",
    slug: "projeto-ubs-maceio",
    excerpt:
      "O vereador Brivaldo Marques apresentou na Câmara Municipal projeto de lei que visa ampliar e modernizar as Unidades Básicas de Saúde nos bairros mais carentes de Maceió.",
    cover_image: "/images/blog/projeto-ubs-maceio.jpg",
    published_at: new Date().toISOString(),
    reading_time: 4,
    category: { name: "Saúde", color: "#10B981", slug: "saude" },
  },
  {
    id: "2",
    title: "Programa Juventude Ativa: novas vagas de capacitação profissional",
    slug: "juventude-ativa-capacitacao",
    excerpt:
      "O mandato de Brivaldo Marques lança nova rodada do programa Juventude Ativa, com vagas gratuitas para jovens de 16 a 29 anos em cursos de tecnologia, gastronomia e gestão.",
    cover_image: "/images/blog/juventude-ativa-capacitacao.jpg",
    published_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    reading_time: 3,
    category: { name: "Juventude", color: "#8B5CF6", slug: "juventude" },
  },
  {
    id: "3",
    title: "Vereador cobra melhorias no atendimento da saúde mental em Maceió",
    slug: "saude-mental-maceio",
    excerpt:
      "Em sessão na Câmara Municipal, Brivaldo Marques cobrou do executivo municipal melhorias urgentes no atendimento de saúde mental da rede pública de Maceió.",
    cover_image: "/images/blog/saude-mental-maceio.jpg",
    published_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    reading_time: 5,
    category: { name: "Saúde", color: "#10B981", slug: "saude" },
  },
];

function PostCard({ post, index }: { post: Post; index: number }) {
  const gradients = [
    "from-primary-900 to-primary-800",
    "from-health-dark to-health-DEFAULT",
    "from-youth-dark to-youth-DEFAULT",
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden group"
    >
      {/* Cover */}
      <div
        className={`h-52 bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}
      >
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/20 text-6xl font-display font-bold">
              {post.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Category badge */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <span
              className="badge text-white px-3 py-1"
              style={{ backgroundColor: post.category.color + "CC" }}
            >
              {post.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          {post.published_at && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDateShort(post.published_at)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.reading_time} min de leitura
          </span>
        </div>

        <h3 className="font-bold text-slate-900 dark:text-white font-display text-lg leading-snug mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
          {truncate(post.excerpt, 130)}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-accent-600 dark:text-accent-400 font-semibold text-sm hover:gap-3 transition-all duration-200"
        >
          Ler mais <ArrowRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" ref={ref} className="py-24 bg-white dark:bg-primary-950">
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div className="section-line" />
            <h2 className="section-title">
              Últimas{" "}
              <span className="gradient-text">Notícias</span>
            </h2>
            <p className="section-subtitle">
              Acompanhe as ações e projetos do mandato.
            </p>
          </div>

          <Link
            href="/blog"
            className="btn-secondary self-start sm:self-auto whitespace-nowrap"
          >
            Ver todas <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_POSTS.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
