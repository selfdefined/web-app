module.exports = function() {
    return {
      entry: "./index.js",
      resolve: {
        alias: {
          R: './node_modules/resolve'
        }
      }
    };
};