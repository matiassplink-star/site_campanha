-- =============================================================================
-- TABELA: apoiadores
-- Cadastros da página "Seja Apoiador"
-- =============================================================================

CREATE TABLE IF NOT EXISTS apoiadores (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT,
  phone           TEXT NOT NULL,
  city            TEXT NOT NULL,
  neighborhood    TEXT DEFAULT '',
  how_help        TEXT DEFAULT '' CHECK (
                    how_help IN ('divulgacao','evento','doacao','voluntario','outro','')
                  ),
  lgpd_consent          BOOLEAN NOT NULL DEFAULT FALSE,
  whatsapp_authorization BOOLEAN NOT NULL DEFAULT FALSE,
  status          TEXT NOT NULL DEFAULT 'novo'
                    CHECK (status IN ('novo','contatado','ativo','inativo')),
  notes           TEXT DEFAULT '',
  ip_address      TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_apoiadores_status     ON apoiadores(status);
CREATE INDEX IF NOT EXISTS idx_apoiadores_city       ON apoiadores(city);
CREATE INDEX IF NOT EXISTS idx_apoiadores_created_at ON apoiadores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_apoiadores_how_help   ON apoiadores(how_help);

CREATE TRIGGER update_apoiadores_updated_at
  BEFORE UPDATE ON apoiadores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE apoiadores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "apoiadores_public_insert"
  ON apoiadores FOR INSERT WITH CHECK (true);

CREATE POLICY "apoiadores_auth_read"
  ON apoiadores FOR SELECT TO authenticated USING (true);

CREATE POLICY "apoiadores_auth_update"
  ON apoiadores FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "apoiadores_auth_delete"
  ON apoiadores FOR DELETE TO authenticated USING (true);
