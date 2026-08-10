"use client";

import dynamic from "next/dynamic";

const BlogClient = dynamic(
  () => import("./BlogClient"),
  { ssr: false, loading: () => null }
);

export default function AdminBlogPage() {
  return <BlogClient />;
}
