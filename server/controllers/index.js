var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('This is a GET request');
      models.messages.get(function(rows) {
        var body = {result: {}};
        // res.json(rows);
        console.log(rows[0].text);
        body.result.text = rows[0].text;
        console.log(body);
        // res.set(header, defaultCorsHeaders);
        res.send(body);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
