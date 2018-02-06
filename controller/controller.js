var cheerio = require('cheerio');
var request = require('request');
var Article = require('../models/Article.js');


//scrapper function
function scraperFunction(req, res) {
    //array to store the articles
    var result = [];
    request('http://www.appleinsider.com', function (error, response, html) {
        //modal if no new articles to display
        if (error) res.send("No new Articles");
        var $ = cheerio.load(html);
        $('div.post').each(function (i, element) {

            var link = $(element).children('h1').children('a').attr('href');
            var title = $(element).children('h1').text();
            var postDescription = $(element).children('div').children(".post-description").text();
                result.push({
                    title: title,
                    link: link,
                    postDescription: postDescription
                });
        });

        Article.insertMany(result, function (err, doc) {
            if (err) {
                console.log(err);
                res.json("No new Articles");
            } else {
                res.json(doc);
            }
        });
    });
}

function displayUnsavedArticles(req, res) {
    Article.find({ saved: false }, function (err, doc) {
        if (err) throw err;
        res.render('index', { article: doc });
    });
}

function saveArticle(scrapedArticle) {
    var newArticle = new Article(scrapedArticle);

    newArticle.save(function (err, doc) {
        if (err) throw err;
        return doc;
    });
};

module.exports = {
    scraperFunction: scraperFunction,
    displayUnsavedArticles: displayUnsavedArticles,
    saveArticle: saveArticle
}



