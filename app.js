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
        await prompts.viewEmployees()
        break;
      case "Add Employee": 
        await prompts.addEmployee();
        break;
      case "Update Employee Role": 
        await prompts.updateRole();
        break;
      case "View All Roles": 
        await prompts.viewRoles();
        break;
      case "Add Role": 
        await prompts.addRole();
        break;
      case "View All Departments": 
        await prompts.viewDepartments();
        break;
      case "Add Department": 
        await prompts.addDepartment();
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

