var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoosescraper", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// ROUTES

app.get("/", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      // console.log(dbArticle);
      console.log("Get request received for all articles.");
      res.render("index", {
        articles: dbArticle
      });
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/scrape", function (req, res) {
  db.Article.remove({ saved: false }, function(err) {
    console.log("Unsaved articles removed.");
  });
  axios.get("https://www.nintendolife.com/news").then(function (response) {
    var $ = cheerio.load(response.data);
    $(".item-wrap").each(function (i, element) {
      var result = {};
      result.title = $(this)
        .children(".info")
        .children(".info-wrap")
        .children(".heading")
        .children("a")
        .children(".title").text();
      console.log(result.title);
      result.category = $(this)
        .children(".info")
        .children(".info-wrap")
        .children(".heading")
        .children("a")
        .children(".category").text();
      console.log(result.title);
      result.description = $(this)
        .children(".info")
        .children(".info-wrap")
        .children(".text").text();
      console.log(result.description);
      result.image = $(this)
        .children(".image")
        .children(".img")
        .children("img").attr("src");
      console.log(result.image);
      result.link = "https://www.nintendolife.com/";
      result.link += $(this)
        .children(".info")
        .children(".info-wrap")
        .children(".heading")
        .children("a").attr("href");
      console.log(result.link);
      result.saved = false;

      db.Article.create(result)
        .then(function (dbArticle) {
          // console.log(dbArticle);
          console.log("Scrape request processed.");
          res.redirect("/");
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
});

app.get("/save/:id", function(req, res) {
  db.Article.findOneAndUpdate({
    _id: req.params.id
  },{
    saved: true
  })
  .then(function (dbArticle){
      res.json(dbArticle)
  })
  .catch(function(err){
    console.log("Error:");
    console.log(err);
  });
});

app.get("/unsave/:id", function(req, res) {
  db.Article.findOneAndUpdate({
    _id: req.params.id
  },{
    saved: false
  })
  .then(function (dbArticle){
    res.json(dbArticle);
  })
  .catch(function(err){
    console.log(err);
  })
});

app.get("/articles", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/articles/:id", function (req, res) {
  db.Article.findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    })
});

app.post("/articles/:id", function (req, res) {
  db.Note.create(req.body)
    // .then(function (dbNote) {
    //   return db.Article.findOneAndUpdate({
    //     _id: req.params.id
    //   }, {
    //     note: dbNote._id
    //   }, {
    //     new: true
    //   });
    // })
    .then(function (dbArticle) {
      res.json(dbArticle);
      console.log('======POST RESPONSE======');
      console.log(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// START SERVER

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});