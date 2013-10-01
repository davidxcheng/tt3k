define(['jQuery.1.9.1.min'], function($){
	var d = document;

	var stadium = d.getElementById('stadium');

	// mark chosen menu item as active
	var setActiveMenuItem = function($menuItem) {
		$('#main-menu .active').removeClass('active');
		$menuItem.addClass('active');
	};

	// setup behavior for 
	var setup = function () {
		$('#main-menu a').on('click', function(e) {
			e.preventDefault();
			var $menuItem = $(this);
			var url = $(this).attr('href');

			$.ajax({
				url: url,
				success: function(view) {
					tt3k.setActiveMenuItem($menuItem);
					stadium.innerHTML = view;
				}
			});
		});
	};

	return {
		setup: setup
	};
});

/*
(function(tt3k, $, d) {
	tt3k.stadium = d.getElementById('stadium');

	// mark chosen menu item as active
	tt3k.setActiveMenuItem = function($menuItem) {
		$('#main-menu .active').removeClass('active');
		$menuItem.addClass('active');
	};

	// setup behavior for 
	function setup() {
		$('#main-menu a').on('click', function(e) {
			e.preventDefault();
			var $menuItem = $(this);
			var url = $(this).attr('href');

			$.ajax({
				url: url,
				success: function(view) {
					tt3k.setActiveMenuItem($menuItem);
					stadium.innerHTML = view;
				}
			});
		});
	};

	$(document).ready(function() {
		setup();
	});
	
})(window.tt3k = window.tt3k || {}, jQuery, document); */