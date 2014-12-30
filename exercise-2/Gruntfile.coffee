module.exports = (grunt) ->
  # Project configuration.
  grunt.cacheMap = []
  grunt.initConfig pkg: require("./package.json")

  ##### Tasks ######
  grunt.loadTasks "grunt"

  # NOTE: this has to wipe out everything
  grunt.registerTask "root-canal", [ "exec:clean_foundry", "clean:all", "grunticon:icons", "copy:main", "copy:img", "copy:grunticon"]

  grunt.registerTask "optimizeImages", [ "imageoptim", "copy:img", "copy:grunticon" ]

  # Clean, compile and concatenate JS
  grunt.registerTask "javascript:dev", [ "concat", "jasmine" ]

  grunt.registerTask "javascript:dist", [ "concat", "modernizr" ]

  #Cache Busting
  grunt.registerTask "bustcache", ["bushcaster", "string-replace:dist"]

  # Production task
  grunt.registerTask "dev", [ "root-canal", "javascript:dev", "sass", "assemble", "connect", "watch"]

  grunt.registerTask "dist", [ "root-canal", "javascript:dist", "sass", "assemble", "uglify", "clean:templates", "bustcache" ]

  # Default task
  grunt.registerTask "default", "dev"

  grunt.registerTask "test", [ "root-canal", "concat", "jasmine" ]
