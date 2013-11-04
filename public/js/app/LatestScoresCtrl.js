define(['libs/angularjs.1.0.6.min', 'libs/jquery.1.9.1.min'], function(ng, $) {

	return function($scope, $http) {
		$scope.scores = [];

		$http.get('/scores/latest')
			.success(function(scores) {
				$scope.scores = scores;
				$('#root').addClass('active');
			});
	};
});