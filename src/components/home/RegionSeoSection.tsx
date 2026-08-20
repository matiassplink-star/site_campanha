import {
  CIDADES_ALAGOAS,
  CIDADES_METROPOLE_MACEIO,
  CIDADES_100KM_MACEIO,
  listaCidadesMetropole,
} from "@/lib/seo";

/**
 * Conteúdo on-page de SEO regional — visível, semântico e rico.
 * Cobre Maceió, raio 100 km, metrópole e todos os municípios de AL.
 */
export default function RegionSeoSection() {
  return (
    <section
      id="regiao"
      aria-labelledby="regiao-heading"
      className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100"
    >
      <div className="container-site max-w-5xl space-y-14">

        {/* ── Bloco 1: Candidato + Missão ── */}
        <div>
          <h2
            id="regiao-heading"
            className="text-2xl sm:text-3xl font-black font-display text-primary mb-4"
          >
            Brivaldo Marques 22000 — Deputado Estadual Alagoas 2026
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
            <strong className="text-slate-800">Brivaldo Marques</strong>, Vereador de Maceió
            com <strong className="text-slate-800">8.671 votos em 2024</strong>, é candidato a{" "}
            <strong className="text-slate-800">Deputado Estadual por Alagoas nas eleições de 2026</strong>{" "}
            pelo número <strong className="text-slate-800">22000</strong>. Formado em Fisioterapia
            pela UNCISAL, defende as bandeiras de <strong className="text-slate-800">Saúde,
            Esporte e Juventude</strong> em toda a Assembleia Legislativa de Alagoas (ALEAL).
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Com raízes no bairro <strong className="text-slate-800">Benedito Bentes</strong> — onde
            foi Prefeito Comunitário em 2017 —, Brivaldo construiu um mandato próximo das pessoas,
            fiscalizando políticas públicas de saúde, criando projetos de lei voltados à juventude
            e promovendo oportunidades de esporte em Maceió e região.
          </p>
        </div>

        {/* ── Bloco 2: Cidades no raio de 100 km ── */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-primary mb-2">
            Candidato a Deputado Estadual nas cidades próximas a Maceió (até 100 km)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
            O mandato de Brivaldo Marques como Deputado Estadual vai atender toda a zona de
            influência de Maceió — cidades num raio de até 100 km da capital — com políticas
            de saúde pública, incentivo ao esporte e projetos para a juventude:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
            {CIDADES_100KM_MACEIO.map(({ nome, distancia }) => (
              <div
                key={nome}
                className="flex flex-col px-3 py-2 rounded-lg bg-white border border-slate-100 shadow-sm"
              >
                <span className="text-xs font-semibold text-primary">{nome}</span>
                <span className="text-[11px] text-slate-400">{distancia} km de Maceió</span>
              </div>
            ))}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            Municípios como{" "}
            <strong className="text-slate-800">
              Rio Largo, Marechal Deodoro, Satuba, Santa Luzia do Norte, Barra de São Miguel,
              Paripueira, Pilar, Messias, Murici, Flexeiras, Atalaia, Roteiro, Boca da Mata,
              Campo Alegre, Branquinha, Teotônio Vilela, Anadia, São Luís do Quitunde,
              Jundiá, Cajueiro, União dos Palmares, Joaquim Gomes, Ibateguara, São José da
              Laje, Matriz de Camaragibe, Viçosa, Porto Calvo, Coruripe e Piaçabuçu
            </strong>{" "}
            fazem parte da área prioritária de atuação do candidato a Deputado Estadual{" "}
            <strong className="text-slate-800">Brivaldo Marques 22000</strong>.
          </p>
        </div>

        {/* ── Bloco 3: Região Metropolitana ── */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-primary mb-2">
            Atuação na Região Metropolitana de Maceió
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            A Região Metropolitana de Maceió é o coração do mandato de Brivaldo Marques.
            Como candidato a Deputado Estadual, ele vai ampliar o trabalho já realizado como
            Vereador de Maceió para toda a metrópole — incluindo{" "}
            <strong className="font-semibold text-slate-800">
              {listaCidadesMetropole()}
            </strong>
            .
          </p>
          <ul className="flex flex-wrap gap-2">
            {CIDADES_METROPOLE_MACEIO.map((cidade) => (
              <li
                key={cidade}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 font-medium"
              >
                {cidade}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bloco 4: Bandeiras SEO ── */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-primary mb-2 text-base">
              Saúde Pública em Alagoas
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Brivaldo Marques defende o fortalecimento das UBS, saúde mental, atenção básica
              e políticas de saúde pública em Maceió e em todo o estado de Alagoas.
              Como fisioterapeuta, entende profundamente as necessidades da saúde pública.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-primary mb-2 text-base">
              Juventude com Voz e Vez
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Projetos de lei voltados à juventude alagoana: primeiro emprego, educação,
              cultura e oportunidades para jovens em Maceió, Região Metropolitana e interior
              de Alagoas. Juventude com voz e vez na Assembleia Legislativa.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-primary mb-2 text-base">
              Esporte como Política Pública
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Incentivo ao esporte como instrumento de transformação social. Quadras,
              projetos esportivos e inclusão pelo esporte em Maceió e nas cidades
              vizinhas do estado de Alagoas.
            </p>
          </div>
        </div>

        {/* ── Bloco 5: Todos os municípios AL ── */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
            Compromisso com todos os municípios de Alagoas
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
            Brivaldo Marques, candidato ao número <strong>22000</strong> nas eleições de{" "}
            <strong>Deputado Estadual de Alagoas 2026</strong>, tem compromisso com todos os
            102 municípios alagoanos. Saúde pública, esporte e juventude para cada cidade de
            Alagoas.
          </p>
          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
            {CIDADES_ALAGOAS.map((cidade) => (
              <li
                key={cidade}
                className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-100"
              >
                {cidade}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
