const text = (name, label, widget = 'string') => ({ name, label, widget });

// Markdown body of a file. Raw HTML is not rendered on the website.
const body = (label, blockButtons, hint) => ({
  name: 'body',
  label,
  widget: 'richtext',
  modes: ['rich_text'],
  buttons: ['bold', 'italic', 'code', 'link', ...blockButtons],
  editor_components: [],
  hint,
});

const buttons = (hint) => ({
  name: 'buttons',
  label: 'Buttons',
  widget: 'list',
  required: false,
  summary: '{{fields.label}}',
  hint: `${hint} The first button is highlighted.`,
  fields: [text('label', 'Label'), text('url', 'URL')],
});

export default {
  load_config_file: false,
  locale: 'en',
  // Sveltia requires a backend descriptor to initialize the local-folder picker.
  backend: { name: 'github', repo: 'local/skedz', auth_methods: ['token'] },
  media_folder: 'src/assets',
  public_folder: '/assets',
  publish: false,
  collections: [{
    name: 'pages',
    label: 'Website pages',
    editor: { preview: false },
    files: [
      {
        name: 'index',
        label: 'Homepage',
        file: 'src/pages/index.md',
        fields: [
          text('title', 'Title'),
          text('description', 'Description'),
          text('socialTitle', 'Social title'),
          text('socialDescription', 'Social description'),
          text('heading', 'Heading'),
          text('tagline', 'Tagline', 'text'),
          buttons('Shown below the introduction.'),
          body('Introduction', []),
        ],
      },
      {
        name: 'imprint',
        label: 'Imprint',
        file: 'src/pages/imprint.md',
        fields: [
          text('title', 'Title'),
          body('Page content', ['heading-one', 'heading-two', 'bulleted-list', 'numbered-list'], 'Start with a Heading 1 (page title). Use Heading 2 for sections. Shift+Enter inserts a line break.'),
        ],
      },
      {
        name: 'privacy',
        label: 'Privacy',
        file: 'src/pages/privacy.md',
        fields: [
          text('title', 'Title'),
          body('Page content', ['heading-one', 'heading-two', 'bulleted-list', 'numbered-list'], 'Start with a Heading 1 (page title). Use Heading 2 for sections. Shift+Enter inserts a line break.'),
        ],
      },
      {
        name: 'shared',
        label: 'Shared footer',
        file: 'src/_data/shared.json',
        fields: [
          text('homeLicense', 'Homepage license text', 'text'),
          text('legalLicense', 'Legal pages license text', 'text'),
          text('hosting', 'Hosting text', 'text'),
        ],
      },
    ],
  }, {
    name: 'home',
    label: 'Homepage sections',
    label_singular: 'Section',
    folder: 'src/home',
    extension: 'md',
    format: 'frontmatter',
    create: true,
    editor: { preview: false },
    sortable_fields: { fields: ['order', 'title'], default: { field: 'order' } },
    fields: [
      text('title', 'Section title'),
      {
        name: 'order',
        label: 'Position',
        widget: 'number',
        value_type: 'int',
        hint: 'Sections are shown in ascending order.',
      },
      {
        name: 'display',
        label: 'Display as',
        widget: 'select',
        default: 'cards',
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Highlight box with buttons', value: 'highlight' },
          { label: 'Accordion', value: 'accordion' },
        ],
      },
      buttons('Only shown in a highlight box.'),
      body('Content', ['heading-three', 'bulleted-list', 'numbered-list'],
        'Each Heading 3 starts a new card or accordion item. Shift+Enter inserts a line break.'),
    ],
  }],
};
