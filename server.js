var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Article = require("./models/Article.js")
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//create static directories
app.use(express.static('public'));
app.use(methodOverride('method'));

//mongoose connection
mongoose.connect("mongodb://heroku_f00tf40l:jrgr7hv8hi0br8eh5mleqr01p3@ds125578.mlab.com:25578/heroku_f00tf40l");
var db = mongoose.connection;

//mongoose connections success or fail
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//settings for handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//set up Express App
app.set('trust proxy', '1');

require("./routes/homeRoute.js")(app);
require("./routes/dataRoute.js")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
