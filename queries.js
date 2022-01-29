

async function DBHandle(conn, comm) {
    let command =comm
    
   return await conn.query(command, function (err, results) {
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


function QueryAllEmployees(conn) {
    let command =`SELECT e.first_name, e.last_name, r.title, r.salary, d.name as department, m.first_name as Manager_first_name, m.last_name as  Manager_last_name
    FROM employee as e
    LEFT JOIN roles as r ON (r.id = e.id)
    LEFT JOIN department as d ON (d.id = r.department_id)
    LEFT JOIN employee as m ON (m.manager_id = e.id);`
    
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

function QueryManagers(conn){
    let command ="SELECT first_name, last_name FROM employee WHERE manager_id IS NOT NULL"
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

function QueryAllRoles(conn) {
    let command ="SELECT title FROM roles"
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
    let command ="SELECT name FROM department"
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



function AddDepartment(conn, department_name ) {
    let command ='INSERT INTO department (name) VALUES ("'+department_name+'")'
    conn.query(command, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('\n')
            console.log("Rows affected: "+results.affectedRows);
            console.log('\n\n')
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
            console.log('\n')
            console.log("Rows affected: "+results.affectedRows);
            console.log('\n\n')
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
            console.log('\n')
            console.log("Rows affected: "+results.affectedRows);
            console.log('\n\n')
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
            console.log('\n')
            console.log("Rows affected: "+results.affectedRows);
            console.log('\n\n')
        }

    });
    return results
}

module.exports = {DBHandle, QueryAllDepartments, QueryAllEmployees, QueryAllRoles, AddDepartment, AddRole, AddEmployee, UpdateEmployeeRole, QueryManagers}