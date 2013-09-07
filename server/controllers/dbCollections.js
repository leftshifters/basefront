var MongoClient = require('mongodb').MongoClient,
	MongoServer = require('mongodb').Server,
	Db  = require('mongodb').Db;


var getDocuments = function(req,res,next){
		var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.dbname,
		collectionName = req.cookies.collectionName ||  'names';
		var server = new MongoServer(hostName,port,{auto_reconnect: false, poolSize: 4}, {w:0, native_parser: false});
		db = new Db(dbName,server);
		db.open(function(err,db){
			if (err) return next(err);
			db.collection(collectionName).find().toArray(function(err,docs){
				if (err) return next(err);
				res.response = res.response || {};
				res.response.data = docs;
				next();
			});
		})


};

exports.getDocuments = getDocuments;