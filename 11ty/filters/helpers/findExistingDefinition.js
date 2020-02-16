module.exports = (word, collection) =>
  collection.find((item) => item.data.title === word);
