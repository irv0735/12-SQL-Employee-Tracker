const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const mainApp = require('../app.js');
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'company_db',
    rowsAsArray: true
  },
  console.log('**** EMPLOYEE MANAGER ****')
);

const viewEmployees = () => {
  console.log('display employee list requested');
};

const addEmployee = () => {
  // first_name, last_name, role_id, manager_id
  let roleList = [];
  db.query(`SELECT title FROM duty`, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    rows.forEach(element => {
      roleList.push(element[0]);
    });
  });

  let employeeList = ["None"];
  db.query(`SELECT first_name, last_name FROM employee`, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    rows.forEach(element => {
      employeeList.push(element[0] + " " + element[1]);
    });
  });

  inquirer.prompt(
    [
      {
        type: 'input',
        message: "Employee's first name?",
        name: 'first_name',
      },
      {
        type: 'input',
        message: "Employee's last name?",
        name: 'last_name',
      },
      {
        type: 'list',
        name: 'role',
        choices: roleList,
        message: "Employee's role?",       
      },
      {
        type: 'list',
        name: 'manager',
        choices: employeeList,
        message: "Employee's manager?",
      }    
    ]
  ).then((response) => {
    let roleId = ""
    db.query(`SELECT id FROM duty WHERE title = '${response.role}'`, (err, result) => {
      if (err) {
        console.log(err.message);
      }
      roleId = result.pop();
    });
    let managerArr = response.manager.split(" ");
    let managerId = ""
    db.query(`SELECT id FROM employee WHERE first_name = '${managerArr[0]}' and last_name = '${managerArr[1]}'`, (err, result) => {
      if (err) {
        console.log(err.message);
      }
      managerId = result.pop();
    });
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
              VALUES (${response.first_name}, ${response.last_name}, ${roleId[0]}, ${managerId[0]})`, (err, res) => {
      if (err) throw err;
      else {
        console.log("Employee Added successfully")
      }
    });   
  });
};

const updateRole = () => {
  // employee_id, role_id
  console.log('update role requested');
};

const viewRoles = () => {
  console.log('view roles requested');
};

const addRole = () => {
  // title, salary, department_id
  console.log('add a role requested.');
};

const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.table(['id', 'name'], result);
  });
  // mainApp.init();
};

const addDepartment = () => {
  // department_name
  console.log('add department requested.');
};

module.exports = {
  viewEmployees,
  addEmployee,
  updateRole,
  viewRoles,
  addRole,
  viewDepartments,
  addDepartment,
};