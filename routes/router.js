module.exports = {
	setup: function(server, mongoClient) {

			var m = require('../handlers/members')(mongoClient);

			server.get('/signup', function(req, res) {
				res.render('signup');
			});

			server.put('/member', function(req, res) {
				var member = req.body;

				m.HandleCreateMember(member, function(err) {
					if (!err)
						console.log('Member created');
					else
						console.log('Failed to create member. ' + JSON.stringify(err));
				});
			});
		}
}