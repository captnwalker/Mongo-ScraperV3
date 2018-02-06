$(document).ready(function () {
  //On the scraperButton, we have an event listener that performs an AJAX call that is a GET request on the data route. When a get request is made on the data route, it performs the scraper. That can be found in dataRoute.js in the routes folder. That data is returned as a json.
  $("#scraperButton").on("click", function () {
    $.ajax({
      method: "GET",
      url: window.location.origin + "/data",
    })
      //After the data is returned as a json, the function below takes the scrapedData, and for each instance of it, appends it to the DOM in the panelContainer. 
      .done(function (scrapedData) {
        if (scrapedData !== "No new Articles") {
          for (i = 0; i < scrapedData.length; i++) {
            console.log(scrapedData[i].title);
            console.log(scrapedData[i].link);
            console.log("Begin scraping");
            //Creating a panel for the heading and body to lay in. Need to close it after the panel body is inserted. 
            //Creating a variable name newPanelDiv for my panelTitle and panelBody to be placed inside of.
            var newPanelDiv = $('<div>');
            newPanelDiv.addClass('panel panel-default');
            newPanelDiv.attr('id', scrapedData[i]._id);

            //Here, I am creating a variable name panelTitle, which will later contain the title of the article as a hyperlink to the actual article on appleInsider. 
            var panelTitle = $('<div>');
            panelTitle.addClass('panel-heading');

            //Creating a variable name panelBody, which will later contain the postDescription from appleInsider. 
            var panelBody = $('<div>');
            panelBody.addClass('panel-body');

            //Creating a variable named title which is the title for each article from appleInsider.
            var title = $('<h3>');
            title.text(scrapedData[i].title);

            //Creating a variable named link which is the link in an a tag, which I will put the title inside later on to make the title a hyperlink. 
            var link = $('<a>');
            link.addClass('panel-body');
            link.attr('href', scrapedData[i].link);
            link.attr('target', '_blank');

            //Creating a variable named body, which is the postDescription from appleInsider. 
            var body = $('<p>');
            body.text(scrapedData[i].postDescription);

            //Creating a button so that the data from the panel will be saved to the database.
            var button = $('<div>');
            button.addClass('btn btn-primary save-article');
            button.text('Save Article');

            //Appening the title text inside the link so that the title will be a hyperlink to the article. 
            link.append(title);
            //Appending link to the panelTitle section, so that it is the header of the panel.
            panelTitle.append(link);
            //Appending the body to the panelBody so that the body text is the postDescription from apple appleInsider.
            panelBody.append(body);
            //Appending the button to the panelBody section. 
            panelBody.append(button);
            //Appending everything inside the newPanelDiv container.
            newPanelDiv.append(panelTitle);
            newPanelDiv.append(panelBody);
            //Appending newPanelDiv to the page inside the div with an id of #panelContainer.
            $('#panelContainer').append(newPanelDiv);

          }
        } else {
          $('#noNewArticlesModal').modal('toggle');
        }
      });
  });

  // We are saving an article on the click for a button that has a class of save-article, which has been assigned to each button using handlebars. 
  $(document).on('click', '.save-article', function (req, res) {
    //Here, we are creating a variable equal to the id of the object in the database, so that we can use that id in a post route to update the value of the saved value in the db for that particular document when the save button is clicked. 
    var id = $(this).parent().parent().attr('id');
    console.log("Id from save-article section in app.js" + id);
    // console.log({title: title, link: link});
    //Here we are removing the content from the page. We don't want the user to be able to see the content they have saved. 
    $(this).parent().parent().remove();
    //here, we are creating a post route that uses the route saveNewArticle, and takes the id that we took above, and passes that in to the route to be used in the controller. 
    $.post('/saveNewArticle', { _id: id }).done(function (postedData) {
      // console.log("postedData parameter from app.js" + postedData)
    });
  });

  //Here, we are performing an event listener on the element with a class of savedArticles, which is the navbar button. 
  $(document).on('click', '.savedArticles', function (req, res) {
    // Here, we are creating an ajax request using the route savedarticles, and once that route is visited, we have further instructions in the savedArticlesController.js file. 
    $.get('/savedarticles').done(function (data) {

    });
  });
})