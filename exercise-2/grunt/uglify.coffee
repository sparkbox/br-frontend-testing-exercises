module.exports = (grunt) ->
  grunt.config "uglify",
    js:
      files:
        "dist/js/Sparkbox.js": ["dist/js/Sparkbox.js"]

  grunt.loadNpmTasks "grunt-contrib-uglify"
