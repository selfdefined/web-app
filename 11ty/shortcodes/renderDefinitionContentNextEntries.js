const definitionPermalink = require('../helpers/definitionPermalink');
const findDefinitionContentNextItems = require('../helpers/findDefinitionContentNextItems');

const makeListItem = (item) =>
  `<li><a href=${definitionPermalink(item.slug)}>${item.title}</a></li>`;

module.exports = function definitionContentNextEntries(
  title,
  slug,
  collection
) {
  if (!title) throw new Error('E_NO_TITLE');
  if (!slug) throw new Error('E_NO_SLUG');
  if (!collection) throw new Error('E_NO_COLLECTION');

  const entry = { title, slug };

  const { next, previous } = findDefinitionContentNextItems(entry, collection);

  return `<section class="definition-navigation definition__further-definitions_nav" aria-label="Browse definitions">
    <h2 class="definition-navigation__headline">Browse</h2>
    <div><h3 class="definition-navigation__sub-headline" id="context-nav-previous">Previous words</h3>
      <nav class="definition-navigation__nav" aria-labelledby="context-nav-previous">
        ${
          previous.length
            ? `<ul class="definition-navigation__list">${previous
                .map((item) => makeListItem(item))
                .join('')}</ul>`
            : ''
        }</nav>
    </div>
    <div><h3 class="definition-navigation__sub-headline" id="context-nav-next">Next words</h3>
      <nav class="definition-navigation__nav" aria-labelledby="context-nav-next">${
        next.length
          ? `<ul class="definition-navigation__list">${next
              .map((item) => makeListItem(item))
              .join('')}</ul>`
          : ''
      }</nav>
    </div>
    </section>`;
};
