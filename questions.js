const Choices = require("inquirer/lib/objects/choices");

const taskQuestions = [
    {
        type: 'list',
        name: 'tasks',
        message: '(Use arrow keys)',
        choices: ['Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Quit'],

    }


]

const addDepartmentQ = [

    {
        type: 'input',
        name: 'Depart_name',
        message: 'What is the name of the department?'
    }
]


const addRoleQ = [

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
        choices: ['Engineering','Finance','Legal','Sales','IT','Service'],

    }
]



const addEmployeeQ = [

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
        choices: ['Sales Lead','Sales person','Software Engineer','Lead Engineer','Account Manager','Accountant','Legal Team Lead','Lawyer','Customer Service'],

    },
    {
        type: 'list',
        name: 'managerOpt',
        message: 'Who is the employee\'s manager?',
        choices: ['None','Ernesto'],

    }


]

