/**
* TAP tests.
* List of 'asserts' methods: https://github.com/isaacs/node-tap/blob/master/lib/tap-assert.js
**/

var tap = require("tap"),
	validator = require("../public/js/app/ScoreValidator");

tap.test("ScoreValidator - Bad input", function(t) {
	var expected = new TypeError("Argument 'match' must be an object");

	function submitInvalidType() {
		validator("jibbrish");
	}

	t.throws(submitInvalidType, expected, "Should reject invalid type");
	t.end();
});