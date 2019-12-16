var detective = require('../');
var assert = require('assert');

describe('detective-stylus', function() {
  function hasDependencies(source, expected) {
    var deps = detective(source);
    assert.deepEqual(deps, expected);
  }

  it('returns the dependencies of Stylus @import statements', function() {
    hasDependencies('@import "_foo.styl"', ['_foo.styl']);
    hasDependencies('@import "_foo"', ['_foo']);
    hasDependencies('body { color: blue } @import "_foo"', ['_foo']);
    hasDependencies('@import "bar"', ['bar']);
    hasDependencies('@import "_foo.styl";\n@import "_bar.styl"', ['_foo.styl', '_bar.styl']);
    hasDependencies('@import "_foo.styl"\n@import "_bar.styl"\n@import "_baz"\n@import "_buttons"', ['_foo.styl', '_bar.styl', '_baz', '_buttons']);
  });

  it('returns the dependencies of Stylus @require statements', function() {
    hasDependencies('@require \'bar\';', ['bar']);
    hasDependencies('@require \'bar.styl\';', ['bar.styl']);
  });

  it('does not throw for empty files', function() {
    assert.doesNotThrow(function() {
      detective('');
    });
  });
});
