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

// Update employee Role
const updateRole = () => {
  // employee_id, role_id
  console.log('update role requested');
};

// Add Section for new row to specified table: 
const addEmployee = () => {
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
    let managerArr = response.manager.split(" ");
    let managerId = ""

    db.promise().query(`SELECT id FROM duty WHERE title = '${response.role}'`)
      .then( ([row]) => {
        roleId = row[0].pop();
      })
      .then( () => {
        db.promise().query(`SELECT id FROM employee WHERE first_name = '${managerArr[0]}' and last_name = '${managerArr[1]}'`)
          .then( ([row]) => {
            managerId = row[0].pop();
          })
          .then( () => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                      VALUES ('${response.first_name}', '${response.last_name}', ${roleId}, ${managerId})`, (err, res) => {
              if (err) throw err;
              console.log("Employee Added successfully");
            }); 
          });   
      });
  });
};

const addRole = () => {
  let departmentList = [];
  db.query(`SELECT department_name FROM department`, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    rows.forEach(element => {
      departmentList.push(element[0]);
    });
  });

  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the new role?'
      },
      {
        type: 'number',
        name: 'salary',
        message: "What is the salary for the new role?"
      },
      {
        type: 'list',
        name: 'department_name',
        choices: departmentList,
        message: "Which department does the role belong to?"
      }
    ]
  ).then((response) => {
    let departmentId = 0;
    db.promise().query(`SELECT id FROM department WHERE department_name = '${response.department_name}'`)
      .then( ([row]) => {
        departmentId = row[0].pop();
      })
        .then( () => {
          db.query(`INSERT INTO duty (title, salary, department_id)
                    VALUES ('${response.title}', ${response.salary}, ${departmentId})`, (err, result) => {
                      if (err) throw err;
                      console.log(`Added ${response.title} to the database.`);  
                    });
        });
  }); 
};

const addDepartment = () => {
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the new department?'
      }
    ]
  ).then((response) => {
    db.query(`INSERT INTO department (department_name)
              VALUES ("${response.newDepartment}")`, (err, result) => {
                if (err) throw err;
                console.log(`Added ${response.newDepartment} to the database.`)
              });
  });
};


// View Table Data in specified formats

const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.table(['id', 'name'], result);
  });
};

const viewRoles = () => {
  db.query(`SELECT duty.id as id, title, department.department_name as department, salary 
            FROM duty
            JOIN department on duty.department_id = department.id`, (err, result) => {
    if (err) throw err;
    console.table(['id', 'title', 'department', 'salary'], result);
  });
};

const viewEmployees = () => {
  db.query(`SELECT e.id AS id, e.first_name, e.last_name, duty.title AS title, department.department_name as department, duty.salary AS salary, concat(m.first_name, " " , m.last_name) AS manager
            FROM employee e
            JOIN duty on e.role_id = duty.id
            JOIN department on department.id = duty.department_id
            LEFT JOIN employee m on e.manager_id = m.id`, (err, result) => {
              if (err) throw err;
              console.table(['id', 'first_name', 'last_name', 'title', 'department', 'salary', 'manager'], result);
              });
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