const lunr = require('lunr');
const { default: axios } = require('axios');

exports.handler = async function({ queryStringParameters }, _, callback) {
  try {
    if (!queryStringParameters) {
      callback(new Error('missing query string parameter "q"'));
    }

    const { data: definitions } = await axios.get(
      'https://deploy-preview-213--selfdefined.netlify.app/search-data.json'
    );

    // create a map based on title for faster retrieval in search results
    const definitionMap = definitions.reduce((map, definition) => {
      map[definition.title] = definition;
      return map;
    }, {});

    // create the full text search
    const idx = lunr(function() {
      this.ref('title');
      this.field('title');
      this.field('subterms');
      this.field('content');

      // load definitions into lunr index
      for (const definition in definitions) {
        this.add(definitions[definition]);
      }
    });

    const matches = idx.search(queryStringParameters.q);
    const results = matches.map((match) => definitionMap[match.ref]);

    callback(null, {
      body: JSON.stringify(results),
      statusCode: 200
    });
  } catch (error) {
    console.log(error);
    callback(error);
  }
};
