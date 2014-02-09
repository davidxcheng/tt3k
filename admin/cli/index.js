var $ = require('jquery');

window.onpopstate = function(e) {
	console.log(e);
};

$(document).on('click', '.js-nav', function(e) {
	e.preventDefault();
	var path = e.target.pathname;

	$.ajax({
		url: path,
		accept: 'application/json',
		dataType: 'json',
		success: function(scores) {
			history.pushState(null, 'Scores', path);
			var tmpl = $('#scoresTmpl').html(),
				rows = scores.map(function(score) {
					return '<tr><td>' + score.gameday + '</td><td>' + score.player1 + '</td><td>' + score.player2 + '</td><td><a href="/admin/scores/' + score._id + '" class="js-nav">Del</a></td></tr>';
				}).join();
			$('#court').html(tmpl);
			$('#scores').html(rows);
			$('#scores').on('click', 'a', deleteScore);
		}
	});

	function deleteScore(e) {
		e.preventDefault();
		e.stopPropagation();
		var path = e.target.pathname;
		console.log(path);

		$.ajax({
			type: 'DELETE',
			url: path,
			success: function() {
				console.log('yay');
			}		
		});

		e.stop
	}
});

// $(document).ready(function() {
// 	var tmpl = $('#menu-item-tmpl').html();

// 	$.ajax({
// 		url: document.location.href,
// 		accept: 'application/json',
// 		dataType: 'json',
// 		success: function(menuItems) {
// 			$('#admin-menu').html(menuItems.reduce(function(concat, current) {
// 				return concat += $.render(tmpl, current);
// 			}, ''));
// 		}
// 	});
// });