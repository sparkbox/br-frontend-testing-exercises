module.exports = (grunt) ->
  grunt.config "copy",
    main:
      files: [
        expand: true
        dot: true
        cwd:'public/'
        src: ["**"]
        dest: "dist/"
      ]
    img:
      files: [
        expand: true
        cwd:'opt-imgs/'
        src: ["**"]
        dest: "dist/img"
      ]
    grunticon:
      files: [
        expand: true
        cwd:'grunticon/'
        src: ["**"]
        dest: "dist/img/grunticon"
      ]

  grunt.loadNpmTasks "grunt-contrib-copy"
