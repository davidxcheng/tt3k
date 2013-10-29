require.config({
	// By default load any module IDs from the js folder
    baseUrl: 'js/app',

    // Except if the module ID
    paths: {
    	libs: '../libs'
    },

	shim: {
		'libs/jQuery.1.9.1.min': {
			exports: 'jQuery'
		},
		'libs/bootstrap-datepicker': {
			deps: ['libs/jQuery.1.9.1.min']
		},
		'libs/bootstrap.min': {
			deps: ['libs/jQuery.1.9.1.min']
		},
		'libs/angularjs.1.0.6.min': {
			deps: ['libs/jQuery.1.9.1.min'],
			exports: 'angular'
		}
	},

	priority: [
		"libs/angularjs.1.0.6.min"
	]
});

require(['libs/angularjs.1.0.6.min', 'tt3k'], function(ng) {

	ng.element(document).ready(function() {
		ng.bootstrap(document, ['tt3k']);
	});

});