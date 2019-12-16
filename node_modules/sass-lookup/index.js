'use strict';

const path = require('path');
const fs = require('fs');

function findDependency(searchDir, depName) {
  var nonPartialPath = path.resolve(searchDir, depName);
  if (fs.existsSync(nonPartialPath)) {
    return nonPartialPath;
  }

  var partialsPath = path.resolve(searchDir, '_' + depName);
  if (fs.existsSync(partialsPath)) {
    return partialsPath;
  }
}

/**
 * Determines the resolved dependency path according to
 * the Sass compiler's dependency lookup behavior
 *
 * @param {Object} options
 * @param  {String} options.dep - the import name
 * @param  {String} options.filename - the file containing the import
 * @param  {String|Array<String>} options.directory - the location(s) of all sass files
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

  // Use the file's extension if necessary
  const ext = path.extname(dep) ? '' : path.extname(filename);

  if (!path.isAbsolute(dep)) {
    const sassDep = path.resolve(filename, dep) + ext;

    if (fs.existsSync(sassDep)) { return sassDep; }
  }

  // path.basename in case the dep is slashed: a/b/c should be a/b/_c.scss
  const isSlashed = dep.indexOf('/') !== -1;
  const depDir = isSlashed ? path.dirname(dep) : '';
  const depName = (isSlashed ? path.basename(dep) : dep) + ext;

  const relativeToFile = findDependency(path.resolve(fileDir, depDir), depName);
  if (relativeToFile) {
    return relativeToFile;
  }

  const directories = typeof directory === 'string' ? [directory] : directory;

  let i;
  for (i in directories) {
    const dir = directories[i];
    const relativeToDir = findDependency(path.resolve(dir, depDir), depName);
    if (relativeToDir) {
      return relativeToDir;
    }
  }

  // old versions returned a static path, if one could not be found
  // do the same, if `directory` is not an array
  if (typeof directory === 'string') {
    return path.resolve(directory, depDir, depName);
  }
};
