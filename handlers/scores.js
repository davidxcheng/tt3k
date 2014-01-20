module.exports = (function() {
	var mongoClient = require('mongodb').MongoClient,
		dbConfig 	= require('../config').mongoDb;

	return {
		HandleSubmitScore: function(match, cb) {
			var error = null;

			// default to today if date is not set
			match.gameday = match.gameday || new Date();
			// remove emty sets
			match.sets = match.sets.filter(function(set) {
				return set.gamesWonByPlayer1 && set.gamesWonByPlayer2;
			});

			// insert into db
			mongoClient.connect(dbConfig.connectionString, function(err, db) {
				db.collection(dbConfig.collections.Scores, function(err, collection) {
					collection.insert(match, function(err, result) {
						if (!err)
							console.log(JSON.stringify(result));
					});
					cb(err);
				});
				db.close();
			});
		},
		GetLatestScores: function(limit, cb) {
			limit = limit || 20;

			mongoClient.connect(dbConfig.connectionString, function(err, db) {
				var col = db.collection(dbConfig.collections.Scores);

				col.find({ }, {
					sort: { gameday: -1 },
					limit: limit
				}).toArray(function(err, docs) {
					var scores = docs.map(function(score) {
						score.sets = score.sets.map(function(set) {
							return set.gamesWonByPlayer1 + '-' + set.gamesWonByPlayer2;
						});

						return score;
					});
					cb(docs);
					db.close();
				});
			});
		}
	};
})();