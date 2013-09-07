var MongoClient = require('mongodb').MongoClient,
	MongoServer = require('mongodb').Server,
	Db  = require('mongodb').Db;




var connectDatabase = function(req,res,next){
	var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.dbname;
		var server = new Server(hostname,port,{auto_reconnect:true});
		db = new Db(dbName,server);
		db.open(function(err,db){
		if(err) return next(err);
		var collections = db.getCollectionNames();
		res.response.data = collections;
		next();
	});
};



exports.connectDatabase = connectDatabase;