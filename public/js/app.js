$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$("#scrape").on("click", function(e) {
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(function() {
    window.location.replace("/");
  })
});

$(".save-article").on("click", function(e) {
  e.preventDefault();
  var thisId = $(this).parents(".card").data("id");
  console.log($(this).parents(".card").data("id"));
  $.ajax({
    method: "GET",
    url: "/save/" + thisId,
  })
  .then(function() {
    // update the page and stuff too
  })
});

$(".unsave-article").on("click", function(e) {
  e.preventDefault();
  var thisId = $(this).parents(".card").data("id");
  console.log($(this).parents(".card").data("id"));
  $.ajax({
    method: "GET",
    url: "/unsave/" + thisId,
  })
  .then(function() {
    // update the page and stuff too
  })
});



// $(document).on("click", "p", function() {
//   $("#notes").empty();
//   var thisId = $(this).attr("data-id");
//   console.log(thisId);

//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     .then(function(data) {
//       console.log(data);
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       $("#notes").append("<input id='titleinput' name='title' >");
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // REPLACE THIS WITH DISPLAYING ALL NOTES
//       if (data.note) {
//         $("#titleinput").val(data.note.title);
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

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
      body: $("#bodyinput").val(),
      article: thisId
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
