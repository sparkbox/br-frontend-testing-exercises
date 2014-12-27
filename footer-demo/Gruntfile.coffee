module.exports = (grunt) ->
  # Project configuration.
  grunt.cacheMap = []
  grunt.initConfig pkg: require("./package.json")

  ##### Tasks ######
  grunt.loadTasks "grunt"

  # NOTE: this has to wipe out everything
  grunt.registerTask "copyFiles", [ "grunticon:icons", "copy:main", "copy:img", "copy:grunticon"]

  # Compile and concatenate JS
  grunt.registerTask "javascript:dev", [ "jasmine" ]

  grunt.registerTask "javascript:dist", [ "modernizr" ]

  # Production task
  grunt.registerTask "dev", [ "copyFiles", "javascript:dev", "sass", "assemble", "connect", "watch"]

  grunt.registerTask "dist", [ "copyFiles", "javascript:dist", "sass", "assemble", "uglify" ]

  # Default task
  grunt.registerTask "default", "dev"
