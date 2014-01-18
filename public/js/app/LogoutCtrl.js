define(['libs/angularjs.1.0.6.min'], function(ng, $http, $location) {

	var refreshMenu = function() {
		$.get('/menu', function(menuItems) {
			$('#main-menu').html(menuItems);
		});
	};

	return function($http, $location) {
		$http.post('/logout', {}).success(function() {
			refreshMenu();
			$location.path('/');
		});
	};

});