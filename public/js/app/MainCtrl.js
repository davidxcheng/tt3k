define(['libs/angularjs.1.0.6.min', 'libs/jquery.1.9.1.min'], function(ng, $) {

	var refreshMenu = function() {
		$.get('/menu', function(menuItems) {
			$('#main-menu').html(menuItems);
		});
	};

	$(document).ready(function() {
		$('#main-menu').on('click', 'a', function(e) {
			$('#main-menu .active').removeClass('active');
			$(this).addClass('active');
		});
	});

	return function($scope, $route, $routeParams, $location, $http) {

		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;

		refreshMenu();
	};

});