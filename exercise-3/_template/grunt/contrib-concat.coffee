module.exports = (grunt) ->
  grunt.config "concat",
    js:
      src: ["js/libs/*", "js/*"]
      #put it in dist/
      dest: "dist/js/<%= pkg.name %>.js"

  grunt.loadNpmTasks "grunt-contrib-concat"
