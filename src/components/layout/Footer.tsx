import Link from "next/link";
import { MapPin, Phone, Heart, Mail } from "lucide-react";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

// SVG inline para ícones de redes sociais (lucide-react removeu brand icons)
function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconWhatsApp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = generateWhatsAppUrl(
    SITE_CONFIG.whatsappDefault,
    SITE_CONFIG.whatsappMessage
  );

  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600">
        <div className="container-site py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white font-display">
                Faça parte dessa história
              </h3>
              <p className="text-primary-100 mt-1">
                Juntos, construímos um Maceió mais justo e saudável.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3 bg-accent-500 text-primary font-bold rounded-xl hover:bg-accent-400 transition-colors shadow-lg"
            >
              <IconWhatsApp size={20} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <span className="text-primary font-bold text-lg font-display">B</span>
              </div>
              <div>
                <p className="font-bold text-white font-display">Brivaldo Marques</p>
                <p className="text-xs text-slate-500">Vereador de Maceió</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Comprometido com a saúde pública e o futuro da juventude alagoana.
              Juntos, transformamos Maceió.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors text-slate-300"
                aria-label="Instagram"
              >
                <IconInstagram size={16} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors text-slate-300"
                aria-label="WhatsApp"
              >
                <IconWhatsApp size={16} />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-display">Links Rápidos</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mais links */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-display">Explore</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-sm text-slate-400 hover:text-accent-400 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-de-uso"
                  className="text-sm text-slate-400 hover:text-accent-400 transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-display">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">Maceió, Alagoas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-500 flex-shrink-0">
                  <IconInstagram size={16} />
                </span>
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-pink-400 transition-colors"
                >
                  {SITE_CONFIG.instagramHandle}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent-500 flex-shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-accent-400 transition-colors"
                >
                  Fale pelo WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-site py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {currentYear} Brivaldo Marques. Todos os direitos reservados.
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1">
              Desenvolvido com <Heart size={12} className="text-red-500" /> para Alagoas
            </p>
          </div>
          <p className="text-xs text-slate-600 mt-2 text-center">
            Material de campanha político-eleitoral. Produzido e financiado pela campanha de Brivaldo Marques.
          </p>
        </div>
      </div>
    </footer>
  );
}
