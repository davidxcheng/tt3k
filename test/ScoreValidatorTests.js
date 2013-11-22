var tap = require("tap"),
	validator = require("../public/js/app/ScoreValidator"),
	exception;

tap.test("Bad input", function(t) {
	var expected = new TypeError("Argument 'match' must be an object");

	function submitInvalidType() {
		validator("jibbrish");
	}

	t.throws(submitInvalidType, expected, "Reject invalid type");
	t.end();
});