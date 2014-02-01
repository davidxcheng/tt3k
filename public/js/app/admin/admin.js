var global = window,
	instance;

global.admin = $.observable(function(arg) {
	// when called without argument, the API is returned
	if (!arg) return instance;

	// when arg is function, bind a new module
	if ($.isFunction(arg)) {
		admin.on('ready', arg);
	}
	else {
		instance = new Admin(arg);
		instance.on('ready', function() {
			admin.trigger('ready', instance);
		});
	}
});

$(document).ready(function() {
	var tmpl = $('#menu-item-tmpl').html();

	$.ajax({
		url: document.location.href,
		accept: 'application/json',
		dataType: 'json',
		success: function(menuItems) {
			$('#admin-menu').html(menuItems.reduce(function(concat, current) {
				return concat += $.render(tmpl, current);
			}, ''));
		}
	});
});