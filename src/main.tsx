import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n/i18n";
import { applyLocaleHead } from "./i18n/head";
import { computeInitialLocale, setStoredLocale } from "./utils/locale";
import App from "./App.tsx";
import "./index.css";

const initial = computeInitialLocale();
setStoredLocale(initial.locale);

if (initial.redirect) {
  // First visit with a Catalan browser (or a stored Catalan choice) on the
  // Spanish root: move to the canonical `/ca/` URL so every URL keeps its
  // own canonical + hreflang head. The destination page applies its own head.
  window.location.assign(initial.redirect);
} else {
  // Synchronous i18n init already ran (module import above); set the
  // per-locale head before the first render.
  applyLocaleHead(initial.locale);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}