define(['libs/angularjs.1.0.6.min', 'libs/bootstrap-datepicker'], function(ng) {

	return function($scope, $http, $location) {

		$('#when').datepicker({ format: 'yyyy-mm-dd' });

		$scope.match = {
			gameday: '',
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

		$scope.validate = function(match) {

			var isInvalid = false;

			if (!match.player2) {
				isInvalid = true;
			}

			if (!match.sets[0].gamesWonByPlayer1) {
				isInvalid = true;
			}

			if (!match.sets[0].gamesWonByPlayer2) {
				isInvalid = true;
			}

			return {
				failed: isInvalid,
				message: ":'("
			};
		}

		$scope.submitScore = function() {

			$scope.match.gameday = $('#when').val();

			var validation = $scope.validate($scope.match);
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