'use strict';

const Walker  = require('node-source-walk');
const types   = require('ast-module-types');
const fs      = require('fs');

/**
 * Determines the type of the module from the supplied source code or AST
 *
 * @param  {String|Object} source - The string content or AST of a file
 * @return {String}
 */
function fromSource(source) {
  if (typeof source === 'undefined') {
    throw new Error('source not supplied');
  }

  const walker = new Walker();
  let type = 'none';
  let hasDefine = false;
  let hasAMDTopLevelRequire = false;
  let hasRequire = false;
  let hasExports = false;
  let hasES6Import = false;
  let hasES6Export = false;

  // Walker accepts as AST to avoid reparsing
  walker.walk(source, function(node) {
    if (types.isDefine(node)) {
      hasDefine = true;
    }

    if (types.isRequire(node)) {
      hasRequire = true;
    }

    if (types.isExports(node)) {
      hasExports = true;
    }

    if (types.isAMDDriverScriptRequire(node)) {
      hasAMDTopLevelRequire = true;
    }

    if (types.isES6Import(node)) {
      hasES6Import = true;
    }

    if (types.isES6Export(node)) {
      hasES6Export = true;
    }

    if (hasES6Import || hasES6Export) {
      type = 'es6';
      walker.stopWalking();
      return;
    }

    if (hasDefine || hasAMDTopLevelRequire) {
      type = 'amd';
      walker.stopWalking();
      return;
    }

    if (hasExports || (hasRequire && !hasDefine)) {
      type = 'commonjs';
      walker.stopWalking();
      return;
    }
  });

  return type;
}

/**
 * Synchronously determine the module type for the contents of the passed filepath
 *
 * @param  {String} file
 * @param  {Object} options
 * @return {String}
 */
function sync(file, options) {
  if (!file) {
    throw new Error('filename missing');
  }
  var fileSystem = options ? (options.fileSystem || fs) : fs;
  const data = fileSystem.readFileSync(file, 'utf8');
  return fromSource(data.toString());
}

/**
 * Asynchronously determines the module type for the contents of the given filepath
 *
 * @param  {String}   filepath
 * @param  {Function} cb - Executed with (err, type)
 */
module.exports = function(filepath, cb, options) {
  if (!filepath) {
    throw new Error('filename missing');
  }

  if (!cb) {
    throw new Error('callback missing');
  }

  const opts = {encoding: 'utf8'};
  var fileSystem = options ? (options.fileSystem || fs) : fs;

  fileSystem.readFile(filepath, opts, function(err, data) {
    if (err) {
      return cb(err);
    }

    let type;

    try {
      type = fromSource(data);
    } catch (error) {
      return cb(error);
    }

    cb(null, type);
  });
};

module.exports.sync = sync;
module.exports.fromSource = fromSource;
