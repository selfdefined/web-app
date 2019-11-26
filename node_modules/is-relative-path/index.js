var util = require('util');

/**
 * @param  {String}  filename
 * @return {Boolean}
 */
module.exports = function (filename) {
  if (typeof filename !== 'string') {
    throw new TypeError('Path must be a string. Received ' + util.inspect(filename));
  }

  return filename[0] === '.';
};
