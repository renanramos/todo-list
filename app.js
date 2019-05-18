const chalk = require('chalk')
const yargs = require('yargs')
const task = require('./task')

// add -> adicionar uma nova task
yargs.command({
    command: 'add',
    describe: 'Add a new task into the TODO list',
    builder: {
        name: {
            describe : 'Task name',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Task description',
            demandOption: true,
            type: 'string'
        },
        status: {
            describe: 'This is the status of the task',
            type: 'string'
        }
    },
    handler: (argv) => {
        const info = chalk.green.bold.inverse('Creating a new task: ')
        task.addTask(argv.name, argv.description);        
        console.log(info)
    }
})

// remove uma task
yargs.command({
    command: 'remove',
    describe: 'Remove a new task from the TODO list',
    builder:{
        name:{
            describe : 'Task name to be deleted',
            demandOption : true,
            type : 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.red.inverse('Deleting a task from TODO list'))
        task.removeTask(argv.name)
    }
})

// lista todas as tasks
yargs.command({
    command: 'list',
    describe: 'List all tasks of the TODO list',
    handler: (argv) => {
        console.log(chalk.blue.inverse('Listing out all tasks'))
        const allTasks = task.listAllTasks()
        console.table(allTasks)
    }
})

// lê uma task
yargs.command({
    command: 'read',
    describe: 'Get a task from the TODO list',
    builder:{
        name:{
            describe : 'Task name to be deleted',
            demandOption : true,
            type : 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.yellow.bold.inverse('Getting a task'))
        const myTask = task.readTask(argv.name)
        console.table(myTask);
    }
})

yargs.command({
    command: 'update',
    describe: 'Update a task',
    builder: {
        name:{
            describe: 'find a task',
            demandOption: true,
            type: 'string'
        },
        status:{
            describe: 'status to update the task',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.white.bold.inverse('Updating a task'))
        task.updateTask(argv.name, argv.status)
    }
})

yargs.parse()