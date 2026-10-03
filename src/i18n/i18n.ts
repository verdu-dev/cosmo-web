import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import ca from "./locales/ca.json";
import { resolveLocaleFromPath } from "../utils/locale";

// Synchronous, local-only setup: all dictionaries are bundled JSON, so
// `useTranslation()` works without Suspense wrappers or an http-backend.
i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    ca: { translation: ca },
  },
  // The URL path is the source of truth for the locale (SEO).
  lng: resolveLocaleFromPath(),
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;