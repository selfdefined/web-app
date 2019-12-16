'use strict';

const path = require('path');
const fs = require('fs');
const debug = require('debug')('stylus-lookup');

/**
 * Determines the resolved dependency path according to
 * the Stylus compiler's dependency lookup behavior
 *
 * @param  {Object} options
 * @param  {String} options.dependency - the import name
 * @param  {String} options.filename - the file containing the import
 * @param  {String} options.directory - the location of all stylus files
 * @return {String}
 */
module.exports = function({dependency: dep, filename, directory} = {}) {
  if (typeof dep === 'undefined') {
    throw new Error('dependency is not supplied');
  }
  if (typeof filename === 'undefined') {
    throw new Error('filename is not supplied');
  }
  if (typeof directory === 'undefined') {
    throw new Error('directory is not supplied');
  }

  const fileDir = path.dirname(filename);

  debug('trying to resolve: ' + dep);
  debug('filename: ', filename);
  debug('directory: ', directory);

  // Use the file's extension if necessary
  const ext = path.extname(dep) ? '' : path.extname(filename);
  let resolved;

  if (!path.isAbsolute(dep)) {
    resolved = path.resolve(filename, dep) + ext;

    debug('resolved relative dependency: ' + resolved);

    if (fs.existsSync(resolved)) {
      return resolved;
    } else {
      debug('resolved file does not exist');
    }
  }

  const samedir = path.resolve(fileDir, dep) + ext;
  debug('resolving dep about the parent file\'s directory: ' + samedir);

  if (fs.existsSync(samedir)) {
    return samedir;
  } else {
    debug('resolved file does not exist');
  }

  // Check for dep/index.styl file
  const indexFile = path.join(path.resolve(fileDir, dep), 'index.styl');
  debug('resolving dep as if it points to an index.styl file: ' + indexFile);

  if (fs.existsSync(indexFile)) {
    return indexFile;
  } else {
    debug('resolved file does not exist');
  }

  debug('could not resolve the dependency');
  return '';
};
