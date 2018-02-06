var articleNotesController = require('../controller/articleNotesController.js');

module.exports = function (app) {
    app.get('/articleNotes/:id', articleNotesController.findNotes);


    
};