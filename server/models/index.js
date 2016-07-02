var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.retrieveMessages(function(data) {
        cb(data);
      });
    }, // a function which produces all the messages
    post: function (data, cb) {
      db.insertMessages(data, function() {
        cb();
      });//once written call db.insertMessages
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

