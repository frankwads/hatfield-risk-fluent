import { useEffect } from "react";

// 2026-10-13 (Frank, AI governance tranche): one helper that sets a page's
// browser title, search description, canonical address and social-share
// (Open Graph) tags, plus optional structured data for search engines.
// Spec section 10 asks for unique titles and descriptions, canonical URLs and
// Open Graph tags on the new pages. The site has no metadata library (none is
// imported by the pages reviewed on 2026-10-13), so this writes the tags
// directly and puts the previous values back when the visitor leaves the
// page, so other pages are unaffected.
// Used by: src/pages/AIGovernance.tsx, src/pages/AIGovernanceArticle.tsx.

const SITE_ORIGIN = "https://www.hatfield.ai";

type PageMeta = {
  title: string;
  description: string;
  path: string; // e.g. "/about/ai-governance"
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
};

const setTag = (
  selector: string,
  create: () => HTMLElement,
  attr: string,
  value: string,
): (() => void) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  const existed = el !== null;
  const previous = el?.getAttribute(attr) ?? null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  return () => {
    if (!el) return;
    if (!existed) el.remove();
    else if (previous !== null) el.setAttribute(attr, previous);
  };
};

const meta = (key: "name" | "property", name: string, content: string) =>
  setTag(
    `meta[${key}="${name}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(key, name);
      return m;
    },
    "content",
    content,
  );

export const usePageMeta = ({
  title,
  description,
  path,
  type = "website",
  jsonLd,
}: PageMeta) => {
  useEffect(() => {
    const url = `${SITE_ORIGIN}${path}`;
    const previousTitle = document.title;
    document.title = title;

    const undo = [
      meta("name", "description", description),
      meta("property", "og:title", title),
      meta("property", "og:description", description),
      meta("property", "og:url", url),
      meta("property", "og:type", type),
      setTag(
        'link[rel="canonical"]',
        () => {
          const l = document.createElement("link");
          l.setAttribute("rel", "canonical");
          return l;
        },
        "href",
        url,
      ),
    ];

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      undo.forEach((fn) => fn());
      script?.remove();
    };
    // The values are fixed per page, so this runs once when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};