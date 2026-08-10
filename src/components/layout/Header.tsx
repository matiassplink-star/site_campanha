"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn, generateWhatsAppUrl } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const whatsappUrl = generateWhatsAppUrl(
    SITE_CONFIG.whatsappDefault,
    SITE_CONFIG.whatsappMessage
  );

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || isMobileOpen
            ? "bg-primary shadow-lg"
            : "bg-primary/95 backdrop-blur-sm"
        )}
        style={{ backgroundColor: "#1C2B66" }}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[70px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <div className="min-w-0">
                <p className="font-bold font-display leading-tight text-base sm:text-lg text-white truncate uppercase italic">
                  Brivaldo Marques
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-accent-400 bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Apoiar button — outline style */}
              <Link
                href="/seja-apoiador"
                id="header-apoiar-btn"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Apoiar
              </Link>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="header-whatsapp-btn"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#EFC95E", color: "#1C2B66" }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMobileOpen((open) => !open)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm border-0 cursor-pointer"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Fechar menu"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 bottom-0 w-[min(20rem,88vw)] flex flex-col pt-14"
              style={{ backgroundColor: "#1C2B66" }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="font-bold font-display text-white">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-white"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors",
                        pathname === item.href
                          ? "bg-white/20 text-accent-400"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.label}
                      <ChevronRight size={16} className="text-white/40" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 space-y-3 border-t border-white/10">
                <Link
                  href="/seja-apoiador"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Quero Apoiar
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold transition-all"
                  style={{ backgroundColor: "#EFC95E", color: "#1C2B66" }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Fale pelo WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
