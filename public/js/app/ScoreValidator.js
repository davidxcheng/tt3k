define([], function() {

	return function(match) {

		if (typeof match != "object") {
			throw new TypeError("Argument 'match' must be an object");
		}

		var isInvalid = false,
			msg = "";

		try {
			if (!match.player2)
				throw "The name of your opponent must be filled in";

			// Check that the format of the date is yyyy-MM-dd
			if (match.gameday.match(/^(\d{4}-\d{2}-\d{2})$/) === null
				|| new Date(match.gameday).toString() == "Invalid Date")
				throw match.gameday + " is not a valid date";

			if (!match.sets[0].gamesWonByPlayer1)
				throw "How many games did you win in the 1st set?";

			if (!match.sets[0].gamesWonByPlayer2)
				throw "How many games did " + match.player2 + " win in the 1st set?";
		}
		catch(err) {
			isInvalid = true;
			msg = err;
		}

		return {
			failed: isInvalid,
			message: msg
		};
	};
});