import inquirer from 'inquirer';
// import { select } from '@inquirer/prompts';

inquirer
.prompt ([
    {
      message: 'What would you like to do?',
        type: 'select',
        choices: ['View all departments','Add department', 'View all roles', 'Add Role', 'View all employees', 'Add employee']
    }
])