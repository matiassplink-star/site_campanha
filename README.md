# Brivaldo Marques — Site de Campanha

<div align="center">
  <img src="public/og-image.jpg" alt="Brivaldo Marques" width="800" />

  <h3>Sistema completo para a campanha de Brivaldo Marques</h3>
  <p>Vereador de Maceió · Pré-candidato a Deputado Estadual</p>

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/matiassplink-star/site_campanha)
  ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
  ![Supabase](https://img.shields.io/badge/Supabase-green?logo=supabase)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
</div>

---

## ✨ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript |
| **Estilo** | TailwindCSS, shadcn/ui, Framer Motion |
| **Backend** | Supabase (Auth + PostgreSQL + Storage) |
| **Deploy** | Vercel + GitHub |
| **SEO** | Metadata API, Open Graph, Sitemap, Schema.org |

## 🚀 Instalação Local

### Pré-requisitos
- Node.js 20+
- npm ou yarn
- Conta no Supabase
- Conta na Vercel

### 1. Clone o repositório

```bash
git clone https://github.com/matiassplink-star/site_campanha.git
cd site_campanha
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha o arquivo `.env.local` com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
NEXT_PUBLIC_SITE_URL=https://brivaldoMarques.com.br
```

### 4. Configure o banco de dados

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Crie um novo projeto
3. No SQL Editor, execute o arquivo `supabase/migrations/001_initial_schema.sql`
4. Execute o arquivo `supabase/seed.sql` para dados iniciais

### 5. Execute localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing Page
│   ├── blog/              # Blog público
│   ├── admin/             # Painel administrativo
│   └── ...
├── components/
│   ├── home/              # Seções da Landing Page
│   ├── layout/            # Header, Footer, WhatsApp
│   ├── admin/             # Componentes do painel
│   └── ui/                # shadcn/ui components
├── lib/
│   └── supabase/          # Clientes Supabase
├── hooks/                 # Custom hooks
├── services/              # Serviços de dados
└── types/                 # Tipagens TypeScript
supabase/
├── migrations/            # Schema SQL
└── seed.sql               # Dados iniciais
```

---

## 🗄️ Banco de Dados

O projeto utiliza Supabase (PostgreSQL) com as seguintes tabelas:

- `site_settings` — Configurações globais
- `hero_sections` — Conteúdo do banner principal
- `posts` — Posts do blog
- `categories` — Categorias
- `tags` / `post_tags` — Tags e relações
- `gallery` / `gallery_folders` — Galeria de imagens
- `contacts` — Mensagens de contato
- `agenda_events` — Eventos da agenda
- `seo_settings` — SEO por página
- `activity_logs` — Logs de atividades

---

## 🔐 Painel Administrativo

Acesse em `/admin/login` com suas credenciais do Supabase Auth.

### Funcionalidades:
- 📊 Dashboard com métricas
- 📝 CRUD completo de Posts (editor rich text)
- 🗂️ Gestão de Categorias e Tags
- 🖼️ Galeria de imagens (upload)
- 📅 Agenda
- 🎨 Configuração do Banner/Hero
- ⚙️ Configurações gerais do site
- 📧 Visualização de mensagens de contato
- 🔍 SEO por página

---

## 🌐 Deploy na Vercel

1. Faça fork/push para o GitHub
2. Importe no [Vercel](https://vercel.com/new)
3. Configure as variáveis de ambiente
4. Deploy automático em cada push!

---

## 📄 Licença

Este projeto é proprietário e de uso exclusivo da campanha de Brivaldo Marques.

---

<div align="center">
  Desenvolvido com ❤️ para a campanha de <strong>Brivaldo Marques</strong>
</div>
