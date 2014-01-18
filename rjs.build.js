({
	baseUrl: "./public/js/app",
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
	name: "../main",
	out: "./public/js/bundle.js"
})