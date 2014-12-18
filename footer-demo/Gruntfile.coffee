module.exports = (grunt) ->
  # Project configuration.
  grunt.cacheMap = []
  grunt.initConfig pkg: require("./package.json")

  ##### Tasks ######
  grunt.loadTasks "grunt"

  # NOTE: this has to wipe out everything
  grunt.registerTask "root-canal", [ "exec:clean_foundry", "clean:all", "grunticon:icons", "copy:main", "copy:img", "copy:grunticon"]

  grunt.registerTask "optimizeImages", [ "imageoptim", "copy:img", "copy:grunticon" ]

  # Reports
  grunt.registerTask "report", [ "coffee:reporting", "plato", "clean:reporting", "exec:open_js_report" ]

  # Clean, compile and concatenate JS
  grunt.registerTask "javascript:dev", [ "coffee:compile", "coffee:assemble", "coffee:test", "concat", "jasmine" ]

  grunt.registerTask "javascript:dist", [ "coffee:compile", "coffee:assemble", "concat", "modernizr" ]

  #Cache Busting
  grunt.registerTask "bustcache", ["bushcaster", "string-replace:dist"]

  # Production task
  grunt.registerTask "dev", [ "root-canal", "javascript:dev", "sass", "assemble", "watch"]

  grunt.registerTask "dist", [ "root-canal", "javascript:dist", "sass", "assemble", "uglify", "clean:templates", "bustcache" ]

  # Default task
  grunt.registerTask "default", "dev"

  grunt.registerTask "test", [ "root-canal", "coffee:compile", "coffee:assemble", "coffee:test", "concat", "jasmine" ]
