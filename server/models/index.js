var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      var rows = db.retrieveMessages();
    }, // a function which produces all the messages
    post: function () {
      //once written call db.insertMessages
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

