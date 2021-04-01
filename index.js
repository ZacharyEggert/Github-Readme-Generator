const fs = require('fs');
const inquirer = require('inquirer');

const messageWelcome = "Welcome to the GitHub README Generator!"


console.log(messageWelcome + "\n");

const main = async () => {

    const licences = ['MIT', 'ISC', 'GNU GPLv3', 'Apache'];
    const ptypes = ['Website/Webapp', 'node.js module', 'Electron']

    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'username',
            name: 'user'
        },{
            type: 'input',
            message: 'your name',
            name: 'name'
        },{
            type: 'input',
            message: 'repo name',
            name: 'repo'
        },{
            type: 'input',
            message: 'project name',
            name: 'project'
        },{
            type: 'input',
            message: 'blurb',
            name: 'blurb'
        },{
            type: 'input',
            message: 'description',
            name: 'description'
        },{
            type: 'input',
            message: 'screenshot url',
            name: 'screenshoturl'
        },{
            type: 'list',
            message: 'project type',
            choices: ptypes,
            name: 'ptype'
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
        },{
            type: 'input',
            message: 'email',
            name: 'email'
        },{
            type: 'confirm',
            message: 'generate contribution instructions?',
            name: 'contribution'
        }
        
    ])

    const { name, user, repo, project, blurb, description, screenshoturl, ptype, usage, licence, twitter, email, contribution } = response;

    console.log(Object.values(response))

    const details = `
# ${project}
${blurb}

${description}

![screenshot](${screenshoturl})

`
    const usageout = `
## Requirements

* ${ptype}

## Installation

\`\`\`sh
Instructions
\`\`\`

## Usage example

${usage}

`

    const meta = `
## Meta

${name} – [@${twitter}](https://twitter.com/${twitter}) – ${email}

Distributed under the ${licence} license. See ``LICENSE`` for more information.

[https://github.com/${user}/${repo}](https://github.com/${user}/${repo})

`
    const contributionSection = contribution?`
## Contributing

1. [Fork it](<https://github.com/${user}/${repo}/fork>)
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
`: ``

const readme = details + usageout + meta + contributionSection;

fs.writeFile('out/README.md', readme, (e) => {e?console.error(e):console.log('Written to file.');})

}

main();