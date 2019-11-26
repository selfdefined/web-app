'use strict';

const Parser = require('@typescript-eslint/typescript-estree');
const Walker = require('node-source-walk');

/**
 * Extracts the dependencies of the supplied TypeScript module
 *
 * @param  {String|Object} src - File's content or AST
 * @return {String[]}
 */
module.exports = function(src, options = {}) {

  const walkerOptions = Object.assign({}, options, {parser: Parser});

  // Determine whether to skip "type-only" imports
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
  const skipTypeImports = Boolean(options.skipTypeImports);
  // Remove skipTypeImports option, as this option may not be recognized by the walker/parser
  delete walkerOptions.skipTypeImports;

  const walker = new Walker(walkerOptions);

  const dependencies = [];

  if (typeof src === 'undefined') {
    throw new Error('src not given');
  }

  if (src === '') {
    return dependencies;
  }

  walker.walk(src, function(node) {
    switch (node.type) {
      case 'Import':
        if (node.parent && node.parent.type === 'CallExpression' && node.parent.arguments.length) {
          dependencies.push(node.parent.arguments[0].value);
        }
        break;
      case 'ImportDeclaration':
        if (node.source && node.source.value) {
          dependencies.push(node.source.value);
        }
        break;
      case 'ExportNamedDeclaration':
      case 'ExportAllDeclaration':
        if (node.source && node.source.value) {
          dependencies.push(node.source.value);
        }
        break;
      case 'TSExternalModuleReference':
        if (node.expression && node.expression.value) {
          dependencies.push(node.expression.value);
        }
        break;
      case 'TSImportType':
        if (!skipTypeImports && node.parameter.type === 'TSLiteralType') {
          dependencies.push(node.parameter.literal.value);
        }
        break;
      default:
        return;
    }
  });

  return dependencies;
};

module.exports.tsx = function(src, options = {jsx: true}) {
  return module.exports(src, options);
};
