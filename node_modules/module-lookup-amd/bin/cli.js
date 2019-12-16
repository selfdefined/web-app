#!/usr/bin/env node

'use strict';

const lookup = require('../');

const program = require('commander');

program
  .version(require('../package.json').version)
  .usage('[options] <path>')
  .option('-c, --config <path>', 'location of a RequireJS config file for AMD')
  .option('-f, --filename <path>', 'file containing the dependency')
  .option('-d, --directory <path>', 'directory containing all files')
  .parse(process.argv);

const config = program.config;
const filename = program.filename;
const partial = program.args[0];

console.log(lookup({
  config: config,
  filename: filename,
  partial: partial
}));
