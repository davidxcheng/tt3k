module.exports = {
	port: 3000,
	mongoDb: {
		connectionString: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/tt3k',
		collections: {
			Members: 'Members',
			Scores: 'Scores'
		}
	}
};