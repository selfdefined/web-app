'use strict';

const Walker = require('node-source-walk');
const types = require('ast-module-types');
const escodegen = require('escodegen');
const getModuleType = require('get-amd-module-type');

/**
 * @param  {String} src - the string content or AST of an AMD module
 * @param  {Object} [options]
 * @param  {Object} [options.skipLazyLoaded] - whether or not to omit inner (non-REM) required dependencies
 * @return {String[]} List of partials/dependencies referenced in the given file
 */
module.exports = function(src, options = {}) {
  let dependencies = [];
  const walker = new Walker();

  if (typeof src === 'undefined') { throw new Error('src not given'); }
  if (src === '') { return dependencies; }

  walker.walk(src, function(node) {
    if (!types.isTopLevelRequire(node) &&
        !types.isDefine(node) &&
        !types.isRequire(node)) {
      return;
    }

    const type = getModuleType.fromAST(node);

    if (!types.isTopLevelRequire(node) && types.isRequire(node) && type !== 'rem' && options.skipLazyLoaded) {
      return;
    }

    const deps = getDependencies(node, type, options);

    if (deps.length) {
      dependencies = dependencies.concat(deps);
    }
  });

  // Avoid duplicates
  return dependencies.filter(function(dep, idx) {
    return dependencies.indexOf(dep) === idx;
  });
};

/**
 * @param   {Object} node - AST node
 * @param   {String} type - sniffed type of the module
 * @param   {Object} options - detective configuration
 * @returns {String[]} A list of file dependencies or an empty list if the type is unsupported
 */
function getDependencies(node, type, options) {
  // Note: No need to handle nodeps since there won't be any dependencies
  switch (type) {
    case 'named':
      var args = node.arguments || [];
      return getElementValues(args[1]).concat(options.skipLazyLoaded ? [] : getLazyLoadedDeps(node));
    case 'deps':
    case 'driver':
      var args = node.arguments || [];
      return getElementValues(args[0]).concat(options.skipLazyLoaded ? [] : getLazyLoadedDeps(node));
    case 'factory':
    case 'rem':
      // REM inner requires aren't really "lazy loaded," but the form is the same
      return getLazyLoadedDeps(node);
  }

  return [];
}

/**
 * Looks for dynamic module loading
 *
 * @param  {AST} node
 * @return {String[]} List of dynamically required dependencies
 */
function getLazyLoadedDeps(node) {
  // Use logic from node-detective to find require calls
  const walker = new Walker();
  let dependencies = [];

  walker.traverse(node, function(innerNode) {
    if (types.isRequire(innerNode)) {
      const requireArgs = innerNode.arguments;

      if (!requireArgs.length) { return; }

      // Either require('x') or require(['x'])
      const deps = requireArgs[0];

      if (deps.type === 'ArrayExpression') {
        dependencies = dependencies.concat(getElementValues(deps));
      } else {
        dependencies.push(getEvaluatedValue(deps));
      }
    }
  });

  return dependencies;
}

/**
 * @param {Object} nodeArguments
 * @returns {String[]} the literal values from the passed array
 */
function getElementValues(nodeArguments) {
  const elements = nodeArguments.elements || [];

  return elements.map(function(el) {
    return getEvaluatedValue(el);
  }).filter(Boolean);
}

/**
 * @param {AST} node
 * @returns {String} the statement represented by AST node
 */
function getEvaluatedValue(node) {
  if (node.type === 'Literal' || node.type === 'StringLiteral') { return node.value; }
  if (node.type === 'CallExpression') { return ''; }
  return escodegen.generate(node);
}
