/**
 * Collection helpers used by templates. Wraps astro:content's getCollection
 * so a template can resolve a page id (or a hub's children) to its MDX body
 * without repeating the lookup-or-throw pattern everywhere.
 *
 * No caching layer of our own here — astro:content already maintains an
 * in-memory store and getCollection() reads from it cheaply, whereas a
 * module-level cache we owned would go stale across a dev-server session
 * whenever an MDX file changes.
 */
import { getCollection } from 'astro:content';
import { page as lookupPage, childrenOf, type PageMeta } from '@data/pages';
import type { CardItem, PageData, PageEntry } from './blocks';

async function byId(pageId: string): Promise<PageEntry | undefined> {
  const entries = await getCollection('pages', (e) => e.data.pageId === pageId);
  return entries[0];
}

/** Resolves a page id to its MDX body. Throws with the page id in the
 *  message — every workbook page must have a body once Step 7's stub pass
 *  has run; a missing one here means the dispatcher's own completeness
 *  check (getStaticPaths) was bypassed or the id is a typo. */
export async function entryFor(pageId: string): Promise<PageEntry> {
  const entry = await byId(pageId);
  if (!entry) {
    throw new Error(`No content entry for "${pageId}". Create src/content/pages/${pageId.toLowerCase()}.mdx`);
  }
  return entry;
}

export async function entriesFor(ids: string[]): Promise<PageEntry[]> {
  return Promise.all(ids.map((id) => entryFor(id)));
}

/** The direct children of a hub, paired with their MDX bodies — what Hub.astro
 *  uses instead of a hand-written card list, so a new child page under a hub
 *  slug appears automatically once its Page Map row exists. */
export async function childEntries(slug: string): Promise<{ page: PageMeta; entry: PageEntry }[]> {
  const children = childrenOf(slug);
  return Promise.all(children.map(async (page) => ({ page, entry: await entryFor(page.id) })));
}

/**
 * Resolves one frontmatter `card` entry into a render-ready CardItem. If
 * `pageId` is set, title/href/blurb default from the workbook page and can
 * still be overridden per field — content.config.ts's superRefine already
 * guarantees either pageId, or title+href, is present.
 */
export function cardFrom(item: PageData['cards'][number]): CardItem {
  if (item.pageId) {
    const p = lookupPage(item.pageId);
    return {
      title: item.title ?? p.name,
      href: item.href ?? p.slug,
      blurb: item.blurb ?? p.description,
      meta: item.meta,
      cta: item.cta,
    };
  }
  return {
    title: item.title as string,
    href: item.href as string,
    blurb: item.blurb,
    meta: item.meta,
    cta: item.cta,
  };
}

/**
 * Does this page have a body worth rendering a section for?
 *
 * Most of the site is still outlines: the MDX file exists and carries real
 * frontmatter, but the body below it is empty. Templates render their prose
 * section unconditionally, so those pages showed a heading, then a full
 * section's worth of padding wrapped around nothing, then the draft panel —
 * roughly 220px of dead space in the middle of the page. That was the single
 * largest source of emptiness on the site, and it is on every draft page.
 *
 * Checked here rather than in CSS: :empty does not match an element
 * containing whitespace, and Astro's rendered <div class="prose"> always
 * contains at least a newline, so no :has()/:empty selector can see it.
 */
export function hasBody(entry: PageEntry): boolean {
  return (entry.body ?? '').trim().length > 0;
}

/**
 * Is this body a short introduction, or a document?
 *
 * The difference decides its layout. An intro — a few paragraphs, no
 * headings — reads well as two columns with its opening line at display
 * scale. A body with its own `##` sections does not: only the first heading
 * moves into the left column and every later section stacks in the right
 * one, leaving most of a screen of empty white beside a single line. That is
 * a document, and a document runs as one column at its own measure.
 */
export function isIntro(entry: PageEntry): boolean {
  const body = entry.body ?? '';
  return !/^##\s/m.test(body) && body.trim().length > 0;
}
