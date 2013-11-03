module.exports = {
	port: 3000,
	mongoDb: {
		connectionString: 'mongodb://localhost:27017/tt3k',
		collections: {
			Members: 'Members',
			Scores: 'Scores'
		}
	}
};