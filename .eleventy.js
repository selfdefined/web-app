module.exports = function (config) {
  // Add a filter using the Config API
  // config.addFilter("myFilter", function () { });

  // Add collections here
  config.addCollection('definitions', collection => {
    return [
      ...collection
        .getFilteredByGlob('./11ty/definitions/*.md')
        .sort((a, b) => {
          // `toLowerCase()` is just a safety measure, slugs should be lower case anyway
          // `localeCompare()` is super cool: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
          return a.data.slug.toLowerCase().localeCompare(b.data.slug.toLowerCase())
        })]
  })

  // You can return your Config object (optional).
  return {
    dir: {
      input: "11ty",
      output: "dist"
    }
  };
};
