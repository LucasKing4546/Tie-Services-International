/**
 * Components every MDX body gets without an import. Passed as
 * `<Content components={mdxComponents} />` by every template. This is the
 * mechanism that keeps two rules real rather than aspirational:
 *   - no MDX file ever hardcodes a PROOF figure (use <Fig>)
 *   - no MDX file ever contains raw HTML for a spec table, note, quote,
 *     tag list or "RTG to supply" marker (use the matching component)
 */
import Gap from '@components/blocks/Gap.astro';
import Fig from '@components/blocks/Fig.astro';
import Note from '@components/blocks/Note.astro';
import SpecTable from '@components/blocks/SpecTable.astro';
import TagList from '@components/blocks/TagList.astro';
import ImageSlot from '@components/blocks/ImageSlot.astro';
import Quote from '@components/blocks/Quote.astro';

export const mdxComponents = {
  Gap,
  Fig,
  Note,
  SpecTable,
  TagList,
  ImageSlot,
  Quote,
};
