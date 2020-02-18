module.exports = function findDefinitionContentNextItems({ slug }, collection) {
  let previous = [];
  let next = [];

  if (!slug) throw new Error('E_NO_SLUG');

  const index = collection.findIndex((def) => def.slug === slug);

  if (index > 0) {
    // a negative start index would start searching at the end of the array
    // stop at zero to avoid this
    const start = Math.max(0, index - 3);
    // never get more than three items
    const end = start + Math.min(index, 3);

    previous = collection.slice(start, end);
  }

  if (index < collection.length - 1) {
    const start = index + 1;
    // end overflow doesn't matter too much, cap it still because it feels right
    const end = Math.min(start + 3, collection.length);

    next = collection.slice(start, end);
  }

  return { previous, next };
};
