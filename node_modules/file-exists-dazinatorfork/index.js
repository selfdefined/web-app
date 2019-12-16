const fs = require('fs')
const path = require('path')

function fileExists (filepath, options, done) {
  if (typeof options === 'function') {
    done = options
    options = {}
  }

  var fileSystem = fs;
  if(options && options.fileSystem)
  {
    fileSystem = options.fileSystem
  }
  
  if (!done) {
    return new Promise((resolve, reject) => {
      fileSystem.stat(fullPath(filepath, options), (err, stats) => {
        if (err) {
          return err.code === 'ENOENT'
            ? resolve(false)
            : reject(err)
        }
        resolve(stats.isFile())
      })
    })
  }

  fileSystem.stat(fullPath(filepath, options), (err, stats) => {
    if (err) {
      return err.code === 'ENOENT'
        ? done(null, false)
        : done(err)
    }

    done(null, stats.isFile())
  })
}

fileExists.sync = function fileExistsSync (filepath, options) {
  const _filepath = filepath || '';
  const _options = options || {};
  try {
    var fileSystem = _options.fileSystem || fs;
    return fileSystem.statSync(fullPath(_filepath, _options)).isFile()
  }
  catch (e) {
    // Check exception. If ENOENT - no such file or directory ok, file doesn't exist.
    // Otherwise something else went wrong, we don't have rights to access the file, ...
    if (e.code != 'ENOENT') {
      throw e
    }

    return false
  }
}

function fullPath (filepath, options) {
  const _options = options || {};
  const root = _options.root;
  return (root) ? path.join(root, filepath) : filepath
}

module.exports = fileExists
