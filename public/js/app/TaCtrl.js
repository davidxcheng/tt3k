angular.module('trial', ['ui.bootstrap']);
function TaCtrl($scope) {
	$scope.selected = undefined;
	$scope.states = ["Hej", "Hejsan", "Hello"];
}