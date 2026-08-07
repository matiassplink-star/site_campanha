"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wrapper do next-themes.
 * Não use gate de `mounted` aqui: o next-themes injeta um <script> anti-FOUC.
 * Se o provider só montar no cliente, o React 19 acusa "script tag while rendering".
 * O script precisa ir no HTML do SSR; suppressHydrationWarning no <html> evita mismatch.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
