import { basename } from 'node:path';

export default {
  layout: 'base.njk',
  // The homepage renders src/home/*.md; this makes Eleventy render those first.
  eleventyImport: { collections: ['homeSections'] },
  eleventyComputed: {
    pageKey: ({ page }) => basename(page.filePathStem),
    permalink: ({ pageKey }) => `/${pageKey}.html`,
  },
};
