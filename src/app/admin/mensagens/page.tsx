"use client";

import dynamic from "next/dynamic";

const MensagensClient = dynamic(
  () => import("./MensagensClient"),
  { ssr: false, loading: () => null }
);

export default function AdminMensagensPage() {
  return <MensagensClient />;
}
