//import ENV variables
require('dotenv').config();
fs = require('fs');

// Import and require mysql2
const mysql = require('mysql2');



// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
  );


  //create DB schema
  const schema = fs.readFileSync('./db/schema.sql' , 'utf8')
  db.query(schema, function (err, results) {
    console.log(results);
  });



  
  
  