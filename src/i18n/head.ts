import esJson from "./locales/es.json";
import caJson from "./locales/ca.json";
import { localizedUrl, type Locale } from "../utils/locale";

interface SeoCopy {
  title: string;
  description: string;
}

const es = esJson as { seo: SeoCopy };
const ca = caJson as { seo: SeoCopy };

interface AlternateLink {
  hreflang: string;
  href: string;
}

interface HeadContent {
  lang: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  canonical: string;
  alternates: AlternateLink[];
}

// Per-locale head matrix:
//   Spanish (`/`):      canonical `/`,  alternates es -> `/`, ca -> `/ca/`, x-default -> `/`
//   Catalan (`/ca/`):   canonical `/ca/`, alternates es -> `/`, ca -> `/ca/`, x-default -> `/`
const headBundles: Record<Locale, HeadContent> = {
  es: {
    lang: "es",
    title: es.seo.title,
    description: es.seo.description,
    ogTitle: es.seo.title,
    ogDescription: es.seo.description,
    ogUrl: localizedUrl("es"),
    twitterTitle: es.seo.title,
    twitterDescription: es.seo.description,
    canonical: localizedUrl("es"),
    alternates: [
      { hreflang: "es", href: localizedUrl("es") },
      { hreflang: "ca", href: localizedUrl("ca") },
      { hreflang: "x-default", href: localizedUrl("es") },
    ],
  },
  ca: {
    lang: "ca",
    title: ca.seo.title,
    description: ca.seo.description,
    ogTitle: ca.seo.title,
    ogDescription: ca.seo.description,
    ogUrl: localizedUrl("ca"),
    twitterTitle: ca.seo.title,
    twitterDescription: ca.seo.description,
    canonical: localizedUrl("ca"),
    alternates: [
      { hreflang: "es", href: localizedUrl("es") },
      { hreflang: "ca", href: localizedUrl("ca") },
      { hreflang: "x-default", href: localizedUrl("es") },
    ],
  },
};

function setMetaContent(
  attr: "name" | "property",
  value: string,
  content: string,
): void {
  const selector = `meta[${attr}="${value}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function applyHreflang(alternates: AlternateLink[]): void {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((node) => node.remove());
  for (const { hreflang, href } of alternates) {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    link.setAttribute("href", href);
    document.head.appendChild(link);
  }
}

/**
 * Apply the full per-locale document head synchronously at bootstrap
 * (before the first render), so the rendered DOM carries the right
 * lang/title/meta/canonical/hreflang. The meta keywords tag is
 * intentionally left untouched.
 */
export function applyLocaleHead(locale: Locale): void {
  const bundle = headBundles[locale];
  document.documentElement.lang = bundle.lang;
  document.title = bundle.title;
  setMetaContent("name", "description", bundle.description);
  setMetaContent("property", "og:title", bundle.ogTitle);
  setMetaContent("property", "og:description", bundle.ogDescription);
  setMetaContent("property", "og:url", bundle.ogUrl);
  setMetaContent("name", "twitter:title", bundle.twitterTitle);
  setMetaContent("name", "twitter:description", bundle.twitterDescription);
  setCanonical(bundle.canonical);
  applyHreflang(bundle.alternates);
}