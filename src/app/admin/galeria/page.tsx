"use client";

import dynamic from "next/dynamic";

const GaleriaClient = dynamic(
  () => import("./GaleriaClient"),
  { ssr: false, loading: () => null }
);

export default function AdminGaleriaPage() {
  return <GaleriaClient />;
}
