module.exports = (grunt) ->
  grunt.config "connect",
    server:
      options:
        base: 'dist/'
        port: 9000
        hostname: '*'

  grunt.loadNpmTasks "grunt-contrib-connect"