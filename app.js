const express = require('express');
// const mysql = require('mysql2');
// require('dotenv').config();

const inquirer = require('inquirer');
// const cTable = require('console.table');
const queries = require('./query/queries.js');

const PORT = process.env.PORT || 3001;
const app = express();

// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: 'root',
//     password: process.env.MYSQL_PW,
//     database: 'company_db'
//   },
//   console.log('**** EMPLOYEE MANAGER ****')
// );

async function init(){
  inquirer.prompt(
    [
      {
        type: 'list',
        name: 'nextMove',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        message: "What would you like to do?"
      }
    ]
  ).then((response) => {
    switch(response.nextMove) {
      case "View All Employees": 
        await queries.viewEmployees();
        init(); 
        break;
      case "Add Employee": 
        await queries.addEmployee();
        init(); 
        break;
      case "Update Employee Role": 
        await queries.updateRole();
        init(); 
        break;
      case "View All Roles": 
        await queries.viewRoles();
        init(); 
        break;
      case "Add Role": 
        await queries.addRole();
        init(); 
        break;
      case "View All Departments": 
        await queries.viewDepartments();
        init(); 
        break;
      case "Add Department": 
        await queries.addDepartment();
        init(); 
      break;
      case "Quit": 
        console.log("Exiting program. Goodbye!"); 
        break;
    }
  })
}

// Default response for requests not found
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  init();
});