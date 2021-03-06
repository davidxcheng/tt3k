var mongoClient = require('mongodb').MongoClient,
	dbConfig 	= require('../config').mongoDb;

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
	var id = req.body.id;
	mongoClient.connect(dbConfig.connectionString, function(err, db) {
		//db.remove({ _id: id });
		cosole.log(id);
		res.send(404);
	});
};

module.exports = {
	get: get,
	remove: remove
};