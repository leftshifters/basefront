
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var serverController =  require('./server/controllers/dbserver');
var databasecontroller = require('./server/controllers/userDatabase');
var collcontroller = require('./server/controllers/dbCollections');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function buildResponse(req, res, next) {
	res.response = res.response || {};
	next();
});

app.get('/', routes.index);

app.get('/dbs', routes.dbs);

app.get('/dbs/collections', routes.index);
app.get('/dbs/collections/documents', routes.index);

app.get('/users', user.list);


app.get('/servername',[serverController.connectServer]); //this will bring the list of databases

app.get('/servername/dbname',[databasecontroller.connectDatabase]); // list of collections

app.get('/servername/dbname/collname',[collcontroller.getDocuments]); // list of documents

app.get('/servername/dbname/collname/doc',[collcontroller.getDocument]); // single document

app.post('/documents',[collcontroller.createDocument]); // create document

app.post('/servername/dbname/collname/doc',[collcontroller.updateDocument]); // upate document

//app.delete('servername/dbname/collname/doc',[collcontroller.deleteDocument]) // delete document

app.use(function(req, res, next) {
  res.json(res.response || {});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
