#!/usr/bin/env node

'use strict';

var program = require('commander');
var cabinet = require('../');

program
  .version(require('../package.json').version)
  .usage('[options] <path>')
  .option('-d, --directory <path>', 'root of all files')
  .option('-c, --config [path]', 'location of a RequireJS config file for AMD')
  .option('-w, --webpack-config [path]', 'location of a webpack config file')
  .option('-t, --ts-config [path]', 'location of a typescript config file')
  .option('-f, --filename [path]', 'file containing the dependency')
  .parse(process.argv);

var filename = program.filename;
var directory = program.directory;
var config = program.config;
var webpackConfig = program.webpackConfig;
var tsConfig = program.tsConfig;
var dep = program.args[0];

var result = cabinet({
  partial: dep,
  filename: filename,
  directory: directory,
  config: config,
  webpackConfig: webpackConfig,
  tsConfig: tsConfig
});

console.log(result);