const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'company_db'
  },
  console.log('**** EMPLOYEE MANAGER ****')
);

function init(){
  inquirer.prompt(
    [
      {
        type: 'list',
        name: 'nextMove',
        choices: ['View All Empoloyees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        message: "What would you like to do?"
      }
    ]
  ).then((answer) => {
    
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