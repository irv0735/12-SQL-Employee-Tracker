const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const util = require('util');
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
  db.promise().query(`SELECT * FROM department`)
    .then( ([result]) => {
      console.table(['id', 'name'], result);
    })
};
const promisifiedViewDepartments = util.promisify(viewDepartments);

const viewRoles = () => {
  db.promise().query(`SELECT duty.id as id, title, department.department_name as department, salary 
            FROM duty
            JOIN department on duty.department_id = department.id`)
    .then( ([result]) => {
      console.table(['id', 'title', 'department', 'salary'], result);
    })
};
const promisifiedViewRoles = util.promisify(viewRoles);

const viewEmployees = () => {
  db.promise().query(`SELECT e.id AS id, e.first_name, e.last_name, duty.title AS title, department.department_name as department, duty.salary AS salary, concat(m.first_name, " " , m.last_name) AS manager
            FROM employee e
            JOIN duty on e.role_id = duty.id
            JOIN department on department.id = duty.department_id
            LEFT JOIN employee m on e.manager_id = m.id`)
    .then(([result]) => {
      console.table(['id', 'first_name', 'last_name', 'title', 'department', 'salary', 'manager'], result);
    })
};
const promisifiedViewEmployees = util.promisify(viewEmployees);

// Update employee Role
const updateRole = () => {
  let employeeList = [];
  let roleList = [];
  db.query(`SELECT concat(first_name, " ", last_name) FROM employee`, (err, result) => {
    if (err) throw err;
    result.forEach(element => {
      employeeList.push(element[0]);
    });
  });
  db.promise().query(`SELECT title FROM duty`)
    .then( ([rows]) => {
      rows.forEach(element => {
        roleList.push(element[0]);
      });
    })
  .then(() => {
    inquirer.prompt(
      [
        {
          type: 'list',
          name: 'employee',
          choices: employeeList,
          message: "Which employee's role do you want to update?"
        },
        {
          type: 'list',
          name: 'newRole',
          choices: roleList,
          message: "Which role to you want to assign the selected employee?"
        }
      ]
    ).then( (response) => {
      db.query(`UPDATE employee
                SET role_id = (SELECT id FROM duty WHERE title = '${response.newRole}')
                WHERE concat(first_name, " ", last_name) = '${response.employee}'`, (err, result) => {
                  if (err) throw err;
                  console.log(`Updated employee's role`)
                });           
    });
  });
};


module.exports = {
  promisifiedViewEmployees,
  addEmployee,
  updateRole,
  promisifiedViewRoles,
  addRole,
  promisifiedViewDepartments,
  addDepartment,
};