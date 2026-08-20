import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/** Região metropolitana oficial de Maceió */
export const CIDADES_METROPOLE_MACEIO = [
  "Maceió",
  "Rio Largo",
  "Satuba",
  "Santa Luzia do Norte",
  "Coqueiro Seco",
  "Marechal Deodoro",
  "Pilar",
  "Messias",
  "Murici",
  "Flexeiras",
  "Atalaia",
  "Barra de São Miguel",
  "Paripueira",
  "Barra de Santo Antônio",
] as const;

/**
 * Cidades num raio de até 100 km de Maceió (AL) —
 * principal zona de influência eleitoral para Deputado Estadual.
 */
export const CIDADES_100KM_MACEIO: { nome: string; distancia: number }[] = [
  { nome: "Maceió", distancia: 0 },
  { nome: "Satuba", distancia: 15 },
  { nome: "Santa Luzia do Norte", distancia: 18 },
  { nome: "Coqueiro Seco", distancia: 20 },
  { nome: "Rio Largo", distancia: 25 },
  { nome: "Marechal Deodoro", distancia: 22 },
  { nome: "Barra de São Miguel", distancia: 28 },
  { nome: "Paripueira", distancia: 35 },
  { nome: "Roteiro", distancia: 38 },
  { nome: "Pilar", distancia: 36 },
  { nome: "Messias", distancia: 38 },
  { nome: "Murici", distancia: 50 },
  { nome: "Flexeiras", distancia: 55 },
  { nome: "Atalaia", distancia: 58 },
  { nome: "Boca da Mata", distancia: 55 },
  { nome: "Campo Alegre", distancia: 62 },
  { nome: "Branquinha", distancia: 65 },
  { nome: "Teotônio Vilela", distancia: 65 },
  { nome: "Anadia", distancia: 70 },
  { nome: "São Luís do Quitunde", distancia: 72 },
  { nome: "Jundiá", distancia: 75 },
  { nome: "Cajueiro", distancia: 78 },
  { nome: "União dos Palmares", distancia: 80 },
  { nome: "Joaquim Gomes", distancia: 82 },
  { nome: "Ibateguara", distancia: 88 },
  { nome: "São José da Laje", distancia: 90 },
  { nome: "Matriz de Camaragibe", distancia: 90 },
  { nome: "Viçosa", distancia: 92 },
  { nome: "Porto Calvo", distancia: 95 },
  { nome: "Coruripe", distancia: 100 },
  { nome: "Piaçabuçu", distancia: 100 },
  { nome: "Barra de Santo Antônio", distancia: 50 },
  { nome: "Colônia Leopoldina", distancia: 98 },
  { nome: "Novo Lino", distancia: 95 },
  { nome: "Jacuípe", distancia: 70 },
  { nome: "Chã Preta", distancia: 80 },
  { nome: "Santana do Mundaú", distancia: 85 },
];

/** Lista plana de nomes para uso em keywords */
export const NOMES_CIDADES_100KM = CIDADES_100KM_MACEIO.map((c) => c.nome);

/**
 * Todos os 102 municípios de Alagoas —
 * usados em keywords, textos de SEO e alcance regional.
 */
export const CIDADES_ALAGOAS = [
  "Água Branca",
  "Anadia",
  "Arapiraca",
  "Atalaia",
  "Barra de Santo Antônio",
  "Barra de São Miguel",
  "Batalha",
  "Belém",
  "Belo Monte",
  "Boca da Mata",
  "Branquinha",
  "Cacimbinhas",
  "Cajueiro",
  "Campestre",
  "Campo Alegre",
  "Campo Grande",
  "Canapi",
  "Capela",
  "Carneiros",
  "Chã Preta",
  "Coité do Nóia",
  "Colônia Leopoldina",
  "Coqueiro Seco",
  "Coruripe",
  "Craíbas",
  "Delmiro Gouveia",
  "Dois Riachos",
  "Estrela de Alagoas",
  "Feira Grande",
  "Feliz Deserto",
  "Flexeiras",
  "Girau do Ponciano",
  "Ibateguara",
  "Igaci",
  "Igreja Nova",
  "Inhapi",
  "Jacaré dos Homens",
  "Jacuípe",
  "Japaratinga",
  "Jaramataia",
  "Jequiá da Praia",
  "Joaquim Gomes",
  "Jundiá",
  "Junqueiro",
  "Lagoa da Canoa",
  "Limoeiro de Anadia",
  "Maceió",
  "Major Isidoro",
  "Maragogi",
  "Maravilha",
  "Marechal Deodoro",
  "Maribondo",
  "Mar Vermelho",
  "Mata Grande",
  "Matriz de Camaragibe",
  "Messias",
  "Minador do Negrão",
  "Monteirópolis",
  "Murici",
  "Novo Lino",
  "Olho d'Água das Flores",
  "Olho d'Água do Casado",
  "Olho d'Água Grande",
  "Olivença",
  "Ouro Branco",
  "Palestina",
  "Palmeira dos Índios",
  "Pão de Açúcar",
  "Pariconha",
  "Paripueira",
  "Passo de Camaragibe",
  "Paulo Jacinto",
  "Penedo",
  "Piaçabuçu",
  "Pilar",
  "Pindoba",
  "Piranhas",
  "Poço das Trincheiras",
  "Porto Calvo",
  "Porto de Pedras",
  "Porto Real do Colégio",
  "Quebrangulo",
  "Rio Largo",
  "Roteiro",
  "Santa Luzia do Norte",
  "Santana do Ipanema",
  "Santana do Mundaú",
  "São Brás",
  "São José da Laje",
  "São José da Tapera",
  "São Luís do Quitunde",
  "São Miguel dos Campos",
  "São Miguel dos Milagres",
  "São Sebastião",
  "Satuba",
  "Senador Rui Palmeira",
  "Tanque d'Arca",
  "Taquarana",
  "Teotônio Vilela",
  "Traipu",
  "União dos Palmares",
  "Viçosa",
] as const;

// ---------------------------------------------------------------------------
// KEYWORDS COMPLETAS — cobertura máxima para rankeamento
// ---------------------------------------------------------------------------

/** Todas as variações possíveis de keyword para "Deputado Estadual" */
export const KEYWORDS_DEPUTADO: string[] = [
  // Cargo principal — todas variações
  "Deputado Estadual Alagoas",
  "Deputado Estadual Alagoas 2026",
  "Candidato Deputado Estadual Alagoas",
  "Candidato a Deputado Estadual Alagoas 2026",
  "Candidato Deputado Estadual Maceió",
  "Deputado Estadual Maceió 2026",
  "Deputado Estadual por Alagoas",
  "Deputada Estadual Alagoas 2026",
  "Assembleia Legislativa Alagoas 2026",
  "Assembleia Legislativa de Alagoas",
  "ALEAL 2026",
  "Eleições 2026 Alagoas",
  "Eleições 2026 Deputado Estadual",
  "Eleição 2026 AL",
  "Voto Deputado Estadual Alagoas",
  "Quem votar Deputado Estadual Alagoas 2026",
  "Melhor candidato Deputado Estadual Alagoas",
  "Lista candidatos Deputado Estadual Alagoas 2026",
  "Candidatos Deputado Estadual Alagoas 2026",
  "Urna eletrônica Alagoas 2026",

  // Número eleitoral
  "22000",
  "número 22000",
  "voto 22000",
  "22000 Alagoas",
  "22000 Brivaldo",
  "22000 Deputado Estadual",
  "número do candidato 22000",
  "Brivaldo 22000",
  "Brivaldo Marques 22000",

  // Bandeiras / temas — Saúde
  "Saúde pública Alagoas",
  "Saúde pública Maceió",
  "Saúde Alagoas deputado",
  "Deputado saúde Alagoas",
  "Saúde mental Alagoas",
  "Saúde mental Maceió",
  "UBS Maceió",
  "UBS Alagoas",
  "Atenção básica saúde Maceió",
  "Fisioterapeuta político Alagoas",
  "Fisioterapia saúde pública Alagoas",
  "Saúde pública Nordeste",
  "Política de saúde Alagoas 2026",
  "Reforma da saúde Alagoas",

  // Bandeiras / temas — Juventude
  "Juventude Alagoas",
  "Juventude Maceió",
  "Juventude com voz",
  "Juventude com voz e vez",
  "Projeto juventude Alagoas",
  "Políticas para jovens Alagoas",
  "Primeiro emprego Alagoas",
  "Jovens Alagoas política",
  "Juventude e educação Alagoas",
  "Deputado jovem Alagoas",

  // Bandeiras / temas — Esporte
  "Esporte Maceió",
  "Esporte Alagoas",
  "Projeto esportivo Alagoas",
  "Esporte e juventude Alagoas",
  "Políticas de esporte Alagoas",
  "Incentivo ao esporte Alagoas",

  // Mandato / histórico
  "Vereador Maceió",
  "Vereador de Maceió",
  "Câmara Municipal de Maceió",
  "Câmara de Maceió",
  "Mandato Maceió",
  "Mandato vereador Maceió",
  "Projetos de lei Maceió",
  "Projetos lei saúde Maceió",
  "Brivaldo Marques Vereador",
  "Brivaldo Marques Vereador Maceió",
  "Reeleito vereador Maceió 2024",
  "8671 votos Maceió",
  "Benedito Bentes prefeito comunitário",

  // Marca pessoal
  "Brivaldo Marques",
  "Brivaldo Marques Alagoas",
  "Brivaldo Marques Maceió",
  "Brivaldo Marques Deputado Estadual",
  "Brivaldo Marques 2026",
  "Brivaldo Marques Silva Neto",
  "Brivaldo Marques político",
  "Brivaldo Marques campanha",
  "Brivaldo Marques site oficial",
  "site Brivaldo Marques",
  "Brivaldo Marques apoiador",
  "apoiar Brivaldo Marques",
  "campanha Brivaldo Marques 2026",

  // Geotermos gerais
  "Política Alagoas",
  "Política Maceió",
  "Campanha política Alagoas 2026",
  "Candidatos Alagoas 2026",
  "Eleições municipais Alagoas",
  "Nordeste político 2026",
  "Região Metropolitana de Maceió política",
  "Grande Maceió política",
];

/** Keywords para cidades no raio de 100 km de Maceió — SEO hiperlocal */
export const KEYWORDS_100KM: string[] = CIDADES_100KM_MACEIO.flatMap(({ nome }) => [
  `Deputado Estadual ${nome}`,
  `Candidato Deputado Estadual ${nome}`,
  `Brivaldo Marques ${nome}`,
  `Vereador ${nome}`,
  `Política ${nome} Alagoas`,
  `Saúde ${nome}`,
  `Juventude ${nome}`,
  `Eleições 2026 ${nome}`,
  `Candidato ${nome} 2026`,
  `Votar ${nome} Deputado Estadual`,
  `22000 ${nome}`,
]);

/** Keywords base + cidades (metrópole prioritária + Alagoas) */
export const SEO_KEYWORDS: string[] = [
  // Marca e cargos base
  "Brivaldo Marques",
  "Brivaldo Marques Vereador",
  "Brivaldo Marques Maceió",
  "Brivaldo Marques Alagoas",
  "Vereador Brivaldo Marques",
  "Vereador de Maceió",
  "Vereador Maceió",
  "Deputado Estadual Alagoas",
  "pré-candidato Deputado Estadual Alagoas",
  "Câmara Municipal de Maceió",
  "Câmara de Maceió",

  // Keywords deputado completas
  ...KEYWORDS_DEPUTADO,

  // Cidades 100km — hiperlocal
  ...KEYWORDS_100KM,

  // Região metropolitana detalhada
  ...CIDADES_METROPOLE_MACEIO.flatMap((c) => [
    `Brivaldo Marques ${c}`,
    `Vereador ${c}`,
    `Política ${c}`,
    `Saúde ${c}`,
    `Deputado Estadual ${c}`,
    `Candidato ${c} 2026`,
  ]),

  // Todas as cidades de Alagoas
  ...CIDADES_ALAGOAS.map((c) => `${c} Alagoas`),
  ...CIDADES_ALAGOAS.map((c) => `Deputado Estadual ${c}`),
  ...CIDADES_ALAGOAS.map((c) => `Brivaldo Marques ${c}`),
  ...CIDADES_ALAGOAS.map((c) => `Candidato ${c} 2026`),

  // Região geral
  "Região Metropolitana de Maceió",
  "Grande Maceió",
  "Alagoas",
  "Nordeste",
];

export const DEFAULT_DESCRIPTION =
  "Brivaldo Marques, Vereador de Maceió (número 22000), candidato a Deputado Estadual por Alagoas em 2026. Saúde, Esporte e Juventude para Maceió, Região Metropolitana e todos os municípios alagoanos. Juventude com Voz e Vez.";

export const DEFAULT_TITLE =
  "Brivaldo Marques 22000 | Candidato a Deputado Estadual — Alagoas 2026";

/** Lista legível de cidades da metrópole para textos on-page */
export function listaCidadesMetropole(): string {
  return CIDADES_METROPOLE_MACEIO.join(", ");
}

export function listaCidadesAlagoas(): string {
  return CIDADES_ALAGOAS.join(", ");
}

export function listaCidades100km(): string {
  return CIDADES_100KM_MACEIO.map((c) => c.nome).join(", ");
}

type PageSeoInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  image?: string;
};

/** Metadata reutilizável por página */
export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = SEO_KEYWORDS,
  noIndex = false,
  image = "/og-image.jpg",
}: PageSeoInput): Metadata {
  const url = new URL(path, SITE_CONFIG.url).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SITE_CONFIG.instagramHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/** JSON-LD Person + Organization + WebSite (Maceió / AL) */
export function buildJsonLd() {
  const sameAs = [SITE_CONFIG.instagram].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "PoliticianOrPublicFigure"],
        "@id": `${SITE_CONFIG.url}/#pessoa`,
        name: "Brivaldo Marques",
        alternateName: ["Brivaldo Marques Silva Neto", "Brivaldo 22000"],
        jobTitle: "Vereador de Maceió e Candidato a Deputado Estadual por Alagoas",
        description: DEFAULT_DESCRIPTION,
        url: SITE_CONFIG.url,
        image: `${SITE_CONFIG.url}/images/foto-campanha.jpg`,
        nationality: "BR",
        birthPlace: {
          "@type": "Place",
          name: "Colônia Leopoldina, Alagoas, Brasil",
        },
        homeLocation: {
          "@type": "Place",
          name: "Maceió, Alagoas, Brasil",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Maceió",
            addressRegion: "AL",
            addressCountry: "BR",
          },
        },
        knowsAbout: [
          "Saúde pública",
          "Fisioterapia",
          "Juventude",
          "Esporte",
          "Política municipal",
          "Política estadual",
          "Maceió",
          "Alagoas",
          ...CIDADES_METROPOLE_MACEIO,
          ...NOMES_CIDADES_100KM,
        ],
        sameAs,
      },
      {
        "@type": ["Organization", "PoliticalOrganization"],
        "@id": `${SITE_CONFIG.url}/#organizacao`,
        name: "Campanha Brivaldo Marques 22000 — Deputado Estadual 2026",
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/icon-512.png`,
        image: `${SITE_CONFIG.url}/og-image.jpg`,
        description: DEFAULT_DESCRIPTION,
        foundingDate: "2026",
        areaServed: [
          {
            "@type": "City",
            name: "Maceió",
            containedInPlace: { "@type": "State", name: "Alagoas" },
          },
          {
            "@type": "State",
            name: "Alagoas",
            containedInPlace: { "@type": "Country", name: "Brasil" },
          },
          // Cidades 100km
          ...CIDADES_100KM_MACEIO.map(({ nome }) => ({
            "@type": "City",
            name: nome,
            containedInPlace: { "@type": "State", name: "Alagoas" },
          })),
          // Todos municípios AL
          ...CIDADES_ALAGOAS.map((name) => ({
            "@type": "City",
            name,
            containedInPlace: { "@type": "State", name: "Alagoas" },
          })),
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Maceió",
          addressRegion: "AL",
          addressCountry: "BR",
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_CONFIG.url}/#organizacao` },
        about: { "@id": `${SITE_CONFIG.url}/#pessoa` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_CONFIG.url}/#webpage`,
        url: SITE_CONFIG.url,
        name: DEFAULT_TITLE,
        isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
        about: { "@id": `${SITE_CONFIG.url}/#pessoa` },
        description: DEFAULT_DESCRIPTION,
        inLanguage: "pt-BR",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_CONFIG.url}/og-image.jpg`,
        },
      },
    ],
  };
}
