define([
		'libs/jquery.1.9.1.min',
		'libs/angularjs.1.0.6.min',
		'MainCtrl',
		'LatestScoresCtrl',
		'MemberCtrl',
		'ScoresCtrl',
		'LogoutCtrl',
		'NgRoutes',
		'libs/ui.bootstrap.tpls.0.6.0'
	],

	function($,
			ng,
			mainCtrl,
			latestScoresCtrl,
			memberCtrl,
			scoresCtrl,
			logoutCtrl,
			router) {

		return ng.module('tt3k', ['ui.bootstrap'])
			// Register controllers. 
			// Use array as second param (instead of just the function/controller) or else param names
			// can break your code when minifying. 
			.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', mainCtrl])
			.controller('LatestScoresCtrl', ['$scope', '$http', latestScoresCtrl])
			.controller('MemberCtrl', ['$scope', '$http', '$location', memberCtrl])
			.controller('ScoresCtrl', ['$scope', '$http', '$location', scoresCtrl])
			.controller('LogoutCtrl', ['$http', '$location', logoutCtrl])
			.config(['$routeProvider', '$locationProvider', router]);
	});