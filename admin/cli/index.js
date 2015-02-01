var $ = require('jquery');

$(document).on('dragstart', function(e) {
	e.preventDefault();
	var path = e.target.pathname;

	$.ajax({
		url: path,
		accept: 'application/json',
		dataType: 'json',
		success: function(scores) {
			history.pushState(null, 'title', path);
			var tmpl = $('#scoresTmpl').html(),
				rows = scores.map(function(score) {
					return '<tr><td>' + score.gameday + '</td><td>' + score.player1 + '</td><td>' + score.player2 + '</td><td><a href="/admin/scores/' + score._id + '" class="js-nav">Del</a></td></tr>';
				}).join();

			$('#ken').html(renderScores(scores));

			$('#court').html(tmpl);
			$('#scores').html(rows);
			$('#scores').on('click', 'a', deleteScore);
		}
	});

	function deleteScore(e) {
		e.preventDefault();
		e.stopPropagation();
		var path = e.target.pathname;

		$.ajax({
			type: 'DELETE',
			url: path,
			success: function() {
				console.log('yay');
			}		
		});
	}

	function renderScores(scores) {
		var tmpl = require('./template');

		var rows = scores.map(function(score) {
			return '<tr><td>' + score.gameday + '</td><td>' + score.player1 + '</td><td>' + score.player2 + '</td><td><a href="/admin/scores/' + score._id + '" class="js-nav">Del</a></td></tr>';
		}).join();

		return tmpl;
	}
});