var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('This is a GET request');
      models.messages.get(function(data) {
        res.send(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function() {
        res.send();
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
