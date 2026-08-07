-- =============================================================================
-- SEED — DADOS INICIAIS DO SISTEMA
-- Execute após 001_initial_schema.sql
-- =============================================================================

-- Configurações globais do site
INSERT INTO site_settings (key, value, type, label, group_name) VALUES
  ('site_name', 'Brivaldo Marques', 'text', 'Nome do Site', 'geral'),
  ('site_description', 'Vereador de Maceió · Pré-candidato a Deputado Estadual', 'text', 'Descrição', 'geral'),
  ('site_logo', '', 'image', 'Logo', 'geral'),
  ('site_favicon', '', 'image', 'Favicon', 'geral'),
  ('site_email', '', 'text', 'E-mail', 'contato'),
  ('site_phone', '', 'text', 'Telefone', 'contato'),
  ('whatsapp_number', '5582999999999', 'text', 'Número WhatsApp', 'whatsapp'),
  ('whatsapp_message', 'Olá, gostaria de falar com a equipe do Brivaldo Marques.', 'text', 'Mensagem Padrão WhatsApp', 'whatsapp'),
  ('instagram_url', 'https://instagram.com/brivaldo.marques', 'url', 'Instagram', 'redes_sociais'),
  ('facebook_url', '', 'url', 'Facebook', 'redes_sociais'),
  ('youtube_url', '', 'url', 'YouTube', 'redes_sociais'),
  ('twitter_url', '', 'url', 'Twitter/X', 'redes_sociais'),
  ('site_address', 'Maceió, Alagoas', 'text', 'Endereço', 'contato'),
  ('theme_primary_color', '#0F172A', 'text', 'Cor Primária', 'tema'),
  ('theme_accent_color', '#F59E0B', 'text', 'Cor de Destaque', 'tema')
ON CONFLICT (key) DO NOTHING;

-- Hero Section inicial
INSERT INTO hero_sections (
  title, subtitle, description,
  cta_whatsapp_label, cta_secondary_label, cta_secondary_url,
  badge_text, is_active,
  stats
) VALUES (
  'Vereador que transforma Maceió em cidade de todos',
  'Saúde e Juventude como prioridade',
  'Brivaldo Marques é Vereador de Maceió e pré-candidato a Deputado Estadual. Comprometido com a saúde pública e o futuro da juventude alagoana.',
  'Fale pelo WhatsApp',
  'Conheça a História',
  '/sobre',
  'Vereador de Maceió',
  TRUE,
  '[{"label": "Mandatos", "value": "1+"}, {"label": "Projetos", "value": "Ativos"}, {"label": "Bandeiras", "value": "2"}]'
) ON CONFLICT DO NOTHING;

-- Categorias iniciais do Blog
INSERT INTO categories (name, slug, description, color) VALUES
  ('Saúde', 'saude', 'Projetos e ações na área da saúde pública', '#10B981'),
  ('Juventude', 'juventude', 'Iniciativas voltadas para a juventude alagoana', '#8B5CF6'),
  ('Vereador', 'vereador', 'Atuação na Câmara Municipal de Maceió', '#0EA5E9'),
  ('Maceió', 'maceio', 'Notícias e projetos para Maceió', '#F59E0B'),
  ('Agenda', 'agenda', 'Eventos e agenda do mandato', '#EF4444')
ON CONFLICT (slug) DO NOTHING;

-- SEO inicial por página
INSERT INTO seo_settings (page_path, page_label, meta_title, meta_description, robots) VALUES
  ('/', 'Home', 'Brivaldo Marques — Vereador de Maceió', 'Brivaldo Marques, Vereador de Maceió e pré-candidato a Deputado Estadual. Saúde e Juventude como prioridades para Alagoas.', 'index, follow'),
  ('/sobre', 'Sobre', 'Sobre Brivaldo Marques — Vereador de Maceió', 'Conheça a história e trajetória de Brivaldo Marques, Vereador de Maceió.', 'index, follow'),
  ('/blog', 'Blog', 'Notícias — Brivaldo Marques', 'Acompanhe as últimas notícias e atualizações do mandato de Brivaldo Marques.', 'index, follow'),
  ('/contato', 'Contato', 'Contato — Brivaldo Marques', 'Entre em contato com a equipe de Brivaldo Marques.', 'index, follow'),
  ('/galeria', 'Galeria', 'Galeria — Brivaldo Marques', 'Galeria de fotos do mandato de Brivaldo Marques.', 'index, follow'),
  ('/agenda', 'Agenda', 'Agenda — Brivaldo Marques', 'Acompanhe a agenda de eventos de Brivaldo Marques.', 'index, follow')
ON CONFLICT (page_path) DO NOTHING;

-- Pasta inicial da galeria
INSERT INTO gallery_folders (name, slug, description) VALUES
  ('Geral', 'geral', 'Fotos gerais do mandato'),
  ('Eventos', 'eventos', 'Fotos de eventos'),
  ('Saúde', 'saude', 'Ações na área da saúde'),
  ('Juventude', 'juventude', 'Ações com a juventude')
ON CONFLICT (slug) DO NOTHING;
