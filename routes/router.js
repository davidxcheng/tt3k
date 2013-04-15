module.exports = {
	setup: function(server) {
			var memberHandler = require('../handlers/members'),
				scoreHandler = require('../handlers/scores');

			server.get('/menu', function(req, res) {
				if (req.session.user)
					res.render('menuForLoggedIn');
				else
					res.render('menuForUnknown');
			});

			server.get('/signup', function(req, res) {
				res.render('signup');
			});

			server.post('/logout', function(req, res) {
				req.session.destroy(function(err) {
					console.log('Member logged out');
					res.send(200, 'OK')
				});
			});

			server.put('/member', function(req, res) {
				var member = req.body;

				memberHandler.HandleCreateMember(member, function(err) {
					if (!err) {
						// Logon the new member
						req.session.user = {
							name: member.name,
							email: member.email
						};
						res.send(201, 'Created');
					}
					else {
						console.log('Failed to create member. ' + JSON.stringify(err));
						res.send(500, 'Something went wrong:(');
					}
				});
			});

			server.post('/login', function(req, res) {
				var credentials = req.body;

				memberHandler.HandleLogin(credentials, function(success, member) {
					if (success) {
						req.session.user = {
							name: member.name,
							email: member.email
						};
						res.send(member.name);
					}
					else {
						res.send(400, 'Login failed:(');
					}
				});
			});

			server.get('/scores/latest', function(req, res) {
				scoreHandler.GetLatestScores(10, function(scores) {
					res.send(scores);
				});
			});

			server.post('/scores', function(req, res) {
				var match = req.body;
				scoreHandler.HandleSubmitScore(match, function(err) {
					if (!err) {
						console.log(err);
					}
					
					res.send(200, 'OK');
				});
			});

			server.get('/member/current', function(req, res) {
				res.send(req.session.user);
			});

			server.get('/players', function(req, res) {
				memberHandler.GetOpponents(req.session.user, function(players) {
					res.send(players);
				});
			});
		}
}