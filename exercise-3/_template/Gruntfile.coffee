module.exports = (grunt) ->
  # Project configuration.
  grunt.cacheMap = []
  grunt.initConfig pkg: require("./package.json")

  ##### Tasks ######
  grunt.loadTasks "grunt"

  # NOTE: this has to wipe out everything
  grunt.registerTask "root-canal", [ "clean:all", "copy:main"]

  # Clean, compile and concatenate JS
  grunt.registerTask "javascript:dev", [ "concat", "jasmine" ]

  grunt.registerTask "javascript:dist", [ "concat", "jasmine" ]

  # Production task
  grunt.registerTask "dev", [ "root-canal", "javascript:dev"]

  grunt.registerTask "dist", [ "root-canal", "javascript:dist", "uglify"]

  # Default task
  grunt.registerTask "default", ["dev", "connect", "watch"]

  # Run on CircleCI (or your fav CI service)
  grunt.registerTask "ci", "dist"
