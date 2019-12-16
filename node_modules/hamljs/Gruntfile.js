"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    urequire: {
      dist: {
        path: "lib",
        main: "haml",
        dstPath: ".",
        template: "AMD"
      }
    }
  });

  grunt.loadNpmTasks("grunt-urequire");
  grunt.registerTask("default", ["urequire"]);

};
