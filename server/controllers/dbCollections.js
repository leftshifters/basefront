var MongoClient = require('mongodb').MongoClient,
	MongoServer = require('mongodb').Server,
	Db  = require('mongodb').Db;


var getDocuments = function(req,res,next){
	console.log(req.cookies);
		var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.alias,
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
var getDocument = function(req,res,next){
	var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.dbname,
		collectionName = req.cookies.collectionName ||  'names';
	var server = new MongoServer(hostName,port,{auto_reconnect: false, poolSize: 4}, {w:0, native_parser: false});
	db = new Db(dbName,server);
	db.open(function(err,db){
		db.open(function(err,db){
			if (err) return next(err);
			db.collection(collectionName).findOne({_id: new ObjectID(req.body.docid)},function(err,doc){
				if (err) return next(err);
				res.response.data = doc;
				next();
			})
		})
	});
}

var createDocument = function(req,res,next){
	var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.dbname,
		collectionName = req.cookies.collectionName;
	var server = new MongoServer(hostName,port,{auto_reconnect: false, poolSize: 4}, {w:0, native_parser: false});
	db = new Db(dbName,server);
		db.open(function(err,db){
			if (err) return next(err);
			db.collection(collectionName).insert(req.body,function(err,doc){
				if (err) return next(err);
				res.response = res.response || {};
				res.response.data = doc;
				next();
			});
		});
	
};

var updateDocument = function(req,res,next){
	var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.dbname,
		collectionName = req.cookies.collectionName ||  'names';
	var server = new MongoServer(hostName,port,{auto_reconnect: false, poolSize: 4}, {w:0, native_parser: false});
	db = new Db(dbName,server);
	db.open(function(err,db){
		db.open(function(err,db){
			if (err) return next(err);
			var collection = db.collection(collectionName);
			collection.findOne(req.body.oldDoc,function(err,doc){
				if (err) return next(err);
				doc = req.body.newDoc;
				collection.update(req.body.oldDoc,doc,function(err,updatedDoc){
					if(err) return next(err);
					res.response.data = updatedDoc;
					next();
				})

			});
		});
	});
};


var deleteDocument = function(req,res,next){
	var hostName = req.cookies.hostname,
		port = req.cookies.port,
		dbName = req.cookies.dbname,
		collectionName = req.cookies.collectionName ||  'names';
};



exports.getDocuments = getDocuments;
exports.getDocument = getDocument;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
