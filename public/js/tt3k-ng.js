angular.module('tt3k', []);

var tt3k = (function() {
	$(document).ready(function() {
		$('#main-menu a[href$=logout]').on('click', function(e) {
			e.preventDefault();
			$.post('/logout', { }, function(data) {
				$('#main-wrapper').html(data);
			});
		});
	});

	/***
	* AngularJs controllers
	***/
	var menuCtrl = function($scope, $http) {
		var menu = [
			{ href: '/', text: "What's Up"},
			{ href: '/challenge', text: "Game On"},
			{ href: '/scores', text: 'Keeping The Score' },
			{ href: '/login', text: 'Login' },
			{ href: '/sign-up', text: 'Sign Up'}
		];

		var menuLoggedIn = [
			{ href: '/', text: "What's Up"},
			{ href: '/challenge', text: "Game On"},
			{ href: '/scores', text: 'Keeping The Score' },
			{ href: '/logout', text: 'Log Out' }
		];

		$http.get('/member/current')
			.success(function(data, status) {
				$scope.menu = (data.name) ? menuLoggedIn : menu;
			});
		

		$scope.logout = function() {
			http.post('/logout', {})
				.success(function() {
					$scope.menu = menu;
				});
		};
	};

	var scoresCtrl = function($scope, $http) {
		$scope.match = {
			player1: { }
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
				.success(function(data, status) {
					$('#main-wrapper').html(data);
				})
				.error(function(data, status) {
					$scope.feedback = data || 'Something went wrong!';
					$('#feedback').removeClass('hide');
				});
		};
		
		$scope.member = {};

		$scope.signUp = function() {
			$http.put('/member', $scope.member)
				.success(function(data, status) {
					$('#main-wrapper').html(data);
				})
				.error(function(data, status) {
					$scope.feedback = data || 'Something went wrong!';
					$('#feedback').removeClass('hide');
				});
		};
	};

	return {
		ScoresCtrl: scoresCtrl,
		MenuCtrl: menuCtrl,
		MemberCtrl: memberCtrl
	};
})();