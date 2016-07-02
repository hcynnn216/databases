var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  // host: 'localhost',
  // port: 3000,
  // address: '127.0.0.1',
  // port: 3000,
  user: 'root', 
  password: '12345',
  database: 'chat'
});

// connection.connect(function(err) {
//   if (err) {
//     console.log('Error connecting to DB', err);
    
//   } else {
//     console.log('Connection established');
//   }
// });

// this function needs to return : {results: {roomname: _, username: _, text: _}}
exports.retrieveMessages = function(cb) {
  connection.connect(function(err) {
    if (err) {
      console.log('Error connecting to DB', err);
      
    } else {
      console.log('Connection established');
    }
  });

  connection.query('SELECT * FROM messages', function(err, rows) {
    if (err) {
      console.log('Failed to retrieve messages. Error: ', err);
    } else {
      console.log('Data recieved from DB');
      var data = {results: []};
      console.log('length: ', rows.length);

      for (var i = 0; i < rows.length; i++) {
        var message = {};
        // res.json(rows);

        message.text = rows[i].text;
        // seperate queries for roomname and username from user_id and room_id?
        message.username = '' + rows[i].user_id;
        message.roomname = '' + rows[i].room_id;
        data.results.push(message);
      }
      cb(JSON.stringify(data));
    }
  });

};

exports.insertMessages = function(message, cb) {
  console.log (message);
  console.log (message.username);
  console.log (message.roomname);
  var newMessage = { text: message.text, 'user_id': 1, 'room_id': 1};
  connection.query('INSERT INTO messages SET?', newMessage, function(err, res) {
    if (err) {
      console.log('Error inserting to db');
    }
    cb();
  });

};
// connection.end(function(err) {
//   console.log('an error?',err);
// });