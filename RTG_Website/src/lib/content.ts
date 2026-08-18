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
