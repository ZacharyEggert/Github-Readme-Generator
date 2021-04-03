const fs = require('fs');
const inquirer = require('inquirer');

const messageWelcome = "Welcome to the GitHub README Generator!"


console.log(messageWelcome + "\n");


const readmeOptions = async () => {

    console.log('Options for README Generator: ')

    const options = 
    [
        {
            name: 'Project Name',
            checked: true,
            disabled: 'required'
        },{
            name: 'Blurb (Short Description)',
            checked: true
        },{
            name: 'Long Description',
            checked: false
        },{
            name: 'Screenshot',
            checked: false
        },{
            name: 'Prerequisites',
            checked: false
        },{
            name: 'Usage Instructions',
            checked: false
        },{
            name: 'Licence (Please)',
            checked: true
        },{
            name: 'Licence Badge',
            checked: true
        },{
            name: 'Contact',
            checked: true
        },{
            name: 'Contribution Instructions',
            checked: false
        }, new inquirer.Separator()
    ]

    const response = await inquirer.prompt([
        {
            type: 'checkbox',
            message: 'inlude?',
            name: 'options',
            choices: options
        }
    ])
    //DEBUG fs.writeFile('./out/options.json', JSON.stringify(response), 'utf-8', (e) => {e?console.error(e):null;})
    return response;

}


const main = async () => {
    fs.mkdir('./out/', { recursive: true }, e => {e?console.error(e):null;})
    
    const chosenOptions = await readmeOptions();
    const filter = chosenOptions.options
    console.log(filter);

    const licences = ['MIT', 'ISC', 'GNU GPLv3', 'Apache'];
    const ptypes = ['Website/Webapp', 'node.js module', 'Electron']

    const questions = {
        username: {
            type: 'input',
            message: 'github username',
            name: 'user'
        }, 
        name: {
            type: 'input',
            message: 'your name',
            name: 'name'
        }, 
        reponame: {
            type: 'input',
            message: 'repo name',
            name: 'repo'
        },
        projectname: {
            type: 'input',
            message: 'project name',
            name: 'project'
        },
        blurb: {
            type: 'input',
            message: 'blurb',
            name: 'blurb'
        },
        description: {
            type: 'input',
            message: 'description',
            name: 'description'
        },
        screenshoturl: {
            type: 'input',
            message: 'screenshot url',
            name: 'screenshoturl'
        },
        projecttype: {
            type: 'list',
            message: 'project type',
            choices: ptypes,
            name: 'ptype'
        },
        usage: {
            type: 'input',
            message: 'usage instructions',
            name: 'usage'
        },
        licence: {
            type: 'list',
            message: 'licence',
            choices: licences,
            name: 'licence'
        },
        twitter: {
            type: 'input',
            message: 'twitter handle',
            name: 'twitter'
        },
        email: {
            type: 'input',
            message: 'email',
            name: 'email'
        }
    }

    let applicableQs = [];

    if(true){applicableQs.push(questions.projectname)}
    if(filter.includes("Blurb (Short Description)")){applicableQs.push(questions.blurb)}
    if(filter.includes("Long Description")){applicableQs.push(questions.description)}
    if(filter.includes("Licence (Please)")){applicableQs.push(questions.licence)}
    if(filter.includes("Screenshot")){applicableQs.push(questions.screenshoturl)}
    if(filter.includes("Prerequisites")){applicableQs.push(questions.projecttype)}
    if(filter.includes("Usage Instructions")){applicableQs.push(questions.usage)}
    if(filter.includes("Licence Badge")){if(!applicableQs.includes(questions.licence)){applicableQs.push(questions.licence)}}
    if(filter.includes("Contact")){applicableQs.push(questions.name); applicableQs.push(questions.email); applicableQs.push(questions.twitter); applicableQs.push(questions.username)}
    if(filter.includes("Contribution Instructions")){applicableQs.push(questions.reponame); if(!applicableQs.includes(questions.username)){applicableQs.push(questions.username);}}

    console.log(applicableQs);


    const response = await inquirer.prompt(applicableQs)

    console.log(response);

    const { name, user, repo, project, blurb, description, screenshoturl, ptype, usage, licence, twitter, email, contribution } = response;

    //console.log(Object.values(response))

    let readme = 
``;
    readme += 
`# ${project}`
    
    if(blurb){readme += 
`

${blurb}`}
    if(description){readme +=
`

${description}`}
    if(screenshoturl){readme+= 
`

![screenshot](${screenshoturl})`}

    readme += `
    `
    fs.writeFile('out/README.md', readme, (e) => {e?console.error(e):console.log('Written to file.');})

}

main();
//readmeOptions();