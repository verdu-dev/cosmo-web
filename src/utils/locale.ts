/**
 * Locale helpers: path <-> locale resolution, URL building and the
 * cosmo.lang persistence rules.
 *
 * URL strategy: `/` = Spanish (default), `/ca/` = Catalan, `/en/` = English.
 */

export type Locale = "es" | "ca" | "en";

export const SUPPORTED_LOCALES: readonly Locale[] = ["es", "ca", "en"] as const;

export const LANG_STORAGE_KEY = "cosmo.lang";

const BASE_URL = "https://www.cosmostudio.es";

/** `ca`/`en` (only the exact first segment) -> the locale, everything else -> es. */
export function normalizeLocale(value?: string | null): Locale {
  const v = value?.toLowerCase();
  if (v === "ca") return "ca";
  if (v === "en") return "en";
  return "es";
}

/** Locale derived from the URL path: first segment `ca`/`en` -> that locale, otherwise Spanish. */
export function resolveLocaleFromPath(
  pathname: string = window.location.pathname,
): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  return normalizeLocale(firstSegment);
}

/** Absolute base URL for a locale (canonical/hreflang targets). */
export function localizedUrl(locale: Locale): string {
  return locale === "es" ? `${BASE_URL}/` : `${BASE_URL}/${locale}/`;
}

/**
 * Site path for a target locale, preserving any remaining path and hash so
 * the current section anchor survives a language switch.
 */
export function localizedPath(
  locale: Locale,
  pathname: string = window.location.pathname,
  hash: string = window.location.hash,
): string {
  // Strip any existing locale prefix (`ca`/`en`) before re-adding the target one.
  const rest = pathname.replace(/^\/(?:ca|en)(?=\/|$)/, "");
  let base: string;
  if (locale !== "es") {
    base =
      rest === "" || rest === "/"
        ? `/${locale}/`
        : `/${locale}${rest.startsWith("/") ? rest : `/${rest}`}`;
  } else {
    base = rest === "" ? "/" : rest;
  }
  return `${base}${hash}`;
}

function safeGetStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getStoredLocale(): Locale | null {
  const storage = safeGetStorage();
  if (!storage) return null;
  try {
    const value = storage.getItem(LANG_STORAGE_KEY);
    return value === "ca" || value === "es" || value === "en" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredLocale(locale: Locale): void {
  const storage = safeGetStorage();
  if (!storage) return;
  try {
    storage.setItem(LANG_STORAGE_KEY, locale);
  } catch {
    // Ignore storage failures (private mode, quota, ...).
  }
}

/** First-visit browser-language hints follow `ca` first, then `en`. */
function browserLanguageStartsWith(prefix: "ca" | "en"): boolean {
  try {
    return window.navigator.language.toLowerCase().startsWith(prefix);
  } catch {
    return false;
  }
}

/**
 * Decide the locale to boot with.
 * - `/ca/...` and `/en/...` URLs always use their locale: the path is the
 *   source of truth for SEO.
 * - On the Spanish root, a previously stored `cosmo.lang` choice wins, and a
 *   stored/first-visit `ca`/`en` preference redirects to the canonical locale
 *   URL so every URL keeps its own canonical + hreflang matrix.
 * - First visit without a stored choice follows `navigator.language` when it
 *   starts with `ca` (Catalan) or `en` (English), in that order; any other
 *   browser language stays on Spanish.
 */
export function computeInitialLocale(): {
  locale: Locale;
  redirect?: string;
} {
  const pathLocale = resolveLocaleFromPath();
  if (pathLocale !== "es") return { locale: pathLocale };

  const stored = getStoredLocale();
  if (stored === "ca" || stored === "en") {
    return { locale: stored, redirect: localizedPath(stored) };
  }
  if (stored === "es") return { locale: "es" };

  if (browserLanguageStartsWith("ca")) {
    return { locale: "ca", redirect: localizedPath("ca") };
  }
  if (browserLanguageStartsWith("en")) {
    return { locale: "en", redirect: localizedPath("en") };
  }
  return { locale: "es" };
}