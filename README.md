# Mongoose Scraper for [NintendoLife.com](https://www.nintendolife.com "NintendoLife.com front page")!
Wanna skip all the ads and junk, and get to the good stuff on Nintendo's latest adventures and antics? Look no further.

## What is this app?
This is an app that will use web scraping techniques to obtain links and basic info from the news items on the front page of NintendoLife.com's website, then display it in a list of cards.

From there, there are a couple things you can do:
1. You can 'save' individual articles to view later. This will give the card a green highlight to signify that it's saved.
2. You can add a comment to each article to keep track of individual notes that you may have for the article.

## How does it work?
On the front end, a little bit of Bootstrap and jQuery for a basic and relatively clean layout. Handlebars is the technology used to control the views, so there's ultimately only one main page with some templated components.

Node.js and the Express framework are used to run the application on the back end, along with MongoDB and Mongoose to supply and store the data in a database. Further, the Cheerio package is what's used for scraping the data from the NintendoLife front webpage.

The MongoDB database consists of one collection of articles and one collection of notes. The notes associate with a specific article. In the articles, values are stored to track if the article is saved, along with placeholder values for changing properties on the card using JQuery.

The application itself is available for usage online, at Heroku.

## How do I use the app?
The interface is fairly intuitive. Go to the page; there may be articles shown from the last user; you can clear anything not saved by clicking the 'Clear unsaved' button. Otherwise, you can click the "Scrapey scrapey" button to get current articles!

After that, you can use the 'Visit' link to look at the whole article on NintendoLife. You can use the 'Save' and 'Unsave' buttons to determine which articles will persist through the next 'clear'.

Finally, the Note button will let you jot down a note about the article that other users can see.

## Heroku demo now?

Sure thing: [Ctrl+click here to try it out in a new browser tab.](https://ag-mongoose-scraper.herokuapp.com/ "Adam G NintendoLife Mongoose Scraper")
