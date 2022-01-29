



function QueryAllEmployees(conn) {
    let command ="SELECT * FROM roles"
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }

    });
    return results
}


function QueryAllRoles(conn) {
    let command ="SELECT * FROM roles"
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }

    });
    return results

}


function QueryAllDepartments(conn) {
    let command ="SELECT * FROM department"
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }

    });
    return results
}




function AddDepartment(conn, department_name ) {
    let command ='INSERT INTO department (name) VALUES ("'+department_name+'")'
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }
        return results
    });
    
}



function AddRole(conn, title, salary, department_id ) {
    
    let command ='INSERT INTO roles (name) VALUES ("'+title+'", '+salary+', "'+department_id+'") ' 
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }

    });
    return results
}



function AddEmployee(conn, E_first_name, E_last_name, E_roles_id, E_manager_id ) {
   
    let command ='INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("'+E_first_name+'", "'+E_last_name+'", "'+E_roles_id+'", "'+E_manager_id+'")'
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }

    });
    return results
}



function UpdateEmployeeRole(conn, id, E_roles_id) {
   
    let command ='UPDATE employee SET (roles_id = '+E_roles_id+') WHERE id = '+id
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }

    });
    return results
}

module.exports = {QueryAllDepartments, QueryAllEmployees, QueryAllRoles, AddDepartment, AddRole, AddEmployee, UpdateEmployeeRole}