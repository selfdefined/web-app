### detective-typescript [![Build Status](http://img.shields.io/travis/pahen/detective-typescript/master.svg?style=flat-square)](https://travis-ci.org/pahen/detective-typescript) [![npm](http://img.shields.io/npm/v/detective-typescript.svg)](https://npmjs.org/package/detective-typescript) [![npm](http://img.shields.io/npm/dm/detective-typescript.svg)](https://npmjs.org/package/detective-typescript)

> Get the dependencies of TypeScript module

`npm install detective-typescript`

### Usage

```js
var detective = require('detective-typescript');

var mySourceCode = fs.readFileSync('myfile.js', 'utf8');

// Pass in a file's content or an AST
var dependencies = detective(mySourceCode);

```

#### License

MIT
