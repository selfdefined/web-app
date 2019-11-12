module.exports = function (config) {
  // Add a filter using the Config API
  config.addFilter('linkTarget', (slug) => `#${slug}`);

  config.addFilter('postInspect', function (post) {
    console.log(post);

  })

  config.addPassthroughCopy({'_site/css/': 'assets/css/'})

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

  config.addCollection('definedDefinitions', collection => {
    return [
      ...collection
        .getFilteredByGlob('./11ty/definitions/*.md')
        .filter(word => word.data.defined)
        .sort((a, b) => {
          // `toLowerCase()` is just a safety measure, slugs should be lower case anyway
          // `localeCompare()` is super cool: http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
          return a.data.slug.toLowerCase().localeCompare(b.data.slug.toLowerCase())
        })]
  })

  // You can return your Config object (optional).
  return {
    dir: {
      input: '11ty',
      output: 'dist'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
