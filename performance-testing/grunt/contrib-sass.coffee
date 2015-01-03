module.exports = (grunt) ->
  grunt.config "sass"
    dist:
      files:
        'dist/css/mq-base.css': 'scss/mq-base.scss'

  grunt.loadNpmTasks "grunt-contrib-sass"
