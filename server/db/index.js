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

  // var data = {results: []};

  connection.query('SELECT * FROM messages', function(err, rows) {
    if (err) {
      console.log('GET Failed to retrieve messages. Error: ', err);
    } else {
      console.log('Data recieved from DB');
      console.log('length: ', rows.length);
      var data = {results: []};
      for (var i = 0; i < rows.length; i++) {
        var message = {};
        // res.json(rows);

        message.text = rows[i].text;
        message.roomname = '' + rows[i].room_id;
        // seperate queries for roomname and username from user_id and room_id?
        message.username = rows[i].user_id;
        // data.results.push(message);
        data.results.push(message);
      }

      // connection.query('SELECT username FROM users', function(err, users) {
      //   if (err) {
      //     console.log('GET Error retrieving new userID from users table');
      //   } else {
      //     for (var j = 0; j < data.results.length; j++) {
      //       console.log('line 59 i: ',j );
      //       console.log('line 60: ', data.results[0]);
      //       var ID = data.results[j].username;
      //       console.log('line 66: ', ID);
      //       console.log('line 67: ',users[0]);
      //       data.results[i].username = users[0].username;
      //       console.log('line 70', data);
      //     }
      //     cb(JSON.stringify(data));
      //   }
      // });
      var queryID = function(num) {

        if (num === data.results.length) {
          cb(JSON.stringify(data));
          return; 
        }

        connection.query('SELECT username FROM users WHERE users.id=' + data.results[num].username, function(err, users) {
          if (err) {
            console.log('GET Error retrieving new userID from users table');
          } else {
            data.results[num].username = users[0].username;
            
            queryID(num + 1);
          }
        });
      };
      queryID(0);
    }
  });
  
  // cb(JSON.stringify(data));

};

exports.insertMessages = function(message, cb) {
  console.log (message);
  console.log (message.username);
  console.log (message.roomname);
  var username = message.username;
  var userID;
  connection.query("SELECT id FROM users WHERE username = '" + message.username + "'", function(err, rows) {
    if (err) {
      console.log('POST Failed to retrieve user ids from users table. ERROR: ', err);
    } else {
      if (rows.length === 0) {
        // connection.query('INSERT INTO users SET?', {username: message.username}, function(err, res) {
        //   console.log('POST Error inserting username to users table');
        // });

        // connection.query("SELECT id FROM users WHERE username = '"+ message.username + "'", function(err, rows) {
        //   if (err) {
        //     console.log('POST Error retrieving new userID from users table');
        //   } else {
        //     userID = rows[0].id;
        //   }
        // });
        connection.query('INSERT INTO users SET?', {username: message.username}, function(err, res) {
          console.log('POST Error inserting username to users table');

          connection.query("SELECT id FROM users WHERE username = '"+ message.username + "'", function(err, rows) {
            if (err) {
              console.log('POST Error retrieving new userID from users table');
            } else {
              userID = rows[0].id;
              var newMessage = { text: message.text, 'user_id': userID, 'room_id': 1};


              connection.query('INSERT INTO messages SET?', newMessage, function(err, res) {
                if (err) {
                  console.log('Error inserting to db');
                }
                cb();
              });
            }
          });        
        });
      } else {
        userID = rows[0].id;

        var newMessage = { text: message.text, 'user_id': userID, 'room_id': 1};


        connection.query('INSERT INTO messages SET?', newMessage, function(err, res) {
          if (err) {
            console.log('Error inserting to db');
          }
          cb();
        });
      }
    }
  });
  // var newMessage = { text: message.text, 'user_id': userID, 'room_id': 1};


  // connection.query('INSERT INTO messages SET?', newMessage, function(err, res) {
  //   if (err) {
  //     console.log('Error inserting to db');
  //   }
  //   cb();
  // });

};
// connection.end(function(err) {
//   console.log('an error?',err);
// });
