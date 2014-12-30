module.exports = (grunt) ->
  grunt.config "exec",
    clean_foundry:
      cmd: "rm -rf dist/foundry"
    open_js_report:
      cmd: "open reports/js-complexity/index.html"
    map_data:
      cmd: "coffee ../events/sources/google.coffee dist/map-data.json"

  grunt.loadNpmTasks "grunt-exec"
