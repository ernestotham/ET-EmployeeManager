

function QueryAllEmployees(conn) {
    let command = `SELECT e.first_name, e.last_name, r.title, r.salary, d.name as department, m.first_name as Manager_first_name, m.last_name as  Manager_last_name
    FROM employee as e
    JOIN roles r ON e.roles_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;`

    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('\n')
            console.table(results);
            console.log('\n\n')


        }
        return results
    });

}


function QueryManagers(conn) {

        let command = "SELECT first_name, last_name FROM employee WHERE manager_id IS NOT NULL"
        conn.query(command, function (err, res, fields) {
            if (err) throw err;
            return JSON.stringify(res)
    
        })
    }
    


function QueryAllRoles(conn) {
    let command = "SELECT title FROM roles"

    
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('\n')
            console.table(results);
            console.log('\n\n')


        }
        return results
    });
}


function QueryAllDepartments(conn) {
    let command = "SELECT name FROM department"
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('\n')
            console.table(results);
            console.log('\n\n')


        }
        return results
    });
}



function AddDepartment(conn, department_name) {
            let command = 'INSERT INTO department (name) VALUES ("' + department_name + '")'
            conn.query(command, function (err, results) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('\n')
                    console.log("Rows affected: " + results.affectedRows);
                    console.log('\n\n')
                }
                return results
            });

        }



function AddRole(conn, title, salary, department_id) {

            let command = 'INSERT INTO roles(title, salary, department_id) VALUES ("' + title + '", ' + parseInt(salary) + ', ' + parseInt(department_id) + ')'
            console.log(command)
            conn.query(command, function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('\n')
                    console.log("Rows affected: " + res.affectedRows);
                    console.log('\n\n')
                }
                return res
            });
            
        }



function AddEmployee(conn, E_first_name, E_last_name, E_roles_id, E_manager_id) {
  
            let command = 'INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (\'' + E_first_name + '\', \'' + E_last_name + '\', ' + E_roles_id + ', ' + E_manager_id + ')'
            console.log(command)
            
            conn.query(command, function (err, results) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('\n')
                    console.log("Rows affected: " + results.affectedRows);
                    console.log('\n\n')
                }
                return results
            });
            
        }



function UpdateEmployeeRole(conn, id, E_roles_id) {

            let command = 'UPDATE employee SET (roles_id = ' + E_roles_id + ') WHERE id = ' + id
            conn.query(command, function (err, results) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('\n')
                    console.log("Rows affected: " + results.affectedRows);
                    console.log('\n\n')
                }

            });
            return results
        }

module.exports = { QueryAllDepartments, QueryAllEmployees, QueryAllRoles, AddDepartment, AddRole, AddEmployee, UpdateEmployeeRole, QueryManagers }