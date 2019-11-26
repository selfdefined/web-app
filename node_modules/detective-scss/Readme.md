### detective-scss [![npm](http://img.shields.io/npm/v/detective-scss.svg)](https://npmjs.org/package/detective-scss) [![npm](http://img.shields.io/npm/dm/detective-scss.svg)](https://npmjs.org/package/detective-scss)

> Find the dependencies of an scss file

`npm install --save detective-scss`

It's the SCSS counterpart to [detective](https://github.com/substack/node-detective), [detective-amd](https://github.com/mrjoelkemp/node-detective-amd), [detective-es6](https://github.com/mrjoelkemp/node-detective-es6), [detective-sass](https://github.com/mrjoelkemp/node-detective-sass).

* The AST is generated using the [gonzales-pe](https://github.com/tonyganch/gonzales-pe) parser.

### Usage

```js
var detective = require('detective-scss');

var content = fs.readFileSync('styles.scss', 'utf8');

// list of imported file names (ex: '_foo.scss', '_foo', etc)
var dependencies = detective(content);
```

### Related

Check out [node-sass-lookup](https://github.com/dependents/node-sass-lookup) if you want to map a sass/scss dependency to a file on your filesystem.

### License

MIT
