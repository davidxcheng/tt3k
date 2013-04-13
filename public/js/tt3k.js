(function(tt3k, $, d) {
	tt3k.stadium = d.getElementById('stadium');
	tt3k.setActiveMenuItem = function($menuItem) {
		$('#main-menu .active').removeClass('active');
		$menuItem.addClass('active');
	};

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
	
})(window.tt3k = window.tt3k || {}, jQuery, document);