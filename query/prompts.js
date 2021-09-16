const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
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

//   inquirer.prompt(
//     [
//       {
//         type: 'input',
//         message: "Employee's first name?",
//         name: 'first_name',
//       },
//       {
//         type: 'input',
//         message: "Employee's last name?",
//         name: 'last_name',
//       },
//       {
//         type: 'list',
//         name: 'role_id',
//         choices: roleList,
//         message: "Employee's role?",       
//       },
//       {
//         type: 'list',
//         name: 'manager_id',
//        // choices: [NEED A QUERY to retrieve the other employees]
//         message: "Employee's manager?",
//       }    
//     ]
//   ).then((response) => {
//     //add employee to the database
//   })
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
  console.log('view departments requested');
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