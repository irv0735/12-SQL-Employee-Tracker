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
        await prompts.promisifiedAddEmployee();
        break;
      case "Update Employee Role": 
        await prompts.promisifiedUpdateRole();
        break;
      case "View All Roles": 
        await prompts.promisifiedViewRoles();
        break;
      case "Add Role": 
        await prompts.promisifiedAddRole();
        break;
      case "View All Departments": 
        await prompts.promisifiedViewDepartments();
        break;
      case "Add Department": 
        await prompts.promisifiedAddDepartment();
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

