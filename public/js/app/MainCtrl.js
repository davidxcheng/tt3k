define(['libs/angularjs.1.0.6.min', 'libs/jQuery.1.9.1.min'], function(ng, $) {
	console.log('bb');

	var refreshMenu = function() {
		$.get('/menu', function(menuItems) {
			$('#main-menu').html(menuItems);
		});
	};

	$('#main-menu a').on('click', function(e) {
		$('#main-menu .active').removeClass('active');
		console.log("fdfsdf");
		$(this).addClass('active');
	});

	return function($scope, $route, $routeParams, $location, $http) {

		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;

		refreshMenu();
	};

});