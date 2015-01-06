should = require('chai').Should()

slugify = require("./main")

describe "Slugify", ->

    it "Hello world", ->
        slugify('Hello world').should.equal 'hello-world'
