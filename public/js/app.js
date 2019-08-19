var noteId = '';

$("#scrape").on("click", function (e) {
  e.preventDefault();
  $.ajax({
      method: "GET",
      url: "/scrape"
    })
    .then(function () {
      window.location.replace("/");
    })
});

$("#clear").on("click", function (e) {
  e.preventDefault();
  $.ajax({
      method: "GET",
      url: "/clear"
    })
    .then(function () {
      window.location.replace("/");
    })
});


// MISC FUNCTIONS

colorBg = item => {
  if (item.saved) {
    $(this).addClass("saved");
  } else {
    $(this).removeClass("saved")
  }
}


$(".save-article").on("click", function (e) {
  e.preventDefault();
  var thisId = $(this).parents(".card").data("id");
  $.ajax({
      method: "GET",
      url: "/save/" + thisId,
    })
    .then(function () {
      $("#" + thisId).children("div.card-body").addClass("saved");
      $("#" + thisId).children("div.card-body").children(".save-article").addClass("disabled");
      $("#" + thisId).children("div.card-body").children(".unsave-article").removeClass("disabled");
      // update the page and stuff too
    })
});

$(".unsave-article").on("click", function (e) {
  e.preventDefault();
  var thisId = $(this).parents(".card").data("id");
  $.ajax({
      method: "GET",
      url: "/unsave/" + thisId,
    })
    .then(function () {
      $("#" + thisId).children("div.card-body").removeClass("saved");
      $("#" + thisId).children("div.card-body").children(".save-article").removeClass("disabled");
      $("#" + thisId).children("div.card-body").children(".unsave-article").addClass("disabled");
      // update the page and stuff too
    })
});

$(".note-button").on("click", function (e) {
  e.preventDefault();
  noteId = $(this).parents(".card").data("id");
  console.log(noteId);
  var noteFields = $(this).parents(".card-body").children(".submitNote");

  $(this).parents(".card-body").children(".card-text").addClass("hidden");
  $(this).parents(".card-body").children(".buttons-area").addClass("hidden");
  $(this).parents(".card-body").children(".submitNote").removeClass("hidden");
  $(".note-button").addClass("disabled");

  $.ajax({
      method: "GET",
      url: "/articles/" + noteId
    })
    .then(function (data) {
      console.log(data);
      var note = data.note.note;
      var title = data.note.title;

      noteFields.children("textarea#title-input").text(title);
      noteFields.children("textarea#note-input").text(note);
    });
});

$(".submit-note").on("click", function (e) {
  e.preventDefault()
  var noteTitle = $(this).parents("div.submitNote").children("textarea#title-input").val();
  var noteNote = $(this).parents("div.submitNote").children("textarea#note-input").val();

  $(this).parents(".card-body").children(".card-text").removeClass("hidden");
  $(this).parents(".card-body").children(".buttons-area").removeClass("hidden");
  $(this).parents(".card-body").children(".submitNote").addClass("hidden");
  $(".note-button").removeClass("disabled");

  console.log(noteTitle);
  console.log(noteNote);
  console.log(noteId);

  $.ajax({
      method: "POST",
      url: "/articles/" + noteId,
      data: {
        title: noteTitle,
        note: noteNote,
        article: noteId
      }
    })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
    });
});