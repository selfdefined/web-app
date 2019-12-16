### detective-sass [![npm](http://img.shields.io/npm/v/detective-sass.svg)](https://npmjs.org/package/detective-sass) [![npm](http://img.shields.io/npm/dm/detective-sass.svg)](https://npmjs.org/package/detective-sass)

> Find the dependencies of a sass file

`npm install --save detective-sass`

**Note:** This is specific to the .sass style syntax of the Sass preprocessor. For SCSS support, please see [node-detective-scss](https://github.com/dependents/node-detective-scss)

It's the SASS counterpart to [detective](https://github.com/substack/node-detective), [detective-amd](https://github.com/mrjoelkemp/node-detective-amd), and [detective-es6](https://github.com/mrjoelkemp/node-detective-es6).

* The AST is generated using the [gonzales-pe](https://github.com/tonyganch/gonzales-pe) parser.

### Usage

```js
var detective = require('detective-sass');

var content = fs.readFileSync('styles.sass', 'utf8');

// list of imported file names (ex: '_foo.sass', '_foo', etc)
var dependencies = detective(content);
```

### Related

* [node-sass-lookup](https://github.com/dependents/node-sass-lookup) if you want to map a sass/scss dependency to a file on your filesystem.
* [node-precinct](https://github.com/dependents/node-precinct) if you want to also support finding dependencies for JavaScript and other languages.

### License

MIT
