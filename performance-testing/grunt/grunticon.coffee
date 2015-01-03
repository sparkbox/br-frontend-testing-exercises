module.exports = (grunt) ->
  grunt.config "grunticon",
    icons:
      files: [
        expand: true,
        cwd: 'grunticon/src',
        src: ["*.svg"],
        dest: 'grunticon'
      ]

  grunt.loadNpmTasks "grunt-grunticon"
