// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class='card blue-grey darken-1'><div class='card-content white-text'><p data-id='" + data[i]._id + "'>" + "<span class='card-title'>"+data[i].title+"</span><p id='notesText'></p>" + "<div class='card-action'><a href='"+ "https://fantasyflightgames.com/" + data[i].link +"'>" + "https://fantasyflightgames.com/" + data[i].link + "</a></p></div></div>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the link
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<div class='card blue-grey darken-1'><div class='card-content white-text'><div class='card-title'>" + data.title + "</div><input placeholder='Note Title' id='titleinput' name='title'><textarea id='bodyinput' class='materialize-textarea'></textarea><a class='waves-effect waves-light btn' data-id='" + data._id + "'id='savenote'>Save Note</a><a class='waves-effect waves-light btn' data-id='" + data._id + "'id='clearnote'>Clear Note</a></div></div>");
      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });
    
  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the clearnote button
$(document).on("click", "#clearnote", function() {
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
