"use client";

import dynamic from "next/dynamic";

const AgendaClient = dynamic(
  () => import("./AgendaClient"),
  { ssr: false, loading: () => null }
);

export default function AdminAgendaPage() {
  return <AgendaClient />;
}
