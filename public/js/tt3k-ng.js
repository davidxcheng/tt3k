angular.module('tt3k', [], function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 	'LoginView',
			controller: 	'tt3k.LoginCtrl'
		})

		.when('/sign-up', {
			templateUrl: 	'SignUpView',
			controller: 	'tt3k.SignUpCtrl'
		})

		.when('/', {
			templateUrl: 	"StartView",
			controller: 	"tt3k.MainCtrl" 
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
			$http.post('/login', $scope.credentials)
				.success(function() {
					$location.path('/');
				})
				.error(function(data, status) {
					$scope.feedback = data || 'Something went wrong!';
					$('#feedback').removeClass('hide');
				});
		}
	}

	var signUpCtrl = function($scope, $http, $location) {
		$scope.member = {};

		$scope.signUp = function() {
			$http.put('/member', $scope.member)
				.success(function() {
					$location.path('/login');
				})
				.error(function(data, status) {
					$scope.feedback = data || 'Something went wrong!';
					$('#feedback').removeClass('hide');
				});
		}
	}

	return {
		MainCtrl: mainCtrl,
		LoginCtrl: loginCtrl,
		SignUpCtrl: signUpCtrl
	};
})();