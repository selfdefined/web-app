#!/usr/bin/env node

'use strict';

var precinct = require('../');
var program = require('commander');
var fs = require('fs');

program
  .version(require('../package.json').version)
  .usage('[options] <filename>')
  .option('--es6-mixedImports')
  .option('-t, --type <type>', 'The type of content being passed in. Useful if you want to use a non-js detective')
  .parse(process.argv);

var content = fs.readFileSync(program.args[0], 'utf8');

var options = {
  es6: {}
};

if (program['es6MixedImports']) {
  options.es6.mixedImports = true;
}

if (program.type) {
  options.type = program.type;
}

console.log(precinct(content, options));
