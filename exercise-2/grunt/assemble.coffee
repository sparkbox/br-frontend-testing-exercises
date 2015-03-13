module.exports = (grunt) ->
  grunt.config "assemble",
    options:
      partials: "partials/*.hbs"
      helpers: ["lib/helpers/js/handlebars.js"]
      pkg: "<%= pkg %>"
    index:
      src: "partials/home.hbs"
      dest: "dist/index.html"

  grunt.loadNpmTasks 'assemble'
