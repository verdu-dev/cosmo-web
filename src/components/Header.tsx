import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { localizedPath, setStoredLocale, type Locale } from "../utils/locale";

const LANGUAGE_CODES: Locale[] = ["es", "ca", "en"];

const LANGUAGE_LABELS: Record<Locale, string> = {
  es: "ES",
  ca: "CAT",
  en: "EN",
};

const LANGUAGE_ARIA_KEYS: Record<Locale, string> = {
  es: "header.langEs",
  ca: "header.langCa",
  en: "header.langEn",
};

function LanguageSwitcher({ onSwitch }: { onSwitch?: () => void }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language.toLowerCase();
  const current: Locale = language.startsWith("ca")
    ? "ca"
    : language.startsWith("en")
      ? "en"
      : "es";

  const switchTo = (target: Locale) => {
    if (target === current) return;
    onSwitch?.();
    // Persist the explicit choice first so a Spanish-root boot is never
    // redirected back to the Catalan URL, then full page load to the locale
    // URL for a clean per-locale head.
    setStoredLocale(target);
    window.location.assign(localizedPath(target));
  };

  return (
    <div
      role="group"
      aria-label={t("header.langSwitcher")}
      className="flex items-center gap-1"
    >
      {LANGUAGE_CODES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-label={t(LANGUAGE_ARIA_KEYS[code])}
          aria-pressed={current === code}
          className={`rounded-full px-2.5 py-1 text-sm font-bold transition-colors ${
            current === code
              ? "bg-petrol-50 text-petrol-900"
              : "text-petrol-100 hover:text-petrol-50"
          }`}
        >
          {LANGUAGE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 text-light transition-all duration-300 ${
        isScrolled
          ? "bg-petrol-400 shadow-md py-0"
          : "bg-transparent shadow-none py-2"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img
              src="/Cosmo_white.webp"
              alt={t("header.logoAlt")}
              className={`w-auto cursor-pointer transition-all duration-300 ${
                isScrolled ? "h-7" : "h-7 md:h-[38px]"
              }`}
              onClick={() => scrollToSection("hero")}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-cosmos-terracotta transition-colors duration-200"
            >
              {t("header.navHome")}
            </button>
            <button
              onClick={() => scrollToSection("Planes")}
              className="hover:text-cosmos-terracotta transition-colors duration-200"
            >
              {t("header.navPlans")}
            </button>
            <button
              onClick={() => scrollToSection("clientes")}
              className="hover:text-cosmos-terracotta transition-colors duration-200"
            >
              {t("header.navClients")}
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="cta-primary text-sm bg-petrol-700"
            >
              {t("header.cta")}
            </button>
            <LanguageSwitcher />
          </nav>

          <button
            className="md:hidden p-2 hover:bg-petrol-700/80 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("header.menuAria")}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-petrol-400 absolute z-50 top-20 left-0 right-0 h-[calc(100vh-80px)]">
          <nav className="section-container py-6 flex flex-col space-y-4  h-full">
            <button
              onClick={() => scrollToSection("hero")}
              className="py-3 px-4 hover:bg-cosmos-terracotta/10 rounded-lg transition-colors"
            >
              {t("header.navHome")}
            </button>
            <button
              onClick={() => scrollToSection("Planes")}
              className="py-3 px-4 hover:bg-cosmos-terracotta/10 rounded-lg transition-colors"
            >
              {t("header.navPlans")}
            </button>
            <button
              onClick={() => scrollToSection("clientes")}
              className="py-3 px-4 hover:bg-cosmos-terracotta/10 rounded-lg transition-colors"
            >
              {t("header.navClients")}
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="cta-primary text-center bg-petrol-700"
            >
              {t("header.cta")}
            </button>
            <div className="flex justify-center pt-2">
              <LanguageSwitcher onSwitch={() => setIsMenuOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}