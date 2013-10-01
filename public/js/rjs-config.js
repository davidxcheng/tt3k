requirejs.config({
	// By default load any module IDs from js/lib
    baseUrl: 'js/libs',

    // Except if the module ID 
    paths: {
    	tt3k: '../tt3k'
    },

	shim: {
		'jQuery.1.9.1.min': {
			exports: 'jQuery'
		}
	},
});

requirejs(['tt3k'], function(tt3k) {
	tt3k.setup();
});