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
			templateUrl: 	"SignUpView",
			controller: 	"tt3k.MemberCtrl" 
		});

	$locationProvider.html5Mode(true);
});

var tt3k = (function() {
	/***
	* AngularJs controllers
	***/
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
		$scope.match = {
			player1: { }
		};

		$http.get('/member/current')
			.success(function(user, status) {
				if (user) {
					$scope.match.player1.name = user.name;
					$http.get('/players')
						.success(function(data, status) {
							$scope.opponents = data;
						});
				}
				else
					$location.path('/login');
			});
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
		ScoresCtrl: scoresCtrl,
		MainCtrl: mainCtrl,
		MemberCtrl: memberCtrl
	};
})();