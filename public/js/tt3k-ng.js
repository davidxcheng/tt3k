angular.module('tt3k', [], function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'LoginView',
			controller: 'LoginCtrl'
		})

		.when('/sign-up', {
			templateUrl: 'SignUpView',
			controller: SignUpCtrl
		});

	$locationProvider.html5Mode(true);
});

function MainCtrl($scope, $route, $routeParams, $location) {
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
}

function LoginCtrl($scope, $http, $location) {
	$scope.credentials = {};

	$scope.signup = function() {
		alert($scope.member.name);
	}
}

function SignUpCtrl($scope, $http, $location) {
	$scope.member = {};

	$scope.signup = function() {
		alert($scope.member.name);
	}
}