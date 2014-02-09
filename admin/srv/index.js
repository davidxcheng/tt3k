var scores = require('./scores');

var get = function (req, res) {
	if (req.get('Accept').indexOf('application/json') != -1) {
		res.header('Content-Type', 'application/json');

		var menuItems = [{
			path: 'scores',
			text: 'Scores'
		}, {
			path: 'members',
			text: 'Members'
		}];

		res.send(JSON.stringify(menuItems));
	}
	else {
		res.header('Content-Type', 'text/html');
		res.render('admin/index');
	}
};

module.exports = {
	get: get,
	scores: scores
};