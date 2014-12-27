module.exports = (grunt) ->
  grunt.config "exec",
    map_data:
      cmd: "coffee ../events/sources/google.coffee dist/map-data.json"

  grunt.loadNpmTasks "grunt-exec"
