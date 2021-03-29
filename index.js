const fs = require('fs');
const inquirer = require('inquirer');

const messageWelcome = "Welcome to the GitHub README Generator!"


console.log(messageWelcome + "\n");

const main = async () => {

    const licences = ['MIT', 'ISC', 'GNU GPLv3', 'Apache'];

    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'username',
            name: 'user'
        },{
            type: 'input',
            message: 'repo name',
            name: 'repo'
        },{
            type: 'input',
            message: 'description',
            name: 'description'
        },{
            type: 'input',
            message: 'usage instructions',
            name: 'usage'
        },{
            type: 'list',
            message: 'licence',
            choices: licences,
            name: 'licence'
        },{
            type: 'input',
            message: 'twitter handle',
            name: 'twitter'
        }
        
    ])



}

main();