angular.module('tt3k', [], function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'LoginView',
			controller: 'tt3k.LoginCtrl'
		})

		.when('/sign-up', {
			templateUrl: 'SignUpView',
			controller: 'tt3k.SignUpCtrl'
		});

	$locationProvider.html5Mode(true);
});

var tt3k = (function() {
	var mainCtrl = function($scope, $route, $routeParams, $location) {
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
	}

	var loginCtrl = function($scope, $http, $location) {
		$scope.credentials = {};

		$scope.login = function() {
			alert($scope.credentials.email);
		}
	}

	var signUpCtrl = function($scope, $http, $location) {
		$scope.member = {};

		$scope.signUp = function() {
			$http.put('/member', $scope.member);
		}
		
	}

	return {
		MainCtrl: mainCtrl,
		LoginCtrl: loginCtrl,
		SignUpCtrl: signUpCtrl
	};
})();