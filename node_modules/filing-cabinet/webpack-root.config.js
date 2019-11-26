var path = require('path');

module.exports = {
  entry: "./index.js",
  resolve: {
    modulesDirectories: ['test/root1', 'node_modules'],
    root: [
        path.resolve(__dirname, './test/root2'),
        path.resolve(__dirname, './node_modules')
    ]
  }
};