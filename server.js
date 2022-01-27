//import ENV variables
require('dotenv').config();
fs = require('fs');

const inquirer = require("inquirer");


// Import and require mysql2
const mysql = require('mysql2');



// Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         // MySQL username,
//         user: process.env.DB_USER,
//         // MySQL password
//         password: process.env.DB_PASS
//         // database: process.env.DB_NAME
//     },
//     console.log(`Connecting to the ${process.env.DB_NAME} database.`)
// );

const dbPool = mysql.createPool(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASS,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    console.log(`Connecting to the ${process.env.DB_NAME} database.`)
);


dbPool.getConnection(function (err, conn) {
    if (err) throw err;
    console.log("Connected!");



    //////////////////////////////

    //create DB schema
    const schema = ((fs.readFileSync('./db/schema.sql', 'utf-8')).replace(/(\r\n|\n|\r)/gm, "")).split(";")

    for (var i = 0; i < schema.length; i++) {

        console.log(`${schema[i]};`)
        if (`${schema[i]};` != ';') {

            conn.query(`${schema[i]};`, function (err, results) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(results);
                }

            });



        }

    }

    executeQuery('SELECT * FROM department;', conn)
    var addDepartment = `INSERT INTO department (name)
VALUES ("accounting"),
("accounting2"),
       ("tax");`

    var addEmployee = `INSERT INTO department (first_name, last_name,role_id,department_id)
       VALUES ("Juan","Perez",1,1),
       ("Matt","Jones",2,3),
       ("Nico","Tham",3,2);`

    var addRole = `INSERT INTO department (title, salary, department_id)
              VALUES ("accountant", 90, 1),
              ("Manager", 120, 2),
                     ("Engineer", 130, 2);`



    //////////////////////////////////


    dbPool.releaseConnection(conn)

});



function executeQuery(command, conn) {

    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }

    });

}





  //.replace(/(\r\n|\n|\r)/gm, "")










