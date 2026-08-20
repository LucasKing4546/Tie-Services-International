import type { PageMeta } from '@data/pages';
import { ancestorsOf } from '@data/pages';
import { SITE } from '@data/site.js';
import type { PageData } from '@lib/blocks';

export const absolute = (path: string) => new URL(path, SITE.origin).href;

/** Deterministic OG card path per page id, e.g. /assets/og/s-02.jpg */
export const ogImageFor = (p: PageMeta) =>
  absolute(`${SITE.ogImageDir}/${p.id.toLowerCase()}.jpg`);

const organizationNode = () => ({
  '@type': 'Organization',
  '@id': `${SITE.origin}/#org`,
  name: SITE.name,
  url: `${SITE.origin}/`,
  description:
    'Custom deck equipment for research, survey and offshore vessels. Winches, ' +
    'launch and recovery systems and handling systems, designed in the UK and ' +
    'manufactured in Satu Mare, Romania.',
  foundingDate: SITE.founded,
  address: SITE.locations.map((l) => ({
    '@type': 'PostalAddress',
    addressCountry: l.country,
    addressLocality: l.locality,
  })),
  sameAs: SITE.sameAs,
});

const breadcrumbNode = (p: PageMeta) => {
  const trail = [...ancestorsOf(p.slug), p];
  if (trail.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.slug === '/' ? 'Home' : item.name,
      item: absolute(item.slug),
    })),
  };
};

/**
 * Page-level JSON-LD graph. Organization on every page (per Meta Tag Rules),
 * BreadcrumbList site-wide, plus the page's own schema type from the workbook.
 *
 * `extra` appends independent graph nodes (Product offers, FAQPage, per-
 * vacancy JobPosting…). `pageNode` instead *extends* the page's own node —
 * spread last, so a template's fields win over the defaults — for cases like
 * Product's `additionalProperty` or Case's `datePublished` that belong on
 * the page node itself rather than as a sibling.
 */
export function buildJsonLd(
  p: PageMeta,
  extra: Record<string, unknown>[] = [],
  pageNode: Record<string, unknown> = {},
) {
  const graph: Record<string, unknown>[] = [organizationNode()];

  const crumbs = breadcrumbNode(p);
  if (crumbs) graph.push(crumbs);

  graph.push({
    '@type': p.schema && p.schema !== 'Organization' ? p.schema : 'WebPage',
    name: p.h1,
    description: p.description,
    url: absolute(p.slug),
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE.origin}/#org` },
    publisher: { '@id': `${SITE.origin}/#org` },
    ...pageNode,
  });

  graph.push(...extra);
  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * jsonLdPage fields for any template rendering an Article-family node
 * (Case, Guide, Policy, Article — content.config.ts's `article` field).
 * Author defaults to 'Romica Tie Group' at the schema level whenever
 * `article` is set at all, so it's always present once a page opts in;
 * dates are included only when actually confirmed, never invented.
 */
export function articleJsonLd(data: { article?: PageData['article'] }): Record<string, unknown> {
  if (!data.article) return {};
  return {
    author: { '@type': 'Organization', name: data.article.author },
    ...(data.article.published ? { datePublished: data.article.published.toISOString() } : {}),
    ...(data.article.revised ? { dateModified: data.article.revised.toISOString() } : {}),
  };
}
