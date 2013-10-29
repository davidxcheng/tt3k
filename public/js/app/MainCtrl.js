define(['libs/angularjs.1.0.6.min'], function(ng) {

	var refreshMenu = function() {
		$.get('/menu', function(menuItems) {
			$('#main-menu').html(menuItems);
		});
	};
	return function($scope, $route, $routeParams, $location, $http) {
console.log('nnn')

		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;

		refreshMenu();
	};

});