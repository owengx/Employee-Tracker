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
        choices: ['View all departments', 'Add department', 'View all roles', 'Add role', 'View all employees', 'Add employee']
      }
    ]).then((answers) => {
      const choices = answers.select
      if (choices === 'View all departments') {
        viewAllDepartments().then(({ rows }) => console.table(rows)).then(() => startCli())
      }
      if (choices === 'View all roles') {
        viewAllRoles().then(({ rows }) => console.table(rows)).then(() => startCli())
      }
      if (choices === 'View all employees') {
        viewAllEmployees().then(({ rows }) => console.table(rows)).then(() => startCli())
      }
      if (choices === 'Add department') {
        addDepartment().then(({ rows }) => console.table(rows)).then(() => startCli())
      }
      if (choices === 'Add employee') {
        addEmployee().then(({ rows }) => console.table(rows)).then(() => startCli())
      }
      if (choices === 'Add role') {
        addRole().then(({ rows }) => console.table(rows)).then(() => startCli())
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
    return await client.query('INSERT INTO department (department_name) VALUES ($1)', [answer.department_name])
  } finally { client.release() }
}

async function addEmployee() {
  const answer = await inquirer.prompt([{
    name: 'first_name',
    message: 'Enter the first name',
    type: "input"
  },
  {
    name: 'last_name',
    message: 'Enter last name',
    type: 'input'
  },
  ])

  const client = await pool.connect()
  try {
    return await client.query('INSERT INTO employee (first_name, last_name) VALUES ($1,$2)', [answer.first_name] [answer.last_name] )
  } finally { client.release() }
}

async function addRole() {
  const answer = await inquirer.prompt([{
    name: 'title',
    message: 'Enter the title',
    type: "input"
  },
  {
    name: 'salary',
    message: 'Enter the employee salary',
    type: 'input'
  },
  ])

  const client = await pool.connect()
  try {
    return await client.query('INSERT INTO role (title, salary) VALUES ($1,$2)', [answer.title] [answer.salary] )
  } finally { client.release() }
}



startCli()