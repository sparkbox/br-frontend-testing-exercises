module.exports = (grunt) ->
  grunt.config "assemble",
    options:
      partials: "partials/*.hbs"
      data: "data/common/*.yml"
      helpers: ["lib/helpers/js/handlebars.js"]
      pkg: "<%= pkg %>"
    index:
      options:
        data: "data/home/*.yml"
      src: "partials/home.hbs"
      dest: "dist/index.html"

  grunt.loadNpmTasks 'assemble'
