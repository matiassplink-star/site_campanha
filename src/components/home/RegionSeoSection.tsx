import {
  CIDADES_ALAGOAS,
  CIDADES_METROPOLE_MACEIO,
  listaCidadesMetropole,
} from "@/lib/seo";

/**
 * Conteúdo on-page de SEO regional (Maceió + metrópole + AL).
 * Visível e legível, sem poluir o design principal.
 */
export default function RegionSeoSection() {
  return (
    <section
      id="regiao"
      aria-labelledby="regiao-heading"
      className="py-12 sm:py-16 bg-white dark:bg-primary-950 border-t border-slate-100 dark:border-slate-900"
    >
      <div className="container-site max-w-4xl">
        <h2
          id="regiao-heading"
          className="text-xl sm:text-2xl font-bold font-display text-primary dark:text-white mb-4"
        >
          Atuação em Maceió, região metropolitana e Alagoas
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
          Brivaldo Marques, Vereador de Maceió e pré-candidato a Deputado
          Estadual, trabalha por Saúde, Esporte e Juventude em Maceió e em toda a
          Região Metropolitana de Maceió — incluindo{" "}
          <strong className="font-semibold text-slate-800 dark:text-slate-200">
            {listaCidadesMetropole()}
          </strong>
          .
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
          O compromisso se estende a todos os municípios de Alagoas: políticas
          públicas de saúde, oportunidades para a juventude e um mandato
          próximo das pessoas em cada cidade do estado.
        </p>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-700 dark:text-accent-400 mb-3">
          Região Metropolitana de Maceió
        </h3>
        <ul className="flex flex-wrap gap-2 mb-8">
          {CIDADES_METROPOLE_MACEIO.map((cidade) => (
            <li
              key={cidade}
              className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-primary/5 text-primary dark:bg-white/5 dark:text-slate-300 border border-primary/10 dark:border-white/10"
            >
              {cidade}
            </li>
          ))}
        </ul>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-700 dark:text-accent-400 mb-3">
          Municípios de Alagoas
        </h3>
        <ul className="flex flex-wrap gap-1.5 sm:gap-2">
          {CIDADES_ALAGOAS.map((cidade) => (
            <li
              key={cidade}
              className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
            >
              {cidade}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
