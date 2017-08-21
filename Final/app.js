"use strict";
const express 			= require('express'),
	  ejs				= require('ejs'),
	  mongoose			= require('mongoose'),
	  bodyParser		= require('body-parser'),
	  app				= express(),
	  passport			= require('passport'),
	  flash				= require("connect-flash"),
	  localStrategy		= require('passport-local'),
	  methodOverride	= require('method-override'),
	  Campground 		= require('./models/campground'),
	  Comment 			= require('./models/comment'),
	  User				= require('./models/user'),
	  seedDB			= require('./seeds');

// Requiring routes
const commentRoutes 	= require("./routes/comments"),
	  campgroundRoutes	= require("./routes/campgrounds"),
	  indexRoutes		= require("./routes/index");
	
	
app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(flash());


// seedDB(); //Seeds the Database
// const process.env.DATABASEURL = mongodb://localhost/yelp_camp;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL,{ useMongoClient: true });
// mongoose.connect('mongodb://prof:hellorudra@ds153413.mlab.com:53413/yelpcamp007',{ useMongoClient: true });
// mongodb://<dbuser>:<dbpassword>@ds153413.mlab.com:53413/yelpcamp007





// ==================!!==================================
//PASSPORT CONFIG  --||
// ==================\/==================================
app.use(require('express-session')({
	secret : "Mrprofessor love kittens.",
	resave : false,
	saveUninitialize : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use('/', indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

// C9 Specific
app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Yelpcamp is running...');
});

//Local machine specific
// app.listen(3000, function(){
// 	console.log('Yelpcamp is running...')
// });
