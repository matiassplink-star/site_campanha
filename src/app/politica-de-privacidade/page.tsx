import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-white dark:bg-primary-950">
        <div className="container-site max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-8">
            Política de <span className="text-accent-500">Privacidade</span>
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead text-lg text-slate-600 dark:text-slate-400 mb-6">
              Esta política descreve como as informações dos visitantes e apoiadores
              são coletadas, usadas e protegidas pelo site da campanha de Brivaldo Marques.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Coleta de Dados</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Coletamos informações básicas como nome, telefone e e-mail apenas quando você os fornece 
              voluntariamente através do nosso formulário de contato ou ao se cadastrar em nossas listas 
              de transmissão.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso das Informações</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              As informações coletadas são utilizadas exclusivamente para:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Responder a dúvidas, sugestões ou solicitações de contato;</li>
              <li>Enviar atualizações sobre o mandato, projetos e agenda (caso tenha optado por receber);</li>
              <li>Melhorar a experiência de navegação no site (via cookies anônimos de estatísticas).</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Proteção e Segurança</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Adotamos medidas de segurança padrão da indústria para proteger seus dados contra acessos
              não autorizados. Seus dados não serão vendidos, alugados ou compartilhados com terceiros
              para fins comerciais.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Seus Direitos</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Você pode a qualquer momento solicitar a remoção ou atualização de seus dados em nossa base
              através do canal de contato ou enviando uma mensagem via WhatsApp para nossa equipe.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Alterações nesta Política</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Esta política pode ser atualizada periodicamente. Recomendamos revisar esta página para se
              manter informado sobre como estamos protegendo suas informações.
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
