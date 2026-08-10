"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Photo {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export default function GaleriaClient() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      title: "Caminhada no Benedito Bentes",
      url: "/images/brivaldo-marques.png",
      created_at: new Date().toISOString(),
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || (!file && !preview)) {
      return toast.error("Preencha o título e selecione uma imagem.");
    }

    try {
      setLoading(true);
      let imageUrl = preview;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) imageUrl = data.url;
      }

      const newPhoto: Photo = {
        id: Date.now().toString(),
        title,
        url: imageUrl,
        created_at: new Date().toISOString(),
      };

      setPhotos([newPhoto, ...photos]);
      toast.success("Foto adicionada com sucesso!");
      setIsModalOpen(false);
      setTitle("");
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar foto.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta foto?")) return;
    setPhotos(photos.filter((p) => p.id !== id));
    toast.success("Foto removida!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Galeria de Fotos</h1>
          <p className="text-sm text-slate-500">Gerencie as imagens de ações e eventos de Brivaldo Marques</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-500 text-white rounded-xl font-bold hover:bg-accent-600 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nova Foto
        </button>
      </div>

      {/* Grid de Fotos */}
      {photos.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <ImageIcon className="mx-auto text-slate-300 mb-3" size={48} />
          <p className="text-slate-500 font-medium">Nenhuma foto cadastrada ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative"
            >
              <div className="aspect-square relative bg-slate-100">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-900 text-sm truncate">{photo.title}</p>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Nova Foto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-fade-in">
            <h2 className="text-xl font-bold text-slate-900 font-display">Adicionar Foto</h2>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Título / Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Reunião no Tabuleiro"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-accent-500 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Arquivo de Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                />
              </div>

              {preview && (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                </div>
              )}

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
                  disabled={loading}
                  className="px-6 py-2 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Salvar Foto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
