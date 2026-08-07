// =============================================================================
// SETUP COMPLETO — Brivaldo Marques
// Cria as tabelas no Supabase e o usuário administrador automaticamente.
//
// Requer variáveis de ambiente (não commite segredos!):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   ADMIN_EMAIL
//   ADMIN_PASSWORD
//   DB_PASSWORD (opcional — senha do Postgres do Supabase)
// =============================================================================

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import pkg from "pg";
import path from "path";
import { fileURLToPath } from "url";

const { Client } = pkg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@admin.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DB_PASSWORD = process.env.DB_PASSWORD || ADMIN_PASSWORD;

function requireEnv(name, value) {
  if (!value) {
    console.error(`\n❌ Variável de ambiente obrigatória ausente: ${name}`);
    console.error("   Defina no .env.local ou exporte antes de rodar o script.\n");
    process.exit(1);
  }
}

requireEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL);
requireEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_KEY);
requireEnv("ADMIN_PASSWORD", ADMIN_PASSWORD);

// Extrai o project ref da URL do Supabase
const projectHost = new URL(SUPABASE_URL).hostname; // xxx.supabase.co
const projectRef = projectHost.split(".")[0];
const DB_URL = `postgresql://postgres:${encodeURIComponent(DB_PASSWORD)}@db.${projectRef}.supabase.co:5432/postgres?sslmode=require`;

async function createTables() {
  console.log("\n📦 Conectando ao banco de dados...");
  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Conectado ao PostgreSQL do Supabase!");

    console.log("📋 Criando tabelas...");
    const sql = readFileSync(
      path.join(__dirname, "../supabase/migrations/001_initial_schema.sql"),
      "utf8"
    );
    await client.query(sql);
    console.log("✅ Todas as tabelas criadas!");

    console.log("🌱 Inserindo dados iniciais...");
    const seed = readFileSync(path.join(__dirname, "../supabase/seed.sql"), "utf8");
    await client.query(seed);
    console.log("✅ Dados iniciais inseridos!");

    return true;
  } catch (err) {
    if (err.code === "42P07") {
      console.log("✅ Tabelas já existem no banco — pulando criação.");
      return true;
    }
    if (
      err.message.includes("password authentication failed") ||
      err.message.includes("authentication")
    ) {
      console.log("\n⚠️  Senha do banco incorreta.");
      console.log("   Defina DB_PASSWORD com a senha do Postgres do projeto.");
      console.log("   Ou rode as migrations manualmente no SQL Editor do Supabase:");
      console.log("   - supabase/migrations/001_initial_schema.sql");
      console.log("   - supabase/seed.sql");
    } else {
      console.error("\n❌ Erro ao criar tabelas:", err.message);
    }
    return false;
  } finally {
    await client.end().catch(() => {});
  }
}

async function createAdminUser() {
  console.log("\n👤 Criando usuário administrador...");

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
    user_metadata: {
      name: "Administrador",
      role: "admin",
    },
  });

  if (error) {
    if (
      error.message.toLowerCase().includes("already") ||
      error.message.toLowerCase().includes("existe")
    ) {
      console.log("✅ Usuário admin já existe!");
    } else {
      console.error("❌ Erro ao criar usuário:", error.message);
      return false;
    }
  } else {
    console.log("✅ Usuário administrador criado com sucesso!");
  }

  console.log(`   📧 Email: ${ADMIN_EMAIL}`);
  console.log("   🔑 Senha: (definida em ADMIN_PASSWORD)");
  return true;
}

async function main() {
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║   SETUP — Sistema Brivaldo Marques           ║");
  console.log("╚══════════════════════════════════════════════╝");

  const tablesOk = await createTables();
  const userOk = await createAdminUser();

  console.log("\n╔══════════════════════════════════════════════╗");
  if (tablesOk && userOk) {
    console.log("║  ✅  Setup concluído com sucesso!            ║");
  } else {
    console.log("║  ⚠️   Setup parcialmente concluído.          ║");
  }
  console.log("╠══════════════════════════════════════════════╣");
  console.log("║  🌐  http://localhost:3000/admin/login        ║");
  console.log(`║  📧  ${ADMIN_EMAIL}`);
  console.log("╚══════════════════════════════════════════════╝");
}

main().catch((e) => {
  console.error("Erro fatal no setup:", e);
  process.exit(1);
});
