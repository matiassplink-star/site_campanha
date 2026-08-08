/** Constantes globais do projeto */

export const SITE_CONFIG = {
  name: "Brivaldo Marques",
  title:
    "Brivaldo Marques | Vereador de Maceió e Alagoas — Saúde e Juventude",
  description:
    "Brivaldo Marques, Vereador de Maceió e pré-candidato a Deputado Estadual por Alagoas. Saúde e Juventude para Maceió, região metropolitana e todos os municípios alagoanos.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://brivaldomarques.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  region: "BR-AL",
  city: "Maceió",
  state: "Alagoas",
  country: "Brasil",
  instagram: "https://instagram.com/brivaldo.marques",
  instagramHandle: "@brivaldo.marques",
  whatsappDefault: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "558231990122",
  whatsappMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    "Olá, gostaria de falar com a equipe do Brivaldo Marques.",
};

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "História", href: "/historia" },
  { label: "Bandeiras", href: "/bandeiras" },
  { label: "Projetos", href: "/projetos" },
  { label: "Blog", href: "/blog" },
  { label: "Galeria", href: "/galeria" },
  { label: "Agenda", href: "/agenda" },
  { label: "Seja Apoiador", href: "/seja-apoiador" },
  { label: "Contato", href: "/contato" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Posts", href: "/admin/posts", icon: "FileText" },
  { label: "Categorias", href: "/admin/categorias", icon: "Tag" },
  { label: "Galeria", href: "/admin/galeria", icon: "Image" },
  { label: "Agenda", href: "/admin/agenda", icon: "Calendar" },
  { label: "Páginas", href: "/admin/paginas", icon: "FileStack" },
  { label: "Banner", href: "/admin/banner", icon: "Layout" },
  { label: "SEO", href: "/admin/seo", icon: "Search" },
  { label: "Configurações", href: "/admin/configuracoes", icon: "Settings" },
  { label: "Usuários", href: "/admin/usuarios", icon: "Users" },
  { label: "Contato", href: "/admin/contato", icon: "Mail" },
] as const;

export const BANDEIRAS = [
  {
    id: "saude",
    title: "Saúde",
    subtitle: "Saúde de qualidade para todos os maceioenses",
    description:
      "Acesso universal à saúde pública, com investimento em UBSs, atenção básica, saúde mental e programas preventivos para a população de Maceió.",
    icon: "Heart",
    color: "health",
    gradient: "gradient-health",
    href: "/bandeiras#saude",
  },
  {
    id: "juventude",
    title: "Juventude",
    subtitle: "Oportunidades reais para a juventude alagoana",
    description:
      "Educação, esporte, cultura e empregabilidade como ferramentas de transformação para os jovens de Maceió e de Alagoas.",
    icon: "Zap",
    color: "youth",
    gradient: "gradient-youth",
    href: "/bandeiras#juventude",
  },
] as const;

export const POSTS_PER_PAGE = 9;
export const GALLERY_ITEMS_PER_PAGE = 24;
