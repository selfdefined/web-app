# file-exists

Check if filepath exists and is a file. Returns false for directories.

_(Requires node >=6.0.0)_

## Install

```
npm install file-exists --save
```

## Usage

```js
const fileExists = require('file-exists');

fileExists('/index.html', (err, exists) => console.log(exists)) // OUTPUTS: true or false

fileExists('/index.html').then(exists => {
  console.log(exists) // OUTPUTS: true or false
})

const exists = await fileExists('/index.html')

console.log(fileExists.sync('/index.html')) // OUTPUTS: true or false
```

### Options

#### fileExists(filepath[, options, callback])

* `filepath` - the path to the file to check if it exists
* `options` - an object of options
  * `root` - the root directory to look in (or cwd)
* `callback(err, exists)` - gets called when checking is done

#### fileExists.sync(filepath[, options])
* `filepath` - the path to the file to check if it exists
* `options` - an object of options
  * `root` - the root directory to look in (or cwd)

## Run Tests

```
npm install
npm test
```
