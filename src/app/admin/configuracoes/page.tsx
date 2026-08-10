"use client";

import dynamic from "next/dynamic";

const ConfiguracoesClient = dynamic(
  () => import("./ConfiguracoesClient"),
  { ssr: false, loading: () => null }
);

export default function AdminConfiguracoesPage() {
  return <ConfiguracoesClient />;
}
