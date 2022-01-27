



function QueryAllEmployees(conn) {
    command ="SELECT * FROM roles"
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
    command ="SELECT * FROM roles"
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
    command ="SELECT * FROM department"
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