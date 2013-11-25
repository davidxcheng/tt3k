(function(gameSetAndMatch) {
	// register as AMD/requirejs module
	if (typeof define == "function" && define.amd)
		define([], gameSetAndMatch);

	// register as CommonJS/nodejs module
	if (typeof exports == "object")
		module.exports = gameSetAndMatch();

})(function() {

	function isInteger(val) {
		if (typeof val == 'undefined') return false;
		var integer = parseInt(val);
		if (isNaN(integer)) return false;
		if (integer % 1 != 0) return false;
		return true;
	}

	// Greater than 0 if player1 won, 0 for a draw and negative if player2 won.
	return function GameSetAndMatch(match) {

		if (typeof match != "object")
			throw new TypeError("Argument 'match' must be an object");

		var winner = 0;

		match.sets.forEach(function(set) {
			var p1 = set.gamesWonByPlayer1,
				p2 = set.gamesWonByPlayer2;

			if (isInteger(p1) && isInteger(p2)) {
				var result = p1 - p2;
				if (Math.abs(result) < 2 && Math.max(p1, p2) != 7) return;

				winner += result > 0 ? 1 : -1;
			}
		});

		return winner;
	};
});