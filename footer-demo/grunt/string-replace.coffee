module.exports = (grunt) ->
  grunt.config "string-replace",
    dist:
      files:
        "dist/": ["dist/*.html", "dist/*.js"]
        "dist/foundry/forgeIt/expressionengine/templates/default_site/includes.group/": "dist/foundry/forgeIt/expressionengine/templates/default_site/includes.group/*.html"
      options:
        replacements: grunt.cacheMap

  grunt.loadNpmTasks "grunt-string-replace"