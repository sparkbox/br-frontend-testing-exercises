module.exports = (grunt) ->
  grunt.config "jasmine",
    src: ["dist/js/Sparkbox.js"]
    options:
      specs: "specs/*Spec.js"
      helpers: "specs/js/*Helper.js"
      vendor: ["dist/js/modernizr.js", "dist/js/jquery-1.9.1.min.js", "specs/lib/jasmine-fixture.js"]

  grunt.loadNpmTasks "grunt-contrib-jasmine"
