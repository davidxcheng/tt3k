define(['libs/angularjs.1.0.6.min'], function(ng) {

	var refreshMenu = function() {
		$.get('/menu', function(menuItems) {
			$('#main-menu').html(menuItems);
		});
	};

	return function($http) {
		$http.post('/logout', {}).success(function(){
			refreshMenu();
		});
	};

});