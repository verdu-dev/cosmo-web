/**
 * Locale helpers: path <-> locale resolution, URL building and the
 * cosmo.lang persistence rules.
 *
 * URL strategy: `/` = Spanish (default), `/ca/` = Catalan.
 */

export type Locale = "es" | "ca";

export const SUPPORTED_LOCALES: readonly Locale[] = ["es", "ca"] as const;

export const LANG_STORAGE_KEY = "cosmo.lang";

const BASE_URL = "https://www.cosmostudio.es";

/** `ca` (only the exact first segment) -> ca, everything else -> es. */
export function normalizeLocale(value?: string | null): Locale {
  return value?.toLowerCase() === "ca" ? "ca" : "es";
}

/** Locale derived from the URL path: first segment `ca` -> Catalan, otherwise Spanish. */
export function resolveLocaleFromPath(
  pathname: string = window.location.pathname,
): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  return normalizeLocale(firstSegment);
}

/** Absolute base URL for a locale (canonical/hreflang targets). */
export function localizedUrl(locale: Locale): string {
  return locale === "ca" ? `${BASE_URL}/ca/` : `${BASE_URL}/`;
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
  const rest = pathname.replace(/^\/ca(?=\/|$)/, "");
  let base: string;
  if (locale === "ca") {
    base =
      rest === "" || rest === "/"
        ? "/ca/"
        : `/ca${rest.startsWith("/") ? rest : `/${rest}`}`;
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
    return value === "ca" || value === "es" ? value : null;
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

/** Catalan is the only browser-language hint we follow on first visit. */
function browserPrefersCatalan(): boolean {
  try {
    return window.navigator.language.toLowerCase().startsWith("ca");
  } catch {
    return false;
  }
}

/**
 * Decide the locale to boot with.
 * - `/ca/...` URLs are always Catalan: the path is the source of truth for SEO.
 * - On the Spanish root, a previously stored `cosmo.lang` choice wins, and a
 *   stored/first-visit Catalan preference redirects to the canonical `/ca/`
 *   URL so every URL keeps its own canonical + hreflang matrix.
 * - First visit without a stored choice follows `navigator.language` only when
 *   it starts with `ca`; any other browser language stays on Spanish.
 */
export function computeInitialLocale(): {
  locale: Locale;
  redirect?: string;
} {
  const pathLocale = resolveLocaleFromPath();
  if (pathLocale === "ca") return { locale: "ca" };

  const stored = getStoredLocale();
  if (stored === "ca") return { locale: "ca", redirect: localizedPath("ca") };
  if (stored === "es") return { locale: "es" };

  if (browserPrefersCatalan()) {
    return { locale: "ca", redirect: localizedPath("ca") };
  }
  return { locale: "es" };
}