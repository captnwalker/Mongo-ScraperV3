var Article = require('../models/Article.js');
var Note = require('../models/Notes.js');

//Create the function for grabbing the saved articles, and displaying them in the savedArticles.handlebars file. 
function grabSavedArticles(req, res) {
    //Finding all articles that have a saved value of true.
    Article.find({ saved: true }, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            // console.log("doc in savedArticlesController" + doc);
            // Rendering those documents in the savedArticles.handlebars file. 
            res.render('savedArticles', {article: doc});
        }
    });
}

//Exporting for cross file use. 
module.exports = {
    grabSavedArticles: grabSavedArticles
}