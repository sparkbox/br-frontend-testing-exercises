module.exports = (grunt) ->
  grunt.config "exec",
    clean_foundry:
      cmd: "rm -rf dist/foundry"
    open_js_report:
      cmd: "open reports/js-complexity/index.html"

  grunt.loadNpmTasks "grunt-exec"
