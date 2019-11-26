var types = require('../');
var assert = require('assert');
var util = require('util');
var Walker = require('node-source-walk');

describe('module-types', function() {
  // Checks whether of not the checker succeeds on
  // a node in the AST of the given source code
  function check(code, checker, harmony) {
    var found = false;
    var walker = new Walker({
      esprimaHarmony: !!harmony
    });

    walker.walk(code, function(node) {
      // Use call to avoid .bind(types) everywhere
      if (checker.call(types, node)) {
        found = true;
        walker.stopWalking();
      }
    });

    return found;
  }

  describe('isDefine', function() {
    it('detects define function calls', function() {
      assert(check('define();', types.isDefine));
    });
  });

  describe('isRequire', function() {
    it('detects require function calls', function() {
      assert(check('require();', types.isRequire));
    });
  });

  describe('isRequire with main-scoped require ', function() {
    it('detects require function calls', function() {
      assert(check('require.main.require();', types.isRequire));
    });
  });

  describe('isTopLevelRequire', function() {
    it('detects top-level (i.e., top of file) require function calls', function() {
      assert(check('require();', types.isTopLevelRequire));
      assert(!check('var foo = 2; \nrequire([], function(){});', types.isTopLevelRequire));
      assert(check('require(["a"], function(a){});', types.isTopLevelRequire));
    });

    it('does not fail on es6', function() {
      assert.doesNotThrow(function() {
        check('import require from "mylib"; \nrequire();', types.isTopLevelRequire, true);
      });
    });
  });

  describe('isExports', function() {
    it('detects module.exports CJS style exports', function() {
      assert(check('module.exports.foo = function() {};', types.isExports));
      assert(check('module.exports = function() {};', types.isExports));
      assert(check('module.exports = {};', types.isExports));
    });

    it('detects plain exports CJS style exports', function() {
      assert(check('exports = function() {};', types.isExports));
      assert(check('exports.foo = function() {};', types.isExports));
      assert(check('exports = {};', types.isExports));
    });
  });

  describe('AMD modules', function() {
    it('detects driver scripts', function() {
      assert(check('require(["a"], function(a){});', types.isAMDDriverScriptRequire));
    });

    it('does not get confused with a commonjs require', function() {
      assert(!check('require("foo");', types.isAMDDriverScriptRequire));
    });

    it('detects named form', function() {
      assert(check('define("foobar", ["a"], function(a){});', types.isNamedForm));
    });

    it('detects dependency form modules', function() {
      assert(check('define(["a"], function(a){});', types.isDependencyForm));
    });

    it('detects factory form modules', function() {
      assert(check('define(function(require){});', types.isFactoryForm));
    });

    it('detects REM form modules', function() {
      assert(check('define(function(require, exports, module){});', types.isREMForm));
    });

    it('detects no dependency form modules', function() {
      assert(check('define({});', types.isNoDependencyForm));
    });
  });

  describe('ES6', function() {
    it('detects es6 imports', function() {
      assert(check('import {foo, bar} from "mylib";', types.isES6Import, true));
      assert(check('import * as foo from "mod.js";', types.isES6Import, true));
      assert(check('import "mylib2";', types.isES6Import, true));
      assert(check('import foo from "mod.js";', types.isES6Import, true));
      assert(check('import("foo");', types.isES6Import, true));
    });

    it('detects es6 exports', function () {
      assert(check('export default 123;', types.isES6Export, true));
      assert(check('export {foo, bar};', types.isES6Export, true));
      assert(check('export { D as default };', types.isES6Export, true));
      assert(check('export function inc() { counter++; }', types.isES6Export, true));
      assert(check('export * from "mod";', types.isES6Export, true));
    });
  });
});
