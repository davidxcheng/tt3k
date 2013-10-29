define([
	'libs/angularjs.1.0.6.min',
	'MainCtrl'
	],
	function(ng, mainCtrl) {
		return ng.module('tt3k', [])
			.controller('MainCtrl', mainCtrl);
	});