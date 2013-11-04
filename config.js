module.exports = (function() {

	var config = process.env.NODE_ENV === 'production'
		? require('./prod.config')
		: require('./dev.config');

	return config;
})();