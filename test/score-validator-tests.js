/*
	Run with 'mocha -R spec .'
*/

var chai = require("chai"),
	expect = chai.expect,
	should = chai.should();

describe('ScoreValidator', function() {
	describe('Bad args', function() {
		it('Should throw error when arg is not an object', function() {
			var validator = require("../public/js/app/ScoreValidator");

			function fn(){
				validator("foo");
			}

			expect(fn).to.throw(Error, "Argument 'match' must be an object");

		});
	})
});