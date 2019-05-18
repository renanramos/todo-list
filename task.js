const fs = require('fs')
const chalk = require('chalk')

const _addTask = (name, description) => {

    debugger

    const tasks = _loadAllTasks()

    const duplicatedTask = tasks.find((task) => task.name === name)

    if (!duplicatedTask) {
        const newTasks = {
            name,
            description,
            status: 'BACKLOG'
        }
        tasks.push(newTasks)
        saveTask(tasks)

        const successMessage = chalk.green.bold('Task created!');
        console.log(successMessage)
    } else {
        const errorMessage = chalk.red.bold(`Task with name: [${name}] already taken!`);
        console.log(errorMessage)
    }

}

const _removeTask = (name) => {
    const tasks = _loadAllTasks()

    const taskToKeep = tasks.filter((task) => task.name !== name)

    saveTask(taskToKeep)

    console.log(chalk.green.bold(`Tasks with name [${name}] has been removed!`))

}

const _readTask = (name) => {
    const tasks = _loadAllTasks()

    const taskFound = tasks.filter(function (task) {
        return task.name === name
    })


    if (taskFound !== undefined) {
        return taskFound
    } else {
        return {}
    }

}

const saveTask = (task) => {
    const taskJSON = JSON.stringify(task);
    fs.writeFileSync('tasks.json', taskJSON);
}


const _loadAllTasks = () => {

    //ler todas as tarefas
    try {
        const tasksBuffer = fs.readFileSync('tasks.json')
        return JSON.parse(tasksBuffer.toString());
    } catch (error) {

        return [];
    }
}

const _updateTask = (name, status) => {
    const tasks = _loadAllTasks()
    
    tasks.find(function(task){
        if(task.name === name){
            task.status = status
        }
    })

    saveTask(tasks)
    console.log(chalk.green.bold(`Task satus with name [${name}] has been updated!`))
}


module.exports = {
    addTask: _addTask,
    removeTask: _removeTask,
    listAllTasks: _loadAllTasks,
    readTask: _readTask,
    updateTask: _updateTask
}