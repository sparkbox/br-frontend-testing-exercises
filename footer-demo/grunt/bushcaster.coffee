module.exports = (grunt) ->
  grunt.config "bushcaster",
    options:
      hashLength: 8
      noProcess: true
      onComplete: (map, files) ->
        files.forEach((file)->
          grunt.cacheMap.push(
            pattern: file
            replacement: map[file]
          )
        )
    main:
      files: [
        expand: true
        cwd: "dist/"
        src: ["css/mq-base.css", "css/no-mq-base.css", "js/Sparkbox.js", "js/Sparkbox-oldie.js", "js/modernizr.js", "map-data.json", "favicon.ico"]
        dest: "./"
      ]

  grunt.loadNpmTasks "grunt-bushcaster"