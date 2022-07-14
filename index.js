const db = require('./connection');
const inquirer = require('inquirer');

function promptUser() {
    inquirer.prompt({
        type: 'list',
        name: 'task',
        message: 'What Would You like to do?',
        choices: ['View All Employees',
            'View Department',
            'View Roles',
            'Add Employee',
            'Add Department',
            'Update Employee Role',
            'Exit Application'
        ]
    }).then(function ({ task }) {
        switch (task) {
            case "View All Employees":
                viewEmployee();
                break;
            case "View Department":
                viewDepartment();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Exit Application":
                exitApp()
                break;
        }

    })
    //selection functions
}
function viewEmployee() {
    const params = `SELECT * FROM employee`
    db.query(params, (err, rows) => {
        console.table(rows)
        promptUser()
    })

}
function viewDepartment() {
    const params = `SELECT * FROM department`
    db.query(params, (err, rows) => {
        console.table(rows)
        promptUser()
    })
}
function viewRoles() {
    const params = `SELECT * FROM role`
    db.query(params, (err, rows) => {
        console.table(rows)
        promptUser()
    })
}
function addDepartment() {
    inquirer.prompt({
        name: 'department',
        message: 'Enter the name of your Department'
    }).then(data => {
        const params = `INSERT INTO department SET ?`
        db.query(params, { name: data.department }, () => { promptUser() })
    })
}
function exitApp() {
    process.exit()
}
promptUser();