angular.module('tt3k', [], function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/scores', {
			templateUrl: 	'ScoresView',
			controller: 	'tt3k.ScoresCtrl'
		})

		.when('/login', {
			templateUrl: 	'LoginView',
			controller: 	'tt3k.MemberCtrl'
		})

		.when('/sign-up', {
			templateUrl: 	'SignUpView',
			controller: 	'tt3k.MemberCtrl'
		})

		.when('/', {
			templateUrl: 	"LatestScoresView",
			controller: 	"tt3k.LatestScoresCtrl" 
		});

	$locationProvider.html5Mode(true);
});

var tt3k = (function() {
	/***
	* AngularJs controllers
	***/
	var latestScoresCtrl = function($scope, $http) {
		$scope.scores = [];

		$http.get('/scores/latest')
			.success(function(scores) {
				$scope.scores = scores;
			});
	};

	var mainCtrl = function($scope, $route, $routeParams, $location) {
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;

		var menu = [
			{ href: '/', text: "What's Up"},
			{ href: '/challenge', text: "Game On"},
			{ href: '/scores', text: 'Keeping The Score' },
			{ href: '/login', text: 'Login' },
			{ href: '/sign-up', text: 'Sign Up'}
		];

		var menu2 = [
			{ href: '/', text: "What's Up"},
			{ href: '/challenge', text: "Game On"},
			{ href: '/scores', text: 'Keeping The Score' },
			{ href: '/logout', text: 'Log Out' }
		];

		$scope.menu = menu;

		$scope.logout = function() {
			http.post('/logout', {})
				.success(function() {
					$scope.menu = menu;
				});
		};
	};

	var scoresCtrl = function($scope, $http, $location) {
		$('#hell').datepicker({ format: 'yyyy-mm-dd' });

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

			console.log(JSON.stringify(match));
			$http.post('/scores', match)
				.success(function() {

				});
			$('#btnSubmitScore').attr('disabled', 'disabled')
		};
	};

	var memberCtrl = function($scope, $http, $location) {
		$scope.credentials = {};

		$scope.login = function() {
			$http.post('/login', $scope.credentials)
				.success(function(name) {
					$location.path('/scores');
				})
				.error(function(data, status) {
					$scope.feedback = data || 'Something went wrong!';
					$('#feedback').removeClass('hide');
				});
		};
		
		$scope.member = {};

		$scope.signUp = function() {
			$http.put('/member', $scope.member)
				.success(function() {
					$location.path('/scores');
				})
				.error(function(data, status) {
					$scope.feedback = data || 'Something went wrong!';
					$('#feedback').removeClass('hide');
				});
		};
	};

	return {
		LatestScoresCtrl: latestScoresCtrl,
		ScoresCtrl: scoresCtrl,
		MainCtrl: mainCtrl,
		MemberCtrl: memberCtrl
	};
})();