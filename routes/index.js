
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Trash Talk 3000' });
};