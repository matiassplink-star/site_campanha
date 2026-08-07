import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
};

export default function TermosDeUsoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-white dark:bg-primary-950">
        <div className="container-site max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-8">
            Termos de <span className="text-accent-500">Uso</span>
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead text-lg text-slate-600 dark:text-slate-400 mb-6">
              Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos 
              seguintes termos e condições de uso.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Uso do Conteúdo</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Todo o conteúdo deste site (textos, imagens, vídeos, logotipos) é de propriedade da
              campanha de Brivaldo Marques, salvo indicação em contrário. É permitida a reprodução
              do material para fins de divulgação política, desde que mantida a integridade do
              conteúdo e citada a fonte original. É proibida a alteração maliciosa do material.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Regras de Conduta</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Ao utilizar nosso formulário de contato ou redes sociais integradas, você concorda em
              não enviar mensagens com conteúdo:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Ofensivo, difamatório, calunioso ou discriminatório;</li>
              <li>Que viole direitos autorais de terceiros;</li>
              <li>Spam, correntes, ou propagandas não solicitadas;</li>
              <li>Que contenha vírus ou códigos maliciosos.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Links para Terceiros</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Nosso site pode conter links para sites externos (como redes sociais e portais de notícias). 
              Não nos responsabilizamos pelo conteúdo ou pelas políticas de privacidade desses sites
              de terceiros.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Isenção de Responsabilidade</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              As informações presentes neste site são mantidas o mais atualizadas possível. No entanto,
              não garantimos a precisão, atualização e integridade constante de todas as informações.
            </p>
            
            <p className="text-sm text-slate-500 mt-10">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
