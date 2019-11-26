/**
 * Extract the @import/@require statements from a given stylus file's content
 *
 * @param  {String} fileContent
 * @return {String[]}
 */
module.exports = function(fileContent) {
  if (typeof fileContent === 'undefined') { throw new Error('content not given'); }
  if (typeof fileContent !== 'string') { throw new Error('content is not a string'); }

  var dependencies = [];
  var importRegex = /\@(import|require)\s['"](.*)['"](\.styl)?/g;

  var matches;

  do {
    matches = importRegex.exec(fileContent);

    if (matches) {
      dependencies.push(matches[2]);
    }

  } while (matches);

  return dependencies;
};
