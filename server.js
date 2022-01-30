


//import ENV variables
require('dotenv').config();
fs = require('fs');
const inquirer = require("inquirer");

//DB functions
const { QueryAllDepartments, QueryManagers, QueryAllEmployees, QueryAllRoles, AddDepartment, AddRole, AddEmployee, UpdateEmployeeRole } = require('./queries')
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
        const banner = top + space + space + body + space + space + bottom;
        console.log('\n\n\n' + banner + '\n\n')

    }


    InquireNewEmployee(R_Choices, M_Choices) {
        return inquirer
            .prompt(AddEmployeeQuestions(R_Choices, M_Choices))
            .then(val => {

                console.log(val);
                AddEmployeeQuestions(CoprRoles, CorpManagers)
                StartInitialQuestions();


            })

    }



    StartInitialQuestions() {

        return inquirer
            .prompt(TaskQuestions())
            .then(val => {

                // console.log(val);

                if (val['tasks'] == `View All Employees`) {

                    QueryAllEmployees(this.conn);
                    this.StartInitialQuestions();
                }

                else if (val['tasks'] == `Add Employee`) {
                    let command1 = "SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL"
                    let command2 = "SELECT id, title FROM roles"

                    let CorpManagers = [];
                    let CoprRoles = [];
                    this.conn.query(command1, function cb(err, res) {
                        
                        for (var i = 0; i < res.length; i++) {
                            CorpManagers.push({name: `${res[i].first_name} ${res[i].last_name}`, value: res[i].id})

                        }
                        //  CorpManagers
                    })

                    this.conn.query(command2, function cb2(err2, res2) {

                        for (var i = 0; i < res2.length; i++) {
                            CoprRoles.push({name: `${res2[i].title}`, value: res2[i].id})

                        }




                        inquirer
                            .prompt(AddEmployeeQuestions(CoprRoles, CorpManagers))
                            .then(val => {
                                console.log(val);
                                AddEmployeeQuestions(CoprRoles, CorpManagers)
                                initQ(val)


                            })



                    })

                    const initQ = (val) => { 
                        AddEmployee(this.conn, val['employee_fName'], val['employee_lName'], val['roleOpt'], val['managerOpt'])
                                               
                        this.StartInitialQuestions(); }



                }

                else if (val['tasks'] == `Update Employee Role`) {
                    //Add function to update role
                    this.StartInitialQuestions()
                }

                else if (val['tasks'] == `View All Roles`) {
                    QueryAllRoles(this.conn);
                    this.StartInitialQuestions();
                }

                else if (val['tasks'] == `Add Role`) {

                    let command1 = "SELECT name, id FROM department"

                    let CorpDepartments = [];
                    let CoprRoles = [];
                    this.conn.query(command1, function cb(err, res) {

                        for (var i = 0; i < res.length; i++) {
                            CorpDepartments.push(`[${res[i].name},${res[i].id}]`)

                        }

                        inquirer
                            .prompt(AddRoleQuestions(CorpDepartments))
                            .then(val => {
                                console.log(val);

                               
                                initQ(val)


                            })


                    })

                    const initQ = (val) => { 
                        let dpID = val['departmentOpt'].split(/,|]/)[1]
                        AddRole(this.conn, val['Role_name'], val['Role_salary'], dpID )
                        this.StartInitialQuestions(); }



                }

                else if (val['tasks'] == `View All Departments`) {
                    QueryAllDepartments(this.conn)
                    this.StartInitialQuestions();
                }

                else if (val['tasks'] == `Add Department`) {

                    inquirer
                        .prompt(AddDepartmentQuestions())
                        .then(val => {

                            AddDepartment(this.conn, val['Depart_name'])
                            this.StartInitialQuestions();


                        })

                }

                else if (val['tasks'] == `Quit`) {
                    // dbPool.releaseConnection(conn)
                    console.log('\n=========================================\nThanks for using The Employeer Manager!!!\n\nGood bye!!!\n=========================================')
                    process.exit()

                }



            })



    }








}










