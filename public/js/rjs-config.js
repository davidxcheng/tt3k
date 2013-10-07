requirejs.config({
	// By default load any module IDs from js/lib
    baseUrl: 'js/libs',

    // Except if the module ID 
    paths: {
    	'tt3k': '../tt3k',
    	'tt3kng': '../tt3k-ng'
    },

	shim: {
		'jQuery.1.9.1.min': {
			exports: 'jQuery'
		},
		'bootstrap-datepicker': {
			deps: ['jQuery.1.9.1.min']
		},
		'bootstrap.min': {
			deps: ['jQuery.1.9.1.min']
		},
		'angularjs.1.0.6.min': {
			deps: ['jQuery.1.9.1.min'],
			exports: 'angular'
		},
		'tt3kng': {
			deps: ['angularjs.1.0.6.min'],
			exports: 'tt3kng'
		}
	},

	priority: [
		"angular"
	]
});

// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";

requirejs(['tt3k', 'tt3kng'], function(tt3k, tt3kng) {
	tt3k.setup();
});