import inquirer from 'inquirer';

import {
  pool, connectToDb
} from './connection.js';

await connectToDb();

//worked with tutor to add additions to inquirer prompt
function startCli() {
  inquirer
    .prompt([
      {
        message: 'What would you like to do?',
        type: 'list',
        name: 'select',
        choices: ['View all departments', 'Add department', 'View all roles', 'Add Role', 'View all employees', 'Add employee']
      }
    ]).then((answers) => {
      const choices = answers.select
      if (choices === 'View all departments') {
        viewAllDepartments().then(({ rows }) => console.table(rows)).then(()=>startCli())
      }
      if (choices === 'View all roles') {
        viewAllRoles().then(({ rows }) => console.table(rows)).then(()=>startCli())
      }
      if (choices === 'View all employees') {
        viewAllEmployees().then(({ rows }) => console.table(rows)).then(()=>startCli())
      }
      if (choices === 'Add department') {
        addDepartment().then(({ rows }) => console.table(rows)).then(()=>startCli())
      }
   
    })
}

async function viewAllDepartments() {
  const client = await pool.connect()
  try {
    return await client.query('select * FROM department')
  } finally { client.release() }
}

async function viewAllRoles() {
  const client = await pool.connect()
  try {
    return await client.query('select * FROM role')
  } finally { client.release() }
}

async function viewAllEmployees() {
  const client = await pool.connect()
  try {
    return await client.query('select * FROM employee')
  } finally { client.release() }
}

async function addDepartment() {
const answer = await inquirer.prompt([{
  name: 'department_name',
  message: 'What is the new department name',
  type: "input"
}])

  const client = await pool.connect()
  try {
    return await client.query('INSERT INTO department (department_name) VALUES ($1)',[answer.department_name])
  } finally { client.release() }
}


 

startCli()