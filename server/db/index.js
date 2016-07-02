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

connection.connect(function(err) {
  if (err) {
    console.log('Error connecting to DB', err);
    
  } else {
    console.log('WHYYYY');
    console.log('Connection established');
  }
});

exports.retrieveMessages = function() {
  connection.query('SELECT * FROM messages', function(err, rows) {
    if (err) {
      console.log('Failed to retrieve messages. Error: ', err);
    } else {
      console.log('Data recieved from DB: \n');
      console.log(rows);
      return rows;

    }
  });

  //write insert function insertMessages
};
// connection.end(function(err) {
//   console.log(err);
// });