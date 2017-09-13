'use strict';

var rp = require("request-promise");

// Constants
const QUOTES_REST_URL = "https://quotes.rest/qod"
const FORISMATIC_URL = "http://api.forismatic.com/api/1.0/"

class Quote {
  constructor() { }

  quoteOfDay() {
    var options = {
      uri: QUOTES_REST_URL,
      headers: {
        'Accept': 'application/json'
      },
      json: true
    };

    return rp(options)
      .then(function (quote) {
        var quoteData = {};
        let quotes = quote["contents"]["quotes"][0];

        quoteData["quote"] = quotes["quote"];
        quoteData["author"] = quotes["author"];
        return quoteData;
      })
      .catch(function (err) {
        throw err;
      });
  }

  randomQuote() {
    var options = {
      method: 'POST',
      uri: FORISMATIC_URL,
      body: 'method=getQuote&key=457653&format=json&lang=en',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      json: true,
    };

    return rp(options)
      .then(function (quote) {
        var quoteData = {};
        quoteData["quote"] = quote["quoteText"];
        quoteData["author"] = quote["quoteAuthor"];
        return quoteData;
      })
      .catch(function (err) {
        throw err;
      });
  }
}

module.exports = Quote;
