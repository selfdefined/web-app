### detective-stylus [![npm](http://img.shields.io/npm/v/detective-stylus.svg)](https://npmjs.org/package/detective-stylus) [![npm](http://img.shields.io/npm/dm/detective-stylus.svg)](https://npmjs.org/package/detective-stylus)

> Find the dependencies of a Stylus file

`npm install detective-stylus`

It's the Stylus counterpart to
[detective](https://github.com/substack/node-detective),
[detective-amd](https://github.com/mrjoelkemp/node-detective-amd),
[detective-es6](https://github.com/mrjoelkemp/node-detective-es6),
and [detective-sass](https://github.com/mrjoelkemp/node-detective-sass)

Note: this detective uses a regex to find the `@import` or `@require` statements.

### Usage

```js
var detective = require('detective-stylus');

var content = fs.readFileSync('styles.styl', 'utf8');

// list of imported file names (ex: '_foo.styl', '_foo', etc)
var dependencies = detective(content);
```

