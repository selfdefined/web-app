const definitionPermalink = require('../helpers/definitionPermalink');
const findDefinitionContentNextItems = require('../helpers/findDefinitionContentNextItems');

const makeListItem = (item) =>
  `<li><a href=${definitionPermalink(item.slug)}>${item.title}</a></li>`;

module.exports = function definitionContentNextEntries(entry, collection) {
  if (!entry) throw new Error('E_NO_ENTRY');
  if (!collection) throw new Error('E_NO_COLLECTION');

  const { next, previous } = findDefinitionContentNextItems(entry, collection);

  return `<section class="definition-navigation definition-content__nav" aria-label="Browse definitions">
    <nav class="definition-navigation" aria-label="Previous words">${
      previous.length
        ? `<ul class="definition-navigation__list">${previous
            .map((item) => makeListItem(item))
            .join('')}</ul>`
        : ''
    }</nav>
    <nav class="definition-navigation" aria-label="Next words">${
      next.length
        ? `<ul class="definition-navigation__list">${next
            .map((item) => makeListItem(item))
            .join('')}</ul>`
        : ''
    }</nav>
    </section>`;
};
