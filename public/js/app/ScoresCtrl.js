define([
	'ScoreValidator',
	'libs/angularjs.1.0.6.min',
	'libs/bootstrap-datepicker',
	'moment',
	'libs/ui.bootstrap.tpls.0.6.0'], function(validator, ng, dp, moment) {

	return function($scope, $http, $location) {

		$('#when').datepicker({ format: 'yyyy-mm-dd' });

		$scope.match = {
			gameday: new moment().format('YYYY-MM-DD'),
			player1: '',
			player2: '',
			sets: [
				{
					set: 1,
					gamesWonByPlayer1: null,
					gamesWonByPlayer2: null,
				},
				{
					set: 2,
					gamesWonByPlayer1: null,
					gamesWonByPlayer2: null,
				},
				{
					set: 3,
					gamesWonByPlayer1: null,
					gamesWonByPlayer2: null,
				},
				{
					set: 4,
					gamesWonByPlayer1: null,
					gamesWonByPlayer2: null,
				},
				{
					set: 5,
					gamesWonByPlayer1: null,
					gamesWonByPlayer2: null,
				}
			]
		};
		$scope.opponents = [];

		$http.get('/member/current')
			.success(function(user, status) {
				if (user) {
					$scope.match.player1 = user.name;
					$http.get('/players')
						.success(function(data, status) {
							$scope.opponents = data;
						});
				}
				else
					$location.path('/login');
			});

		$scope.submitScore = function() {

			var validation = validator($scope.match);
			if (validation.failed) {
				$scope.feedback = validation.message;
				$('#feedback').removeClass('hide');
				return false;
			}

			$http.post('/scores', $scope.match)
				.success(function() {
					$location.path('/');
				});
			$('#btnSubmitScore').attr('disabled', 'disabled')
		};
	};

});