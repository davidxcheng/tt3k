module.exports = (function() {

	var mongoClient = require('mongodb').MongoClient,
		dbConfig 	= require('../config').mongoDb,
		crypto 		= require('crypto'),
		cryptoKey 	= 'shake';

	// Make sure no duplicate members can be inserted
	mongoClient.connect(dbConfig.connectionString, function(err, db) {
		db.collection(dbConfig.collections.Members, function(err, collection) {
			collection.ensureIndex({ 'email': 1 }, { unique: true, w: 0, background: true });
		});
	});		

	// Validates new member
	var validateMember = function(member) {
		if (!member)
			return false;

		if (!member.name || member.name.length < 4)
			return false;

		if (!member.email || !member.email.match(/.+@.+\.[a-z]{2,3}/))
			return false;

		if (!member.password || member.password.length < 6)
			return false;

		return true;
	};

	return {
		HandleCreateMember: function(member, cb) {
			var error = null;

			// Validate member
			if (validateMember(member)) {
				// Hash password
				member.password = crypto.createHmac('sha1', cryptoKey).update(member.password).digest('hex');

				try {
					// Store member in db
					mongoClient.connect(dbConfig.connectionString, function(err, db) {
						db.collection(dbConfig.collections.Members, function(err, collection) {
							collection.insert(member, function(err, result) {
								if (!err)
									console.log(JSON.stringify(result));
							});
						});
						db.close();
					});
				}
				catch (e) {
					error = error || {};
					error.innerException = e;
					error.message = 'Failed to store member in db.';
				}
			}
			else {
				error = error || {};
				error.message = 'Member did not pass validation.';
			}

			if (cb && typeof cb == 'function')
				cb(error);
		},
		HandleLogin: function(credentials, cb) {
			
			if (credentials && credentials.username && credentials.password) {
				// Find member
				mongoClient.connect(dbConfig.connectionString, function(err, db) {
					db.collection(dbConfig.collections.Members).findOne({ email: credentials.username }, function(err, doc) {
						if (doc) {
							// Check that password is correct
							if (crypto.createHmac('sha1', cryptoKey).update(credentials.password).digest('hex') == doc.password) {
								cb(true, doc);
								return;
							}
						}
						cb(false);
					});
				});
			}
		},
		GetOpponents: function(player, cb) {
			mongoClient.connect(dbConfig.connectionString, function(err, db) {
				db.collection(dbConfig.collections.Members).find({ email: { $ne: player.email } }).toArray(function(err, docs) {
					var players = docs.map(function(p) { return p.name; });
					cb(players);
				});
			});
		}
	};
})();