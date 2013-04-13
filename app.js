/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// setup stylus with custom compile
var stylus = require('stylus');
function compile(str, path) {
	return stylus(str).define('url', stylus.url({ limit: 1000000 }));	
}

app.use(stylus.middleware({ 
	src: 		__dirname + '/public',
	compile: 	compile
}));

app.use(express.static(path.join(__dirname, 'public')));

// connect to database
var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/tt3k', function (err) {
	if (!err)
		console.log('Connected to the database.');
	else
		console.log('Failed to connect to database.')
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/router').setup(app, mongoClient);

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
