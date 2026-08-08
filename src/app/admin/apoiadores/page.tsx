import dynamic from "next/dynamic";

// Importa o componente sem SSR — evita que o Next.js tente
// pré-renderizar no servidor durante o build (Supabase precisa de env vars em runtime)
const ApoiadoresClient = dynamic(
  () => import("./ApoiadoresClient"),
  { ssr: false, loading: () => null }
);

export default function AdminApoiadoresPage() {
  return <ApoiadoresClient />;
}
