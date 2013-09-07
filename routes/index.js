
/*
 * GET home page.
 */

var maxAge = 9000000000;

exports.index = function(req, res){


  res.render('index', { title: 'Basefront' });
};

exports.dbs = function(req, res) {
  res.render('index', { title: 'Databases | Basefront' });
};