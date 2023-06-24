const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    //ENTER YOUR MYSQL PASSWORD HERE
    password: '',
    database: 'employee_db'
    });

