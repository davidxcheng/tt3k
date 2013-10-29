define([
		'libs/angularjs.1.0.6.min',
		'MainCtrl',
		'LatestScoresCtrl',
		'MemberCtrl',
		'ScoresCtrl',
		'LogoutCtrl',
		'NgRoutes'
	],
	function(ng,
			 mainCtrl,
			 latestScoresCtrl,
			 memberCtrl,
			 scoresCtrl,
			 logoutCtrl) {

		 ng.module('tt3k', [])
			.controller('MainCtrl', mainCtrl)
			.controller('LatestScoresCtrl', latestScoresCtrl)
			.controller('MemberCtrl', memberCtrl)
			.controller('ScoresCtrl', scoresCtrl)
			.controller('LogoutCtrl', logoutCtrl);
	});