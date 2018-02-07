var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create article schema
var ArticleSchema = new Schema({

    title: {
        type: String,
        index: true,
        unique: true,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
});

//create article model using ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

//export the article model
module.exports = Article;
