module.exports = (grunt) ->
  grunt.config "plato",
    complexity:
      files:
        'reports/js-complexity': ['reports/tmp/*.js']

  grunt.loadNpmTasks "grunt-plato"
