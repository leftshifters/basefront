var MongoClient = require('mongodb').MongoClient,
	MongoServer = require('mongodb').Server,
	Db  = require('mongodb').Db;




var connectDatabase = function(req,res,next){
	var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.alias;
		var server = new MongoServer("127.0.0.1", port, {auto_reconnect: true}, {w:1});
		db = new Db(dbName,server);
		db.open(function(err,db){
		if(err) return next(err);
		 db.collectionNames(function(err,collections){
		 	if (err) return next(err);
		 	res.response =res.response || {};
		 	res.response.data = collections;
			next();
		 });

	});
};



exports.connectDatabase = connectDatabase;