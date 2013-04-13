module.exports = {
	setup: function(server, db) {

			server.get('/signup', function(req, res){
						res.render('signup');
					});
			}
}