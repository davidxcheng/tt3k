define([
	'angularjs.1.0.6.min',
	'tt3k.controllers'
	],
	function(ng, controllers) {

	return ng.module('routes', ['$routeProvider', '$locationProvider'], function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/scores', {
				templateUrl: 	'ScoresView',
				controller: 	'controllers.ScoresCtrl'
			})

			.when('/login', {
				templateUrl: 	'LoginView',
				controller: 	'controllers.MemberCtrl'
			})

			.when('/sign-up', {
				templateUrl: 	'SignUpView',
				controller: 	'controllers.MemberCtrl'
			})

			.when('/logout', {
				templateUrl: 	'ByeView',
				controller: 	'controllers.LogoutCtrl'
			})

			.when('/', {
				templateUrl: 	"LatestScoresView",
				controller: 	"controllers.LatestScoresCtrl"
			});

		$locationProvider.html5Mode(true);
	});

	//return tt3k.config(['$routeProvider', function($routeProvider)])
});