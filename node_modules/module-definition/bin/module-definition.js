#!/usr/bin/env node

'use strict';

var getModuleType = require('../');
var filename = process.argv[2];

console.log(getModuleType.sync(filename));
