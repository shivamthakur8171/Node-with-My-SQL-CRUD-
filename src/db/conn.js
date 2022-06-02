const mysql = require('mysql2');

// create the connection to database

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected successfully");
});

module.exports = con;