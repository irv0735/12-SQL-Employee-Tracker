const inquirer = require('inquirer');
const prompts = require('./query/prompts.js');
let restart = true;

const init = () => {
  inquirer.prompt(
    [
      {
        type: 'list',
        name: 'nextMove',
        choices: [
                    'View All Employees', 
                    'Add Employee', 
                    'Update Employee Role', 
                    'View All Roles', 
                    'Add Role', 
                    'View All Departments', 
                    'Add Department', 
                    'Quit'
                  ],
        message: "What would you like to do?"
      }
    ]
  ).then(async response => {
    switch(response.nextMove) {
      case "View All Employees": 
        await prompts.promisifiedViewEmployees()
        break;
      case "Add Employee": 
        prompts.addEmployee();
        break;
      case "Update Employee Role": 
        prompts.updateRole();
        break;
      case "View All Roles": 
        await prompts.promisifiedViewRoles();
        break;
      case "Add Role": 
        prompts.addRole();
        break;
      case "View All Departments": 
        await prompts.promisifiedViewDepartments();
        break;
      case "Add Department": 
        prompts.addDepartment();
      break;
      case "Quit": 
        console.log("Exiting program. Goodbye!");
        restart = false; 
        break;
    }
    if (restart) {
      init();
    }
  });
};

init();

