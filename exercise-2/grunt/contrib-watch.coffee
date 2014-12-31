module.exports = (grunt) ->
  grunt.config "watch",
    stylesheets:
      files: "scss/**/*"
      tasks: ["sass"]

    livereload:
      files: ["dist/css/*", "dist/*.html"]
      options:
        livereload: 9001

    partials:
      files: ["partials/*", "data/*"]
      tasks: ["assemble"]
      options:
        livereload: 9001

    data:
      files: "data/**/*"
      tasks: ["assemble"]

    javascript:
      files: ["js/*.js"]
      tasks: "javascript:dev"

    jasmine:
      files: ["specs/**/*Spec.js"]
      tasks: "jasmine"

    publicDirectory:
      files: ["public/**/*"]
      tasks: "default"

  grunt.loadNpmTasks "grunt-contrib-watch"
