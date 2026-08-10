"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

const MOCK_POSTS: Post[] = [];

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

        <h3 className="font-bold text-slate-900 font-display text-lg leading-snug mb-3 transition-colors" style={{ color: "#1C2B66" }}>
          {post.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-5">
          {truncate(post.excerpt, 130)}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all duration-200"
          style={{ color: "#D4A93A" }}
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from("posts")
          .select(`
            id, title, slug, excerpt, cover_image, published_at, reading_time,
            category:categories ( name, color, slug )
          `)
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(3);

        if (!error && data) {
          // Normalize the relation data if it exists
          const normalizedData = data.map((post: any) => ({
            ...post,
            category: post.category ? (Array.isArray(post.category) ? post.category[0] : post.category) : undefined
          }));
          setPosts(normalizedData as Post[]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section id="blog" ref={ref} className="py-24" style={{ backgroundColor: "#F4F6FA" }}>
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#1C2B66" }}>MANDATO EM AÇÃO</p>
            <h2 className="text-3xl sm:text-4xl font-black italic font-display mb-2" style={{ color: "#1C2B66" }}>
              Últimas{" "}
              <span style={{ background: "linear-gradient(90deg, #EFC95E, #D4A93A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Notícias</span>
            </h2>
            <p className="text-slate-500 text-base">
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
          {loading ? (
            <div className="col-span-full text-center text-slate-500 py-10">Carregando notícias...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 py-10">
              Nenhuma notícia publicada no momento. Volte em breve!
            </div>
          ) : (
            posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
