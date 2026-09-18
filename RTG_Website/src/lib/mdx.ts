/**
 * Components every MDX body gets without an import, via
 * `<Content components={mdxComponents} />` in every template. Keeps two
 * rules enforceable: no MDX file hardcodes a PROOF figure (use <Fig>), and
 * none contains raw HTML for a spec table, note, quote, tag list or
 * "RTG to supply" marker (use the matching component instead).
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
