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
      console.log('Data recieved from DB: \n');
      console.log(rows);
      var body = {result: {}};
      // res.json(rows);
      console.log(rows[0].text);

      body.result.text = rows[0].text;
      console.log(body);
      cb(rows);

    }
  });

};

exports.insertMessages = function(message) {
  
  var insertMessage = {id: 1, text: 'hello world', 'user_id': 1, 'room_id': 1};
  connection.query('INSERT INTO messages SET ?', insertMessage, function(err, res) { });

};
// connection.end(function(err) {
//   console.log('an error?',err);
// });