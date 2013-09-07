var MongoClient = require('mongodb').MongoClient,
	MongoServer = require('mongodb').Server,
	Db  = require('mongodb').Db;



var connectServer = function(req,res,next){
	var hostName = req.cookies.hostname,
		port = req.cookies.port;
	var server = new MongoServer(hostName , port , {auto_reconnect: true});
	var db = new Db('test',server);
	res.response = res.response || {};
	db.open(function(err,db){
		if (err) return next(err);
		db.admin().listDatabases(function(err,dbs){
	 		if (err) return next(err);
	 		res.response.data = dbs;
	 		next();
	 	});		
	})

	

};





exports.connectServer = connectServer;