module.exports = (grunt) ->
  grunt.config "perfbudget",

    perfbudget:
      options:
        url: 'http://frontendtesting.buildright.io'
        key: 'WEBPAGETEST API KEY' # Email www@webpagetest.org to get an API key

  grunt.loadNpmTasks "grunt-perfbudget"
