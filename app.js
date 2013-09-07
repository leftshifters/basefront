
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
app.get('/users', user.list);
app.get('/servername',[serverController.connectServer]);
app.get('/servername/dbname',[databasecontroller.connectDatabase]);
app.get('/servername/dbname/collname',[collcontroller.getDocuments]);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
