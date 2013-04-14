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
})
.service('menuService', function() {
	var setActiveMenuItem = function($menuItem) {
		$('#main-menu .active').removeClass('active');
		$menuItem.addClass('active');
	};

	var setMenuBasedOnContext = function(isLoggedIn) {
		//if (isLoggedIn)

	};

	$(document).ready(function() {
		$('#main-menu a').on('click', function(e) {
			e.preventDefault();
			setActiveMenuItem($(this));
		});
	});

	return {
		setActiveMenuItem: setActiveMenuItem
	};
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

	var scoresCtrl = function($scope, $http) {
		$scope.match = {
			player1: {
				name: ''
			}
		};

		$http.get('/member/current')
			.success(function(data, status) {
				$scope.match.player1.name = data.name;
			})
			.error(function(data, status) {
				$scope.feedback = "You have to login in before you can submit a score."
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
					$location.path('/login');
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