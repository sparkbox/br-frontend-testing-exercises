module.exports = (grunt) ->
  grunt.config "imageoptim",
    files: ["opt-imgs"]
    options:
      imageAlpha:true

  grunt.loadNpmTasks "grunt-imageoptim"
