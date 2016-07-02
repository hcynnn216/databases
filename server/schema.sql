DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (

  id INTEGER(3) UNSIGNED AUTO_INCREMENT,
  text VARCHAR(256),
  user_id INTEGER(3),
  room_id INTEGER(3),
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */

DROP TABLE IF EXISTS users;
    
CREATE TABLE users (
  id INTEGER AUTO_INCREMENT,
  username VARCHAR(30),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rooms;
    
CREATE TABLE rooms (
  id INTEGER AUTO_INCREMENT,
  roomname VARCHAR(30),
  PRIMARY KEY (id)
);

ALTER TABLE messages ADD FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE messages ADD FOREIGN KEY (room_id) REFERENCES rooms (id);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

