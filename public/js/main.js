require.config({
	// By default load any module IDs from the js folder
    baseUrl: 'js/app',

    // Except if the module ID
    paths: {
    	libs: '../libs',
    	moment: '../libs/moment.min'
    },

	shim: {
		'libs/jquery.1.9.1.min': {
			exports: 'jQuery'
		},
		'libs/bootstrap-datepicker': {
			deps: ['libs/jquery.1.9.1.min']
		},
		'libs/ui.bootstrap.tpls.0.6.0': {
			deps: ['libs/angularjs.1.0.6.min']
		},
		'libs/angularjs.1.0.6.min': {
			deps: ['libs/jquery.1.9.1.min'],
			exports: 'angular'
		}
	},

	priority: [
		"libs/angularjs.1.0.6.min"
	]
});

require(['libs/angularjs.1.0.6.min', 'boot'], function(ng) {

	ng.element(document).ready(function() {
		// bootstrap replaces the ng-app directive. the 'tt3k' module is registered in boot.js.
		ng.bootstrap(document, ['tt3k']);
	});

});