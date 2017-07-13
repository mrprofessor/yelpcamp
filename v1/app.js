const express 			= require('express'),
	  ejs				= require('ejs'),
	  mongoose			= require('mongoose'),
	  bodyParser		= require('body-parser'),
	  app				= express();		


app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/yelp_camp');
const CampgroundsSchema = new mongoose.Schema ({
	name : String,
	image: String,
	description: String
});
const Campground = mongoose.model('Campground', CampgroundsSchema)

// Campground.create(
// 	{
// 		name: "Portsalon Camping",
// 		image: "http://www.telegraph.co.uk/content/dam/Travel/2016/may/glamping-portsalon-PR-TRAVEL-large.jpg",
// 		description: "Just five yurts populate this 18-acre site on Donegal’s dramatic Fanad Peninsula and all enjoy views across Lough Swilly. Wood-burners, king-size beds and exposed wood spangled with elegant lights add romance, while there’s a separate building housing the kitchen and communal space. Towels, toiletries and fresh produce from the garden are all provided. It’s a short stroll to sandy Ballymastocker Bay, voted the second best beach in the world (after the Seychelles)."
// }, function(err, Campground){
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("New Campground created.");
// 		console.log(Campground);
// 	}
// });

app.get('/', function(req, res){
	res.render('landing');
});

app.get('/campgrounds', function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
			res.redirect('/');
		} else {
			res.render('index', {campgrounds : allCampgrounds});
		}
	});
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.listen(3000, function(){
	console.log('Yelpcamp V1.0 is running...');
});

  