module.exports = (grunt) ->
  grunt.config "perfbudget",
	  default:
	    options:
	      url: 'http://frontendtesting.buildright.io'
	      key: 'A.c3b039dead15a4cf3a93ee8101addbbe'

  grunt.loadNpmTasks "grunt-perfbudget"
