module.exports = (grunt) ->
  grunt.config "uglify",
    js:
      files:
        "dist/js/exercise-2.js": ["dist/js/<%= pkg.name%>.js"]

  grunt.loadNpmTasks "grunt-contrib-uglify"
