module.exports = (grunt) ->
  grunt.config "coffee",
    compile:
      files:
        "js/app.js": ["coffee/init.coffee", "coffee/map.coffee", "coffee/footer-toggle.coffee", "coffee/app.coffee"]

    assemble:
      options:
        bare: true
      files:
        "lib/helpers/js/handlebars.js": ["lib/helpers/handlebars.coffee"]

    test:
      files: grunt.file.expandMapping(["specs/*.coffee"], "specs/js/", {
        rename: (destBase, destPath) ->
          destBase + destPath.replace(/\.coffee$/, ".js").replace(/specs\//, "")
      })

  grunt.loadNpmTasks "grunt-contrib-coffee"
