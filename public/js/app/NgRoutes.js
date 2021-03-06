define([
	
	],
	function($routeProvider, $locationProvider) {
		return function($routeProvider, $locationProvider) {

			$routeProvider
				.when('/scores', {
					templateUrl: 	'ScoresView',
					controller: 	'ScoresCtrl'
				})

				.when('/login', {
					templateUrl: 	'LoginView',
					controller: 	'MemberCtrl'
				})

				.when('/sign-up', {
					templateUrl: 	'SignUpView',
					controller: 	'MemberCtrl'
				})

				.when('/logout', {
					templateUrl: 	'LatestScoresView',
					controller: 	'LogoutCtrl'
				})

				.when('/', {
					templateUrl: 	"LatestScoresView",
					controller: 	"LatestScoresCtrl"
				});

			$locationProvider.html5Mode(true);
		};
	});