var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.retrieveMessages(function(rows) {
        cb(rows);
      });
    }, // a function which produces all the messages
    post: function (data) {
      db.insertMessages(data);//once written call db.insertMessages
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

