var assert = require('assert');
var isRelative = require('../');

describe('is-relative-path', function () {
  it('returns true if the given path is relative', function () {
    assert.ok(isRelative('../'));
    assert.ok(isRelative('../foo.js'));
    assert.ok(isRelative('../../foo.js'));
    assert.ok(isRelative('./foo.js'));
    assert.ok(isRelative('./foo'));
    assert.ok(isRelative('./'));
    assert.ok(isRelative('../../../../'));
  });

  it('returns false if the given path is not relative', function () {
    assert.ok(!isRelative('/'));
    assert.ok(!isRelative('/foo.js'));
    assert.ok(!isRelative('foo.js'));
    assert.ok(!isRelative('foo'));
    assert.ok(!isRelative('foo/bar/car/baz.js'));
  });

  it('throws TypeError if the given path is not a string', function () {
    assert.throws(isRelative.bind(null, undefined), TypeError);
    assert.throws(isRelative.bind(null, null), TypeError);
    assert.throws(isRelative.bind(null, false), TypeError);
    assert.throws(isRelative.bind(null, true), TypeError);
    assert.throws(isRelative.bind(null, 0), TypeError);
    assert.throws(isRelative.bind(null, 1), TypeError);
    assert.throws(isRelative.bind(null, []), TypeError);
    assert.throws(isRelative.bind(null, {}), TypeError);
  });
});
