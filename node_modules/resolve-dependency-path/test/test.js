var assert = require('assert');
var resolvePath = require('../');
var path = require('path');

describe('resolve-dependency-path', function() {
  it('resolves with absolute paths', function() {
    var resolved = resolvePath({
      dependency: './bar',
      filename: __dirname + '/foo.js',
      directory: __dirname
    });
    assert(resolved.indexOf(__dirname) === 0);
  });

  it('resolves w/initial period, w/ending in .js', function() {
    var depPath = './index';
    var filename = __dirname + '/foo.js';
    var directory = __dirname;
    var resolved = resolvePath({
      dependency: depPath,
      filename,
      directory
    });
    assert(resolved === __dirname + '/index.js');
  });

  it('resolves w/initial period, w/o ending in .js', function() {
    var depPath = './index.js';
    var filename = __dirname + '/foo.js';
    var directory = __dirname;
    var resolved = resolvePath({
      dependency: depPath,
      filename,
      directory
    });
    assert(resolved === __dirname + '/index.js');
  });

  it('resolves w/o initial period, w/o ending in .js', function() {
    var depPath = 'index';
    var filename = __dirname + '/foo.js';
    var directory = __dirname;
    var resolved = resolvePath({
      dependency: depPath,
      filename,
      directory
    });
    assert(resolved === __dirname + '/index.js');
  });

  it('resolves w/o initial period, w/ending in .js', function() {
    var depPath = 'index.js';
    var filename = __dirname + '/foo.js';
    var directory = __dirname;
    var resolved = resolvePath({
      dependency: depPath,
      filename,
      directory
    });
    assert(resolved === __dirname + '/index.js');
  });

  it('resolves relative paths', function() {
    var resolved = resolvePath({
      dependency: './bar',
      filename: __dirname + '/foo.js',
      directory: __dirname
    });
    assert(resolved === __dirname + '/bar.js');
  });

  it('resolves non-relative paths', function() {
    var filename = __dirname + '/feature1/foo.js';
    var resolved = resolvePath({
      dependency: 'feature2/bar',
      filename,
      directory: __dirname
    });
    assert(resolved === __dirname + '/feature2/bar.js');
  });

  it('throws if the dependency path is missing', function() {
    assert.throws(function() {
      resolvePath();
    });
  });

  it('throws if the filename is missing', function() {
    assert.throws(function() {
      resolvePath({
        dependency: './bar'
      });
    });
  });

  it('throws if the directory is missing', function() {
    assert.throws(function() {
      resolvePath({
        dependency: './bar',
        filename: __dirname + '/foo.js'
      });
    });
  });

  describe('multiple period filenames', function() {
    it('resolves with multiple periods in the dependency path', function() {
      var depPath = './bar.baz.qux';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert(resolved === __dirname + '/bar.baz.qux.js');
    });

    it('does not duplicate extensions', function() {
      var depPath = '../index.js';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      // Extension after removing the .js extension
      var remainingExt = path.extname(path.basename(resolved, '.js'));
      assert.equal(remainingExt, '');
    });

    it('does not add the incorrect extension for sass files', function() {
      var depPath = 'styles';
      var filename = __dirname + '/foo.scss';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert.equal(path.extname(resolved), '.scss');
    });

    it('does not add the incorrect extension for mustache files', function() {
      var depPath = 'hgn!templates/foo.mustache';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert.equal(path.extname(resolved), '.mustache');
    });
  });

  describe('implicit jspm/systemjs style plugins', function() {
    it('resolve w/initial period', function() {
      var depPath = './templates/file.css!';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert.equal(path.extname(resolved), '.css');
    });

    it('resolve w/o initial period', function() {
      var depPath = 'templates/file.css!';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert.equal(path.extname(resolved), '.css');
    });
  });

  describe('explicit jspm/systemjs style plugins', function() {
    it('resolve w/initial period', function() {
      var depPath = './templates/file.txt!text';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert.equal(path.extname(resolved), '.txt');
    });

    it('resolve w/o initial period', function() {
      var depPath = 'templates/file.txt!text';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert.equal(path.extname(resolved), '.txt');
    });
  });

  describe('webpack support', function() {
    it.skip('resolves properly', function() {
      var depPath = './styles/foo.css';
      var filename = __dirname + '/foo.js';
      var directory = __dirname;
      var resolved = resolvePath({
        dependency: depPath,
        filename,
        directory
      });
      assert.equal(path.extname(resolved), '.css');
    });
  });
});
