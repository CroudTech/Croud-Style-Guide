
// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types
//
// and for examples for prompts:
// https://github.com/SBoudrias/Inquirer.js/tree/master/examples
module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your vue component?',
    },
    {
        type: 'list',
        name: 'dir',
        message: 'Which dir should your new component be in?',
        choices: [
            'buttons',
            'forms',
            'hoc',
            'layout',
            'menus',
            'misc',
            'scheduler',
            'semantic',
        ],
    },
    {
        type: 'input',
        name: 'description',
        message: 'Give your component a quick description?',
    },

]
