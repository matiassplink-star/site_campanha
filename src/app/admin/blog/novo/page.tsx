"use client";

import dynamic from "next/dynamic";

const NovoBlogClient = dynamic(
  () => import("./NovoBlogClient"),
  { ssr: false, loading: () => null }
);

export default function NovoAdminBlogPage() {
  return <NovoBlogClient />;
}
