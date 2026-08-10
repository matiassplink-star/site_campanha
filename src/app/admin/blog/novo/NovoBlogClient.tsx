"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { generateSlug, calculateReadingTime } from "@/lib/utils";

export default function NovoBlogClient() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category_id: "",
    status: "published",
    cover_image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("id, name").order("name");
    if (data) setCategories(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Falha no upload");
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return toast.error("Título e conteúdo são obrigatórios.");
    }

    try {
      setLoading(true);
      let coverUrl = formData.cover_image;

      if (imageFile) {
        toast.loading("Enviando imagem...", { id: "upload" });
        coverUrl = await uploadImage(imageFile);
        toast.success("Imagem enviada!", { id: "upload" });
      }

      const slug = generateSlug(formData.title);
      const reading_time = calculateReadingTime(formData.content);
      const published_at = formData.status === "published" ? new Date().toISOString() : null;

      const { error } = await supabase.from("posts").insert({
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category_id: formData.category_id || null,
        status: formData.status,
        cover_image: coverUrl,
        reading_time,
        published_at,
      });

      if (error) {
        // Ignora erro de slug duplicado e avisa
        if (error.code === '23505') {
          throw new Error("Já existe uma notícia com um título similar (slug duplicado). Mude o título.");
        }
        throw error;
      }

      toast.success("Notícia publicada com sucesso!");
      router.push("/admin/blog");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao salvar notícia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">Nova Notícia</h1>
            <p className="text-sm text-slate-500">Crie uma nova publicação para o site</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Título da Notícia</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all font-medium text-lg"
                placeholder="Ex: Novo projeto aprovado na Câmara"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Categoria</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all bg-white"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Status</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all bg-white"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Resumo (opcional)</label>
              <textarea
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all resize-none"
                placeholder="Breve descrição que aparecerá nos cards da home..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Foto de Capa</label>
              <div className="flex items-center gap-6">
                <div
                  className="w-40 h-28 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative"
                >
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  ) : (
                    <Upload className="text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-flex cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2 px-4 rounded-xl transition-colors">
                    Escolher Imagem
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-xs text-slate-500 mt-2">
                    Formatos suportados: JPG, PNG, WEBP. Tamanho recomendado: 800x600px.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-900">Conteúdo Completo</label>
              <textarea
                rows={12}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all resize-y"
                placeholder="Escreva o texto completo da notícia aqui..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/blog"
            className="px-6 py-3 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-500 text-white rounded-xl font-bold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Salvando..." : (
              <>
                <Save size={18} />
                Publicar Notícia
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
