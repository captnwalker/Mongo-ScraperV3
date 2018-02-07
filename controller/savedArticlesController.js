var Article = require('../models/Article.js');
var Note = require('../models/Notes.js');

function grabSavedArticles(req, res) {

    Article.find({ saved: true }, function (error, doc) {

        if (error) {
            console.log(error);
        }

        else {

            res.render('savedArticles', { article: doc });
        }
    });
}
module.exports = {
    grabSavedArticles: grabSavedArticles
}