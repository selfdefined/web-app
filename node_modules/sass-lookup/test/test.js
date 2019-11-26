'use strict';

const assert = require('assert');
const mock = require('mock-fs');
const lookup = require('../');

describe('sass-lookup', function() {
  beforeEach(function() {
    mock({
      example: {
        '_foo.scss': 'body { color: purple; }',
        'baz.scss': '@import "_foo";',
        'styles.scss': '@import "_foo";\n@import "baz.scss";',
        stylesUnderscore: '@import "foo";',

        nested: {
          'styles.scss': '@import "a/b/b3";\n@import "a/b/b2";',
          a: {
            'a.scss': '@import "../styles";',
            b: {
              '_b3.scss': '',
              'b.scss': '@import "../../styles";\n@import "../a";',
              'b2.scss': '@import "b";\n@import "b3";'
            }
          }
        }
      }
    });
  });

  afterEach(mock.restore);

  it('throws if dependency is not supplied', function() {
    assert.throws(() => lookup({
      filename: 'example/baz.scss',
      directory: 'example'
    }));
  });

  it('throws if filename is not supplied', function() {
    assert.throws(() => lookup({
      dependency: '_foo',
      directory: 'example'
    }));
  });

  it('throws if directory is not supplied', function() {
    assert.throws(() => lookup({
      dependency: '_foo',
      filename: 'example/baz.scss',
    }));
  });

  it('handles partials with underscored files', function() {
    assert.equal(lookup({
      dependency: '_foo',
      filename: 'example/baz.scss',
      directory: 'example'
    }),
      process.cwd() + '/example/_foo.scss');
  });

  it('handles partials with an extension', function() {
    assert.equal(lookup({
      dependency: 'baz.scss',
      filename: 'example/styles.scss',
      directory: 'example'
    }),
      process.cwd() + '/example/baz.scss');
  });

  describe('deeply nested paths', function() {
    it('handles underscored partials', function() {
      assert.equal(lookup({
        dependency: 'a/b/b3',
        filename: 'example/nested/styles.scss',
        directory: 'example'
      }),
        process.cwd() + '/example/nested/a/b/_b3.scss');
    });

    it('handles non-underscored partials', function() {
      assert.equal(lookup({
        dependency: 'a/b/b2',
        filename: 'example/nested/styles.scss',
        directory: 'example'
      }),
        process.cwd() + '/example/nested/a/b/b2.scss');
    });
  });

  describe('relative partials', function() {
    it('handles one level up', function() {
      assert.equal(lookup({
        dependency: '../a',
        filename: 'example/nested/a/b/b.scss',
        directory: 'example'
      }),
        process.cwd() + '/example/nested/a/a.scss');
    });

    it('handles more than one level up', function() {
      assert.equal(lookup({
        dependency: '../../styles',
        filename: 'example/nested/a/b/b.scss',
        directory: 'example'
      }),
        process.cwd() + '/example/nested/styles.scss');
    });
  });

  describe('partials within the same subdirectory', function() {
    it('handles non-underscored partials', function() {
      assert.equal(lookup({
        dependency: 'b',
        filename: 'example/nested/a/b/b2.scss',
        directory: 'example'
      }),
        process.cwd() + '/example/nested/a/b/b.scss');
    });

    it('handles underscored partials', function() {
      assert.equal(lookup({
        dependency: 'b3',
        filename: 'example/nested/a/b/b2.scss',
        directory: 'example'
      }),
        process.cwd() + '/example/nested/a/b/_b3.scss');
    });
  });

  describe('multiple directories', function() {
    it('handles partials in middle directory', function() {
      var directories = ['example', 'example/nested/a/b', 'example/a'];
      assert.equal(lookup({
        dependency: 'b',
        filename: 'b2.scss',
        directory: directories,
      }),
        process.cwd() + '/example/nested/a/b/b.scss');
    });

    it('partial in last directory of list', function() {
      var directories = ['example', 'example/nested/a/b'];
      assert.equal(lookup({
        dependency: 'b',
        filename: 'b2.scss',
        directory: directories,
      }),
        process.cwd() + '/example/nested/a/b/b.scss');
    });

    it('non-partial in last directory when given list', function() {
      var directories = ['example', 'example/nested/a/b'];
      assert.equal(lookup({
        dependency: 'b2',
        filename: 'b3.scss',
        directory: directories,
      }),
        process.cwd() + '/example/nested/a/b/b2.scss');
    });

    it('handles underscored partials', function() {
      var directories = ['example', 'example/nested/a/b'];
      assert.equal(lookup({
        dependency: 'b2',
        filename: 'b3.scss',
        directory: directories
      }),
        process.cwd() + '/example/nested/a/b/b2.scss');
    });
  });
});
