import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BandeirasSection from "@/components/home/BandeirasSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bandeiras",
};

export default function BandeirasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950">
        <BandeirasSection />
        <div className="container-site py-20 text-center">
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            (Esta página reutiliza o componente da home. O conteúdo detalhado será gerenciado via banco de dados depois).
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
