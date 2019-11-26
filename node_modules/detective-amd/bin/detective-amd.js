#!/usr/bin/env node

'use strict';

var getDependencies = require('../');
var filename = process.argv[2];
var fs = require('fs');

if (!filename) {
  console.log('Filename not supplied');
  console.log('Usage: detective-amd <filename>');

} else {
  var deps = getDependencies(fs.readFileSync(filename));
  deps.forEach(function(dep) {
    console.log(dep);
  });
}

