import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogSection from "@/components/home/BlogSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Notícias",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-white dark:bg-primary-950">
        <BlogSection />
        <div className="container-site py-20 text-center">
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            (Esta página reutiliza o componente da home. Uma listagem completa com paginação e categorias será implementada depois via Supabase).
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
