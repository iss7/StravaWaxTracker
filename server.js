// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport'),
    url = require('url'),
    StravaStrategy = require('passport-strava-oauth2').Strategy;
var User = require('./app/models/user');

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(passport.initialize());
require('dotenv').config();
passport.use(new StravaStrategy ({
	clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_REDIRECT_URI
	},
	function(accessToken, refreshToken, profile, done) {
	    // asynchronous verification, for effect...
	    process.nextTick(function () {
		 	// associate the Strava account with a user record in your database,
			// and return that user
			var new_user = new User({name : profile.displayName,
				activities : null,
				oauth_key : accessToken,
				email : profile.emails[0].value,
				phone_number : null});
			new_user.save(function (err) {
				if (err) return console.log(err);
			});
			return done(null, new_user);
	    });
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(user_id, done) {
	User.findById(user_id, function (err, user) {
		if (err) return console.log(err);
		done(null, user);
	})
});

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
