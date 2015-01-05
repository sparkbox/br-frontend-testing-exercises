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
      files: ["specs/*", "js/*"]
      tasks: "javascript:dev"

    publicDirectory:
      files: ["public/**/*"]
      tasks: "dev"

  grunt.loadNpmTasks "grunt-contrib-watch"
