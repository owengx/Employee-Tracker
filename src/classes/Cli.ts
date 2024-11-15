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
        choices: ['View all departments', 'Add department', 'View all roles', 'Add role', 'View all employees', 'Add employee', 'Delete department']
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
      // if (choices === 'Delete department') {
      //   deleteDepartment().then(({ rows }) => console.table(rows)).then(() => startCli())
      // }

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
    return await client.query('SELECT role.id,role.title,role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id')
  } finally { client.release() }
}
//'select * FROM role'

async function viewAllEmployees() {
  const client = await pool.connect()
  try {
    return await client.query('select * FROM employee')
  } finally { client.release() }
}
// 'select * FROM employee'
//SELECT employee.id,employee.first_name, employee.last_name, role.title FROM employee JOIN role on employee.role_id = role.id
async function addDepartment() {
  const answer = await inquirer.prompt([{
    name: 'department_name',
    message: 'What is the new department name',
    type: "input"
  }])

  const client = await pool.connect()
  try {
    return await client.query('INSERT INTO department (department_name) VALUES ($1)', [answer.department_name]);
    // console.log (`Department '${answer.department_name}' has been added`);
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
  {
    name: 'role_id',
    message: 'What is the role id',
    type: 'list',
    choices: ['recruiter', 'marketing director', 'CPA', 'software engineer']
  }
  ])
  const client = await pool.connect()
  try {
    return await client.query('INSERT INTO employee (first_name, last_name, role_id) VALUES ($1,$2, $3)', [answer.first_name , answer.last_name, answer.role_id]);
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
  {
    name: 'department_name',
    message: 'Enter the department name',
    type: 'input'
  },
  ])

  const client = await pool.connect()
  try {
    return await client.query('INSERT INTO role (title, salary) VALUES ($1,$2)', [answer.title , answer.salary])
  } finally { client.release() }
}

// async function deleteDepartment() {
//   const answer = await inquirer.prompt([{
//     name: 'department_name',
//     message: 'What is the new department name',
//     type: "input"
//   }])

//   const client = await pool.connect()
//   try {
//     return await client.query('INSERT INTO department (department_name) VALUES ($1)', [answer.department_name])
//   } finally { client.release() }
// }



startCli()