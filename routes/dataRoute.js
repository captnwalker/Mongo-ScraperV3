var cheerio = require('cheerio');
var request = require('request');
var controller = require('../controller/controller.js');

module.exports = function (app) {
    app.get("/data", controller.scraperFunction);



};
