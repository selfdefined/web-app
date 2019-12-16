#!/usr/bin/env node

'use strict';

const lookup = require('../');
const program = require('commander');

program
  .version(require('../package.json').version)
  .usage('[options] <path>')
  .option('-f, --filename [path]', 'file containing the dependency')
  .option('-d, --directory [path]', 'location of all sass files')
  .parse(process.argv);

const filename = program.filename;
const directory = program.directory;
const dep = program.args[0];

console.log(lookup(dep, filename, directory));
