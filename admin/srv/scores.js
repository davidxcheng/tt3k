var mongodb = require('mongodb'),
	mongoClient = mongodb.MongoClient,
	dbConfig 	= require('../../config').mongoDb;

var get = function (req, res) {
	if (req.get('Accept').indexOf('application/json') != -1) {
		res.header('Content-Type', 'application/json');
		getScores(req, res);
	}
	else {
		res.header('Content-Type', 'text/html');
		res.send('<h1>Scores</h1>');
	}
};

function getScores(req, res) {
	mongoClient.connect(dbConfig.connectionString, function(err, db) {
		db.collection(dbConfig.collections.Scores, function(err, collection) {
			var scores = [];

			collection.find().stream()
				.on('data', function(score) { 
					scores.push(score); 
				})
				.on('end', function() {
					res.send(scores);
				});
		});
	});
}

var remove = function remove(req, res) {
	var id = req.params.id;
	mongoClient.connect(dbConfig.connectionString, function(err, db) {
		db.collection(dbConfig.collections.Scores, function(err, scores) {
			if (err) throw err;
				
			scores.remove({ _id: new mongodb.ObjectID(id) }, function(err, result) {
				res.send(200);
			});
		});
	});
};

module.exports = {
	get: get,
	remove: remove
};