//Requiring the cheerio NPM package since it is needed for the scraper.
var cheerio = require('cheerio');
//Requires the request package, which is needed for the cheerio npm package. 
var request = require('request');

var dataController = require('../controller/dataController.js');

module.exports = function (app) {
    //On a get request for the route /data, the scraper is fired. Right now, we are calling this in the app.js file in the public directory. 
    app.get("/data", dataController.scraperFunction);



};
