import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/** Região metropolitana de Maceió e entorno imediato */
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

/** Keywords base + cidades (metrópole prioritária + Alagoas) */
export const SEO_KEYWORDS: string[] = [
  // Marca e cargos
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
  // Bandeiras
  "Saúde Maceió",
  "Saúde pública Alagoas",
  "UBS Maceió",
  "Saúde mental Maceió",
  "Juventude Alagoas",
  "Juventude Maceió",
  "Política Alagoas",
  "Política Maceió",
  "Campanha Alagoas",
  "Mandato Maceió",
  // Região
  "Região Metropolitana de Maceió",
  "Grande Maceió",
  "Alagoas",
  "Nordeste",
  // Cidades da metrópole (peso SEO)
  ...CIDADES_METROPOLE_MACEIO.flatMap((c) => [
    `Brivaldo Marques ${c}`,
    `Vereador ${c}`,
    `Política ${c}`,
    `Saúde ${c}`,
  ]),
  // Todas as cidades de Alagoas
  ...CIDADES_ALAGOAS.map((c) => `${c} Alagoas`),
  ...CIDADES_ALAGOAS.map((c) => `Deputado Estadual ${c}`),
];

export const DEFAULT_DESCRIPTION =
  "Brivaldo Marques, Vereador de Maceió e pré-candidato a Deputado Estadual por Alagoas. Saúde e Juventude para Maceió, região metropolitana e todos os municípios alagoanos.";

export const DEFAULT_TITLE =
  "Brivaldo Marques | Vereador de Maceió e Alagoas — Saúde e Juventude";

/** Lista legível de cidades para textos on-page */
export function listaCidadesMetropole(): string {
  return CIDADES_METROPOLE_MACEIO.join(", ");
}

export function listaCidadesAlagoas(): string {
  return CIDADES_ALAGOAS.join(", ");
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
        "@type": "Person",
        "@id": `${SITE_CONFIG.url}/#pessoa`,
        name: "Brivaldo Marques",
        alternateName: "Brivaldo Marques Silva Neto",
        jobTitle: "Vereador de Maceió",
        description: DEFAULT_DESCRIPTION,
        url: SITE_CONFIG.url,
        image: `${SITE_CONFIG.url}/images/brivaldo-marques.png`,
        nationality: "BR",
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
          "Juventude",
          "Política municipal",
          "Maceió",
          "Alagoas",
          ...CIDADES_METROPOLE_MACEIO,
        ],
        sameAs,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organizacao`,
        name: "Mandato Brivaldo Marques",
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/icon-512.png`,
        image: `${SITE_CONFIG.url}/og-image.jpg`,
        description: DEFAULT_DESCRIPTION,
        areaServed: [
          {
            "@type": "City",
            name: "Maceió",
            containedInPlace: {
              "@type": "State",
              name: "Alagoas",
            },
          },
          {
            "@type": "State",
            name: "Alagoas",
            containedInPlace: {
              "@type": "Country",
              name: "Brasil",
            },
          },
          ...CIDADES_ALAGOAS.map((name) => ({
            "@type": "City",
            name,
            containedInPlace: {
              "@type": "State",
              name: "Alagoas",
            },
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
