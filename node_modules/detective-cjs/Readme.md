#### detective-cjs [![npm](http://img.shields.io/npm/v/detective-cjs.svg)](https://npmjs.org/package/detective-cjs) [![npm](http://img.shields.io/npm/dm/detective-cjs.svg)](https://npmjs.org/package/detective-cjs)

> Get the dependencies of an CommonJS module

`npm install detective-cjs`

But dude, substack already built this: node-detective. Yes, but I needed the capability to reuse an AST
and this was unlikely to be merged timely. I can also support jsx and other syntactic constructs faster.

### Usage

```js
var detective = require('detective-cjs');

var mySourceCode = fs.readFileSync('myfile.js', 'utf8');

// Pass in a file's content or an AST
var dependencies = detective(mySourceCode);

```

* Supports JSX, ES7, and any other features that [node-source-walk](https://github.com/mrjoelkemp/node-source-walk) supports.

#### License

MIT
