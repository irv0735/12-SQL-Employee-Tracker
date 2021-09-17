const inquirer = require('inquirer');
const prompts = require('./query/prompts.js');

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
  ).then((response) => {
    switch(response.nextMove) {
      case "View All Employees": 
        prompts.viewEmployees()
        init()
        break;
      case "Add Employee": 
        prompts.addEmployee();
       // init(); 
        break;
      case "Update Employee Role": 
        prompts.updateRole();
       // init(); 
        break;
      case "View All Roles": 
        prompts.viewRoles();
        //init(); 
        break;
      case "Add Role": 
        prompts.addRole();
        ///init(); 
        break;
      case "View All Departments": 
        prompts.viewDepartments();
        //init(); 
        break;
      case "Add Department": 
        prompts.addDepartment();
        //init(); 
      break;
      case "Quit": 
        console.log("Exiting program. Goodbye!"); 
        break;
    }
  })
  // .then((response) => {
  //   if (response == true) {
  //     init()
  //   }
  // })
};

init();

module.exports = {init};