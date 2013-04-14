module.exports = {
	setup: function(server, mongoClient) {

			var m = require('../handlers/members')(mongoClient);

			server.get('/signup', function(req, res) {
				res.render('signup');
			});

			server.put('/member', function(req, res) {
				var member = req.body;

				m.HandleCreateMember(member, function(err) {
					if (!err) {
						// Logon the new member
						req.session.user = member.name;
						res.send(201, 'Creted');
					}
					else {
						console.log('Failed to create member. ' + JSON.stringify(err));
						res.send(500, 'Something went wrong:(');
					}
				});
			});

			server.post('/login', function(req, res) {
				var credentials = req.body;

				m.HandleLogin(credentials, function(success) {
					console.log(success);

					if (success) {
						res.send('OK');
					}
					else {
						res.send(400, 'Login failed:(');
					}
				});
			});
		}
}