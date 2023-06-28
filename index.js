const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    //ENTER YOUR MYSQL PASSWORD HERE
    password: '',
    database: 'employee_db'
});

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'Options',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Delete role',
                'Delete employee',
                'Delete department',
                'Exit'
            ]
        }
    ])
    .then(function(answers) {
        switch (answers.Options) {
            case 'View all departments':
                allDepartments();
                break;
            case 'View all roles':
                allRoles();
                break;
            case 'View all employees':
                allEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Delete role':
                deleteRole();
                break;
            case 'Delete employee':
                deleteEmployee();
                break;
            case 'Delete department':
                deleteDepartment();
                break;
            case 'Exit':
                connection.end();
                console.log('Exiting...');
        }
    });
}

function allDepartments() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
        }
        
        start();
    });
}
    
    function allRoles() {
        connection.query('SELECT * FROM role', function(err, res) {
                console.table(res);
                 start();
            });
        }
    
    function allEmployees() {
        connection.query('SELECT * FROM employee', function(err, res) {
                console.table(res);
                start();
            });
        }
    
    function addDepartment() {
        inquirer.prompt([
            {
              type: 'input',
              name: 'department_name',
              message: 'What is the name of the department?',
            },
          ])
          .then(function (answers) {
            connection.query(
              'INSERT INTO department (department_name) VALUES (?)',
              [answers.department_name],
              function (err, res) {
                console.log('Department added');
                start();
              });
          });     
    }

    function addRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department id of the role?'
            }
        ]).then(function(answers) {
            connection.query('INSERT INTO role SET ?', {
                title: answers.role,
                salary: answers.salary,
                department_id: answers.department_id
            }, function(err, res) {
                console.log('Role added');
                start();
            });
        });
    }
    
    function addEmployee() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role id of the employee?'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the manager id of the employee?'
            }
        ]).then(function(answers) {
            connection.query('INSERT INTO employee SET ?', {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id
            }, function(err, res) {
                console.log('Employee added');
                start();
            });
        });
    }
    
    function updateEmployeeRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'What is the employee id of the employee?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role id of the employee?'
            }
        ]).then(function(answers) {
            connection.query('UPDATE employee SET ? WHERE ?', [
                {
                    role_id: answers.role_id
                },
                {
                    id: answers.employee_id
                }
            ], function(err, res) {
                console.log('Employee role updated');
                start();
            });
        });
    }
    
    function deleteRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role id of the role you want to delete?'
            }
        ]).then(function(answers) {
            connection.query('DELETE FROM role WHERE ?', {
                id: answers.role_id
            }, function(err, res) {
                console.log('Role deleted');
                start();
            });
        });
    
    }

    function deleteEmployee() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'What is the employee id of the employee you want to delete?'
            }
        ]).then(function(answers) {
            connection.query('DELETE FROM employee WHERE ?', {
                id: answers.employee_id
            }, function(err, res) {
                console.log('Employee deleted');
                start();
            });
        });
    
    
    }

    function deleteDepartment() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department id of the department you want to delete?'
            }
        ]).then(function(answers) {
            connection.query('DELETE FROM department WHERE ?', {
                id: answers.department_id
            }, function(err, res) {
                console.log('Department deleted');
                start();
            });
        });
        
    }
    


    start();