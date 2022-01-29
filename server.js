//import ENV variables
require('dotenv').config();
fs = require('fs');
const inquirer =require("inquirer");

//DB functions
const { DBHandle, QueryAllDepartments,QueryManagers, QueryAllEmployees, QueryAllRoles, AddDepartment, AddRole, AddEmployee, UpdateEmployeeRole } = require('./queries')
//Inquire Questions
const { TaskQuestions, AddDepartmentQuestions, AddEmployeeQuestions, AddRoleQuestions } = require('./questions')


// Import and require mysql2
const mysql = require('mysql2');

const dbPool = mysql.createPool(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASS,
        waitForConnections: true,
        connectionLimit: 20,
        queueLimit: 10
    },
    // console.log(`Connecting to the ${process.env.DB_NAME} database.`)
);



dbPool.getConnection(function (err, conn) {
    if (err) throw err;
    // console.log("Connected!");



    //////////////////////////////

    //create DB schema
    const schema = ((fs.readFileSync('./db/schema.sql', 'utf-8')).replace(/(\r\n|\n|\r)/gm, "")).split(";")

    //seeds
    const seeds = ((fs.readFileSync('./db/seeds.sql', 'utf-8')).replace(/(\r\n|\n|\r)/gm, "")).split(";")
    schema.forEach(query => {

        if (query != "") {
            // console.log("query: "+query)
            conn.query(query)
            //  let reslt = DBHandle(conn, query).then((val)=>{ return val})
        }
    })

    seeds.forEach(query => {

        if (query != "") {
            // console.log("query: "+query)
            conn.query(query)
            // DBHandle(conn, query).then((val)=>{ return val})
        }
    })


    //test queries
    //     executeQuery('SELECT * FROM department;', conn)
    //     var addDepartment = `INSERT INTO department (name)
    // VALUES ("accounting"),
    // ("accounting2"),
    //        ("tax");`

    //     var addEmployee = `INSERT INTO department (first_name, last_name,role_id,department_id)
    //        VALUES ("Juan","Perez",1,1),
    //        ("Matt","Jones",2,3),
    //        ("Nico","Tham",3,2);`

    //     var addRole = `INSERT INTO department (title, salary, department_id)
    //               VALUES ("accountant", 90, 1),
    //               ("Manager", 120, 2),
    //                      ("Engineer", 130, 2);`

    // executeQuery(addDepartment, conn)
    // executeQuery('SELECT * FROM department;', conn)
    //     //////////////////////////////////
    //     AddDepartment(conn, "testDepartment" )
    //     QueryAllDepartments(conn)
    //     executeQuery('SELECT * FROM department;', conn)
    app = new runApp(conn)
    app.StartInitialQuestions()
    

});





// function executeQuery(command, conn) {

//     conn.query(command, function (err, results) {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             // console.log(results);
//         }

//     });

// }


class runApp {

    constructor(conn) {
        this.status = "started"
        this.conn = conn
        const top = "/================================================\\\n";
        const bottom = "\\================================================/\n";
        const space = "|                                                |\n";
        const body = "|              Employee Manager!!!               |\n";
        const banner = top+space+space+body+space+space+bottom;
        console.log('\n\n\n'+banner+'\n\n')
        
    }

    

    

    StartInitialQuestions() {
        
        return inquirer
            .prompt(TaskQuestions())
            .then(val => {

                // console.log(val);
                
                if(val['tasks'] == `View All Employees`){
                    
                    QueryAllEmployees(this.conn);
                    this.StartInitialQuestions();
                }

                else if(val['tasks'] == `Add Employee`){
                        let CoprRoles = QueryAllRoles(conn);
                        let CorpManagers = QueryManagers(conn);
                        InquireNewEmployee(CoprRoles, CorpManagers)
                        
                }

                else if(val['tasks'] == `Update Employee Role`){
                        //Add function to update role
                        this.StartInitialQuestions()
                }

                else if(val['tasks'] == `View All Roles`){
                        QueryAllRoles(this.conn);
                        this.StartInitialQuestions();
                }

                else if(val['tasks'] == `Add Role`){
                    let Corp_Dpts = QueryAllDepartments(this.conn) 
                    AddRoleQuestions(Corp_Dpts)
                    this.StartInitialQuestions();
                }

                else if(val['tasks'] == `View All Departments`){
                    QueryAllDepartments(this.conn)
                    this.StartInitialQuestions();
                }

                else if(val['tasks'] == `Add Department`){
                    
                    AddDepartment(conn, dept_name)
                    this.StartInitialQuestions();
                }

                else if(val['tasks'] == `Quit`){
                    // dbPool.releaseConnection(conn)
                    console.log('\n=========================================\nThanks for using The Employeer Manager!!!\n\nGood bye!!!\n=========================================')
                    process.exit()

                }
                            

            })

    }


    InquireNewEmployee(R_Choices, M_Choices){
        return inquirer
        .prompt(AddEmployeeQuestions(R_Choices, M_Choices))
        .then(val =>{

            console.log(val);
            AddEmployeeQuestions(CoprRoles, CorpManagers)
            StartInitialQuestions();
            

        })



    }






}










