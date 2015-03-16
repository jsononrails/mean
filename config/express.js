var
	config 			= require('./config'),
	http			= require('http'),
	socketio		= require('socket.io'),
	express 		= require('express'),
	morgan 			= require('morgan'),
	compress 		= require('compression'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	session			= require('express-session'),
	MongoStore		= require('connect-mongo')(session),
	flash			= require('connect-flash'),
	passport		= require('passport');

module.exports = function() {
	var
		app = express(),
		server = http.createServer(app),
		io = socketio.listen(server);
	
	// load environment from system variable
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	
	// config body parser
	app.use(bodyParser.json());
	app.use(methodOverride());
	
	
	
	// config sessions
	var mongoStore = new MongoStore({
	
		db: db.connection.db
		
	});
	
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));
	
	// register views
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	
	// config flash messaging
	app.use(flash());
	
	// config passport
	app.use(passport.initialize());
	app.use(passport.session());
	
	// import routes
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app);
	
	// register static files
	app.use(express.static('./public'));
	
	// register socketio
	require('./socketio')(server, io, mongoStore);
	
	return server;
};