module.exports = (grunt) ->
  grunt.config "watch",
    stylesheets:
      files: "scss/**/*"
      tasks: ["sass"]

    livereload:
      files: ["dist/css/*", "dist/*.html"]
      options:
        livereload: true

    images:
      files: "opt-imgs/*"
      tasks: "optimizeImages"

    partials:
      files: ["partials/*", "data/*"]
      tasks: ["assemble"]
      options:
        livereload: true

    handlebarsHelpers:
      files: ["lib/helpers/*.coffee"]
      tasks: ["coffee:assemble", "assemble"]
      options:
        livereload: true

    data:
      files: "data/**/*"
      tasks: ["assemble"]

    javascript:
      files: ["coffee/*", "js/*.js"]
      tasks: "javascript:dev"

    client_tests:
      files: ["specs/*.coffee"]
      tasks: ["coffee:test", "jasmine"]

    server_tests:
      files: ["specs/node/*.coffee", "../events/**/*.coffee"]
      tasks: ["jasmine_node"]

    publicDirectory:
      files: ["public/**/*"]
      tasks: "default"

  grunt.loadNpmTasks "grunt-contrib-watch"