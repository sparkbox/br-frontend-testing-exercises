module.exports = (grunt) ->
  grunt.config "symlink",
    foundry:
      src: '../foundry'
      dest: 'dist/foundry'

  grunt.loadNpmTasks "grunt-contrib-symlink"
