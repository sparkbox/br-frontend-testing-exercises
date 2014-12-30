module.exports = (grunt) ->
  grunt.config "compass",
    dev:
      options:
        environment: 'dev'
    dist:
      options:
        environment: 'production'
        outputStyle: 'compressed'

  grunt.loadNpmTasks "grunt-contrib-compass"