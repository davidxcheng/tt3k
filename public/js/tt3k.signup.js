(function (tt3k, $) {
	$('#btnSignup').on('click', function(){
		var url = $(this).attr('href');

		$.ajax({
			type: 'POST', url: url,
			success: function(view) {
				
			}
		});
	});
})(var tt3k = tt3k || {}, jQuery);