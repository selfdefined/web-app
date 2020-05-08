module.exports = function findDefinitionContentNextItems({ slug }, collection) {
  if (!slug) throw new Error('E_NO_SLUG');

  let previous = [];
  let next = [];

  const flattenedCollection = collection.map((d) => d.data);
  const index = flattenedCollection.findIndex((def) => def.slug === slug);

  // make this a no-op if we are at the beginning
  if (index > 0) {
    // a negative start index would start searching at the end of the array
    // stop at zero to avoid this
    const start = Math.max(0, index - 3);
    // never get more than three items
    const end = start + Math.min(index, 3);

    previous = flattenedCollection.slice(start, end);
  }

  // make this a no-op if we are at the end
  if (index < collection.length - 1) {
    const start = index + 1;
    // end overflow doesn't matter too much, cap it still because it feels right
    const end = Math.min(start + 3, collection.length);

    next = flattenedCollection.slice(start, end);
  }

  return { previous, next };
};
