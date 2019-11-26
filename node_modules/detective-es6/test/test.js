'use strict';

const assert = require('assert');
const detective = require('../');

describe('detective-es6', function() {
  const ast = {
    type: 'Program',
    body: [{
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
            type: 'Identifier',
            name: 'x'
        },
        init: {
            type: 'Literal',
            value: 4,
            raw: '4'
        }
      }],
      kind: 'let'
    }]
  };

  it('accepts an ast', function() {
    const deps = detective(ast);
    assert(!deps.length);
  });

  it('retrieves the dependencies of es6 modules', function() {
    const deps = detective('import {foo, bar} from "mylib";');
    assert(deps.length === 1);
    assert(deps[0] === 'mylib');
  });

  it('retrieves the re-export dependencies of es6 modules', function() {
    const deps = detective('export {foo, bar} from "mylib";');
    assert(deps.length === 1);
    assert(deps[0] === 'mylib');
  });

  it('retrieves the re-export * dependencies of es6 modules', function() {
    const deps = detective('export * from "mylib";');
    assert(deps.length === 1);
    assert(deps[0] === 'mylib');
  });

  it('handles multiple imports', function() {
    const deps = detective('import {foo, bar} from "mylib";\nimport "mylib2"');

    assert(deps.length === 2);
    assert(deps[0] === 'mylib');
    assert(deps[1] === 'mylib2');
  });

  it('handles default imports', function() {
    const deps = detective('import foo from "foo";');

    assert(deps.length === 1);
    assert(deps[0] === 'foo');
  });

  it('handles dynamic imports', function() {
    const deps = detective('import("foo").then(foo => foo());');

    assert(deps.length === 1);
    assert(deps[0] === 'foo');
  })

  it('returns an empty list for non-es6 modules', function() {
    const deps = detective('var foo = require("foo");');
    assert(!deps.length);
  });

  it('returns an empty list for empty files', function() {
    const deps = detective('');
    assert.equal(deps.length, 0);
  });

  it('throws when content is not provided', function() {
    assert.throws(function() {
      detective();
    }, Error, 'src not given');
  });

  it('does not throw with jsx in a module', function() {
    assert.doesNotThrow(function() {
      detective('import foo from \'foo\'; var templ = <jsx />;');
    });
  });

  it('does not throw on an async ES7 function', function() {
    assert.doesNotThrow(function() {
      detective('import foo from \'foo\'; export default async function foo() {}');
    });
  });

  it('respects settings for type imports', function() {
    const source = 'import type {foo} from "mylib";';
    const depsWithTypes = detective(source);
    const depsWithoutTypes = detective(source, {skipTypeImports: true});
    assert.deepEqual(depsWithTypes, ['mylib']);
    assert.deepEqual(depsWithoutTypes, []);
  });
});
