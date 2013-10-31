define(['libs/angularjs.1.0.6.min', 'libs/bootstrap-datepicker'], function(ng) {

	return function($scope, $http, $location) {
		$('#when').datepicker({ format: 'yyyy-mm-dd' });

		$http.get('/member/current')
			.success(function(user, status) {
				if (user) {
					$scope.player1 = user.name;
					$http.get('/players')
						.success(function(data, status) {
							$scope.opponents = data;
						});
				}
				else
					$location.path('/login');
			});

		$scope.submitScore = function() {
			var match = {
				gameday: $('#hell').val(),
				player1: $('.player').html(),
				player2: $('#player2').val(),
				sets: [
					{
						set: 1,
						gamesWonByPlayer1: $('#set1-player1').val(),
						gamesWonByPlayer2: $('#set1-player2').val(),
					},
					{
						set: 2,
						gamesWonByPlayer1: $('#set2-player1').val(),
						gamesWonByPlayer2: $('#set2-player2').val(),
					},
					{
						set: 3,
						gamesWonByPlayer1: $('#set3-player1').val(),
						gamesWonByPlayer2: $('#set3-player2').val(),
					},
					{
						set: 4,
						gamesWonByPlayer1: $('#set4-player1').val(),
						gamesWonByPlayer2: $('#set4-player2').val(),
					},
					{
						set: 5,
						gamesWonByPlayer1: $('#set5-player1').val(),
						gamesWonByPlayer2: $('#set5-player2').val(),
					}
				]
			};

			$http.post('/scores', match)
				.success(function() {
					$location.path('/');
				});
			$('#btnSubmitScore').attr('disabled', 'disabled')
		};
	};

});