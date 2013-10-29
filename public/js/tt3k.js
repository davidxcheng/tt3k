define([
	'angularjs.1.0.6.min',
	'tt3k.routes'
	],
	function(ng) {
		return ng.module('tt3k', [
				'controllers'
			]);
	});

/*
define(['jQuery.1.9.1.min'], function($){

	var setup = function () {

		// mark chosen menu item as active
		var setActiveMenuItem = function($menuItem) {
			$('#main-menu .active').removeClass('active');
			$menuItem.addClass('active');
		};

		$('#main-menu a').on('click', function(e) {
			e.preventDefault();
			var $menuItem = $(this);
			var url = $(this).attr('href');

			$.ajax({
				url: url,
				success: function(view) {
					tt3k.setActiveMenuItem($menuItem);
					document.getElementById('stadium').innerHTML = view;
				}
			});
		});
	};

	return {
		setup: setup
	};
});*/