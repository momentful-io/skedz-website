import MarkdownIt from 'markdown-it';

export default function (config) {
  const markdown = new MarkdownIt();
  config.setLibrary('md', markdown);
  config.addFilter('inlineMarkdown', (value) => markdown.renderInline(value ?? ''));

  // Homepage sections (src/home/*.md), shown in ascending `order`.
  config.addCollection('homeSections', (collections) =>
    collections.getFilteredByGlob('src/home/*.md').sort((a, b) => a.data.order - b.data.order),
  );

  // Splits rendered Markdown into blocks that each start at a `###` heading (cards, accordion items).
  // Raw HTML is disabled in Markdown, so every <h3> comes from a Markdown heading.
  config.addFilter('headingBlocks', (html) =>
    (html ?? '').split(/(?=<h3>)/).filter((part) => part.trim()).map((part) => {
      const match = /^<h3>([\s\S]*?)<\/h3>\s*/.exec(part);
      return match
        ? { heading: match[1], body: part.slice(match[0].length) }
        : { heading: '', body: part };
    }),
  );

  for (const file of ['assets', 'css', 'favicon.ico', 'site.webmanifest']) {
    config.addPassthroughCopy('src/' + file);
  }

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    // Markdown examples and CMS content must not be interpreted as Nunjucks.
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
  };
}
