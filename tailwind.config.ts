import type { Config } from "tailwindcss";

// No Tailwind v4, cores e tokens customizados ficam no globals.css via @theme.
// Este arquivo apenas configura o darkMode.
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
