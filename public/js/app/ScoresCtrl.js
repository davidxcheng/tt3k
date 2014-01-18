define([
	'ScoreValidator',
	'GameSetAndMatch',
	'libs/angularjs.1.0.6.min',
	'libs/bootstrap-datepicker',
	'moment'
	], 
	function(validator, gameSetAndMatch, ng, dp, moment, $scope, $http, $location) {

		return function($scope, $http, $location) {

			$('.datepicker').datepicker({ format: 'yyyy-mm-dd' });

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

			$scope.$on("$routeChangeSuccess", function() {
				var vs = document.getElementById('vs');
				// todo: keep handle to callback so that event listener can be removed.
				document.getElementById('sets')
					.addEventListener('keyup', function(e) {
						var winner = gameSetAndMatch($scope.match),
							text;

						if (winner > 0)
							text = "defeated";
						else if (winner < 0)
							text = "lost to";
						else
							text = "vs";

						if (vs.innerText != text) {
							vs.classList.remove('fadeIn');
							vs.classList.remove('fadeAway');
							vs.classList.add('fadeAway');
							setTimeout(function fadeIn(text) {
								vs.innerText = text;
								vs.classList.add('fadeIn');
							}, 300, [text]);
						}
					});
			});
		};
	}
);