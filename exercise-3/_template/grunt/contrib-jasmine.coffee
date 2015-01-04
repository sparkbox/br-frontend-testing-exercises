module.exports = (grunt) ->
  grunt.config "jasmine",
    src: ["dist/js/<%= pkg.name%>.js"]
    options:
      specs: "specs/**/*Spec.js"
      helpers: "specs/js/*Helper.js"
      vendor: ["specs/lib/jquery-1.11.2.min.js", "specs/lib/jasmine-fixture.js"]
      keepRunner: true

  grunt.loadNpmTasks "grunt-contrib-jasmine"
