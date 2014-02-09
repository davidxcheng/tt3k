var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('cs50xplz'));
app.use(express.session());
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
app.use(express.static(path.join(__dirname, 'admin/cli/build')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/router').setup(app);

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
