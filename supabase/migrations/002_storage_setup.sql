-- ============================================================
-- SETUP DE SUPABASE STORAGE (BUCKET DE FOTOS E VÍDEOS)
-- Copie e cole este script no Editor SQL do seu Supabase Dashboard
-- ============================================================

-- 1. Criar o Bucket Público de Mídias
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media', 
  'media', 
  true, 
  524288000, -- Limite de 500MB por arquivo (ideal para vídeos)
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Políticas de Acesso (RLS) para o Storage

-- Permitir Leitura Pública de qualquer foto ou vídeo
CREATE POLICY "Mídias Leitura Pública"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Permitir Upload de arquivos
CREATE POLICY "Mídias Upload Liberado"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media');

-- Permitir Atualização e Substituição de mídias
CREATE POLICY "Mídias Atualização Liberada"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media');

-- Permitir Exclusão de mídias
CREATE POLICY "Mídias Exclusão Liberada"
ON storage.objects FOR DELETE
USING (bucket_id = 'media');
