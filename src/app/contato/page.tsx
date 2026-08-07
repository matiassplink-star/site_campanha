import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/home/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-slate-50 dark:bg-slate-950">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
