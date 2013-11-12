define(['libs/angularjs.1.0.6.min'], function(ng) {

	var refreshMenu = function(menuItemSelector) {
		$.get('/menu', function(menuItems) {
			$('#main-menu').html(menuItems);
			$(menuItemSelector).addClass('active');
		});
	};

	return function($scope, $http, $location) {
		$scope.credentials = {};

		$scope.login = function() {
			$http.post('/login', $scope.credentials)
				.success(function(name) {
					refreshMenu('#mnuScores');
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
					refreshMenu();
					$location.path('/scores');
				})
				.error(function(data, status) {
					$scope.feedback = data || 'Something went wrong!';
					$('#feedback').removeClass('hide');
				});
		};
	};

});