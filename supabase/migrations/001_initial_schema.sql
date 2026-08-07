-- =============================================================================
-- BRIVALDO MARQUES — SCHEMA COMPLETO DO BANCO DE DADOS
-- Supabase PostgreSQL
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABELA: site_settings
-- Configurações globais do site (nome, logo, redes sociais, whatsapp, etc.)
-- =============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'url', 'image', 'boolean', 'json')),
  label TEXT,
  group_name TEXT DEFAULT 'geral',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: hero_sections
-- Conteúdo do banner/hero principal (editável pelo painel)
-- =============================================================================
CREATE TABLE IF NOT EXISTS hero_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  cta_whatsapp_label TEXT DEFAULT 'Fale pelo WhatsApp',
  cta_secondary_label TEXT DEFAULT 'Conheça a História',
  cta_secondary_url TEXT DEFAULT '/sobre',
  badge_text TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT TRUE,
  stats JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: categories
-- Categorias de posts do blog
-- =============================================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  color TEXT DEFAULT '#0EA5E9',
  icon TEXT DEFAULT '',
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: tags
-- Tags para posts do blog
-- =============================================================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: posts
-- Posts do blog
-- =============================================================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  keywords TEXT DEFAULT '',
  canonical_url TEXT DEFAULT '',
  reading_time INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: post_tags (N:N)
-- Relação entre posts e tags
-- =============================================================================
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- =============================================================================
-- TABELA: gallery_folders
-- Pastas da galeria de imagens
-- =============================================================================
CREATE TABLE IF NOT EXISTS gallery_folders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: gallery
-- Imagens da galeria
-- =============================================================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  folder_id UUID REFERENCES gallery_folders(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT DEFAULT '',
  filename TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  width INTEGER DEFAULT 0,
  height INTEGER DEFAULT 0,
  size_bytes INTEGER DEFAULT 0,
  mime_type TEXT DEFAULT 'image/jpeg',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: pages
-- Páginas dinâmicas (sobre, história, etc.)
-- =============================================================================
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT DEFAULT '',
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT TRUE,
  show_in_menu BOOLEAN DEFAULT FALSE,
  menu_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: contacts
-- Mensagens recebidas pelo formulário de contato
-- =============================================================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  ip_address TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: agenda_events
-- Eventos da agenda pública
-- =============================================================================
CREATE TABLE IF NOT EXISTS agenda_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  location TEXT DEFAULT '',
  address TEXT DEFAULT '',
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ,
  image_url TEXT DEFAULT '',
  is_public BOOLEAN DEFAULT TRUE,
  is_cancelled BOOLEAN DEFAULT FALSE,
  event_type TEXT DEFAULT 'evento' CHECK (event_type IN ('evento', 'reuniao', 'audiencia', 'visita', 'outros')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: seo_settings
-- SEO por página
-- =============================================================================
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  page_label TEXT DEFAULT '',
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  og_title TEXT DEFAULT '',
  og_description TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  twitter_title TEXT DEFAULT '',
  twitter_description TEXT DEFAULT '',
  twitter_image TEXT DEFAULT '',
  keywords TEXT DEFAULT '',
  robots TEXT DEFAULT 'index, follow',
  canonical_url TEXT DEFAULT '',
  schema_json TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: banners
-- Banners configuráveis
-- =============================================================================
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT DEFAULT 'hero',
  title TEXT DEFAULT '',
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  link_url TEXT DEFAULT '',
  link_label TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: activity_logs
-- Logs de atividades administrativas
-- =============================================================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT DEFAULT '',
  entity_id TEXT DEFAULT '',
  details JSONB DEFAULT '{}',
  ip_address TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABELA: media
-- Biblioteca de mídia centralizada
-- =============================================================================
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  size_bytes INTEGER DEFAULT 0,
  mime_type TEXT DEFAULT '',
  width INTEGER DEFAULT 0,
  height INTEGER DEFAULT 0,
  storage_path TEXT DEFAULT '',
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- ÍNDICES para performance
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_agenda_events_start ON agenda_events(start_datetime);
CREATE INDEX IF NOT EXISTS idx_gallery_folder_id ON gallery(folder_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_seo_settings_page_path ON seo_settings(page_path);

-- =============================================================================
-- TRIGGERS para updated_at automático
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_sections_updated_at BEFORE UPDATE ON hero_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agenda_events_updated_at BEFORE UPDATE ON agenda_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON seo_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PÚBLICAS (leitura) ---
-- Configurações do site
CREATE POLICY "site_settings_public_read" ON site_settings FOR SELECT USING (true);
-- Hero sections (apenas ativas)
CREATE POLICY "hero_sections_public_read" ON hero_sections FOR SELECT USING (is_active = true);
-- Categorias
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);
-- Tags
CREATE POLICY "tags_public_read" ON tags FOR SELECT USING (true);
-- Posts publicados
CREATE POLICY "posts_public_read" ON posts FOR SELECT USING (status = 'published' AND published_at <= NOW());
-- Post-tags (segue os posts públicos)
CREATE POLICY "post_tags_public_read" ON post_tags FOR SELECT USING (true);
-- Galeria
CREATE POLICY "gallery_folders_public_read" ON gallery_folders FOR SELECT USING (true);
CREATE POLICY "gallery_public_read" ON gallery FOR SELECT USING (true);
-- Páginas publicadas
CREATE POLICY "pages_public_read" ON pages FOR SELECT USING (is_published = true);
-- Eventos públicos
CREATE POLICY "agenda_events_public_read" ON agenda_events FOR SELECT USING (is_public = true);
-- SEO
CREATE POLICY "seo_settings_public_read" ON seo_settings FOR SELECT USING (true);
-- Banners ativos
CREATE POLICY "banners_public_read" ON banners FOR SELECT USING (is_active = true);

-- INSERÇÃO PÚBLICA (formulário de contato)
CREATE POLICY "contacts_public_insert" ON contacts FOR INSERT WITH CHECK (true);

-- POLÍTICAS ADMINISTRATIVAS (usuários autenticados)
CREATE POLICY "site_settings_auth_all" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "hero_sections_auth_all" ON hero_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "categories_auth_all" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "tags_auth_all" ON tags FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "posts_auth_all" ON posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "post_tags_auth_all" ON post_tags FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "gallery_folders_auth_all" ON gallery_folders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "gallery_auth_all" ON gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "pages_auth_all" ON pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "contacts_auth_read" ON contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "contacts_auth_update" ON contacts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "agenda_events_auth_all" ON agenda_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "seo_settings_auth_all" ON seo_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "banners_auth_all" ON banners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "activity_logs_auth_read" ON activity_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "activity_logs_auth_insert" ON activity_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "media_auth_all" ON media FOR ALL TO authenticated USING (true) WITH CHECK (true);
