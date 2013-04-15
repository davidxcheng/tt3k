module.exports = {
	setup: function(server, mongoClient) {

			var m = require('../handlers/members')(mongoClient);

			server.get('/sign-up', function(req, res) {
				res.render('signup');
			});

			server.get('/login', function(req, res) {
				res.render('login');
			});

			server.post('/logout', function(req, res) {
				req.session.destroy(function(err) {
					// nothing to do here
				});
			});

			server.get('/scores', function(req, res) {
				res.render('scores');
			});

			server.put('/member', function(req, res) {
				var member = req.body;

				m.HandleCreateMember(member, function(err) {
					if (!err) {
						// Logon the new member
						req.session.user = member.name;
						res.render('welcome', { name: member.name });
					}
					else {
						console.log('Failed to create member. ' + JSON.stringify(err));
						res.send(500, 'Something went wrong:(');
					}
				});
			});

			server.post('/login', function(req, res) {
				var credentials = req.body;

				m.HandleLogin(credentials, function(success, member) {
					if (success) {
						req.session.user = member.name;
						res.render('welcome', { name: member.name });
					}
					else {
						res.send(400, 'Login failed:(');
					}
				});
			});

			server.get('/member/current', function(req, res) {
				console.log(req.session.user);
				res.send({ name: req.session.user });
			});
		}
}