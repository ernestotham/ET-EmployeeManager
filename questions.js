function TaskQuestions(){
return taskQ = [
    {
        type: 'list',
        name: 'tasks',
        message: 'What would you like to do',
        choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Quit'],

    }


]

}

function AddDepartmentQuestions() {
    return addDepartmentQ = [

        {
            type: 'input',
            name: 'Depart_name',
            message: 'What is the name of the department?'
        }
    ]
}


function AddRoleQuestions (Q_choices){

    return addRoleQ = [

        {
            type: 'input',
            name: 'Role_name',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'Role_salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'departmentOpt',
            message: 'Which department does the role belong to?',
            choices: Q_choices,
    
        }
    ]

}


function AddEmployeeQuestions (R_Choices, M_Choices) {

   return addEmployeeQ = [

        {
            type: 'input',
            name: 'employee_fName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'employee_lName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'roleOpt',
            message: 'What is the employee\'s role?',
            choices: R_Choices,
    
        },
        {
            type: 'list',
            name: 'managerOpt',
            message: 'Who is the employee\'s manager?',
            choices: M_Choices,
    
        }
    
    
    ]
}


 




module.exports = {TaskQuestions, AddDepartmentQuestions, AddEmployeeQuestions, AddRoleQuestions}