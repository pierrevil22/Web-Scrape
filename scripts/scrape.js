// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article");

//scrape articles from the New YorK Times
var scrape = function(callback) {


  request("https://www.nytimes.com/", function(error, response, html) {

      var $ = cheerio.load(html);

      var articlesArr = [];
      $("article").each(function(i, element) {
        let link = "https://www.nytimes.com/"+$(element).find('a').attr('href');
        let summary=$(element).find('p').text();
        let title = $(element).find('h2').text();
        //   // Add the text and href of every link, and save them as properties of the result object
        //   result.title = $(this).children("a").text();
        //   result.link = $(this).children("a").attr("href");

          if (!title) {
            title==="no title available"
          }

        articlesArr.push({
            link: link,
            summary: summary,
            title: title
        })
      });
      console.log(articlesArr)
    //   callback(articlesArr);

      Article.create(articlesArr)
      .then(function(dbArticle){
          console.log(articlesArr)
          res.json(callback)
      }).catch(function(err){
          console.log(err)
      })

  });

};

module.exports = scrape;