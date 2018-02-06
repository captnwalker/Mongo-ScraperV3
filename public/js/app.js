$(document).ready(function () {
  $("#scraperButton").on("click", function () {
    $.ajax({
      method: "GET",
      url: window.location.origin + "/data",
    }) 
      .done(function (scrapedData) {
        if (scrapedData !== "No new Articles") {
          for (i = 0; i < scrapedData.length; i++) {
            console.log(scrapedData[i].title);
            console.log(scrapedData[i].link);
            console.log("Begin scraping");
           
            var newPanelDiv = $('<div>');
            newPanelDiv.addClass('panel panel-default');
            newPanelDiv.attr('id', scrapedData[i]._id);

            var panelTitle = $('<div>');
            panelTitle.addClass('panel-heading');

            var panelBody = $('<div>');
            panelBody.addClass('panel-body');

            var title = $('<h3>');
            title.text(scrapedData[i].title);
 
            var link = $('<a>');
            link.addClass('panel-body');
            link.attr('href', scrapedData[i].link);
            link.attr('target', '_blank');

            var body = $('<p>');
            body.text(scrapedData[i].postDescription);

            var button = $('<div>');
            button.addClass('btn btn-primary save-article');
            button.text('Save Article');
 
            link.append(title);
            panelTitle.append(link);            
            panelBody.append(body);
            panelBody.append(button);
            newPanelDiv.append(panelTitle);
            newPanelDiv.append(panelBody);
            $('#panelContainer').append(newPanelDiv);

          }
        } else {
          $('#noNewArticlesModal').modal('toggle');
        }
      });
  });

  $(document).on('click', '.save-article', function (req, res) {
    var id = $(this).parent().parent().attr('id');
    console.log("Id from save-article section in app.js" + id);
    $(this).parent().parent().remove();
    $.post('/saveNewArticle', { _id: id }).done(function (postedData) {
    });
  });

  $(document).on('click', '.savedArticles', function (req, res) {
    $.get('/savedarticles').done(function (data) {

    });
  });
})