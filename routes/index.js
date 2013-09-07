
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.cookie('hostname','localhost');
	res.cookie('port',27017);
	res.cookie('dbname','test');
  res.render('index', { title: 'Express' });
};