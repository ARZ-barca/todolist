export { getTasks, createTask, changeTaskDescription, changeTaskDate, deleteTask, createProject, getProject, getProjects, removeProject }



let tasks = []

let projects = {'default': []}



function createTask(description, date, project = 'default') {
    //let date;
    let task = {description, date, project};
    tasks.push(task);
    addToProjects(project, task);
    return task;
}


function getTasks() {
    return tasks
}


function changeTaskDescription(task, project, newValue) {
    tasks[tasks.indexOf(task)].description = newValue;
    projects[project][projects[project].indexOf(task)].description = newValue;
}


function changeTaskDate(task, project, newValue) {
    tasks[tasks.indexOf(task)].date = newValue;
    projects[project][projects[project].indexOf(task)].date = newValue;
}


function deleteTask(task, project) {
    tasks.splice(tasks.indexOf(task), 1);
    projects[project].splice(projects[project].indexOf(task), 1)
}


function createProject(title) {
    projects[title] = []
}


function addToProjects(project, task) {
    if (projects[project] == undefined) {
        projects[project] = [];
    }

    projects[project].push(task);
}

function getProjects() {
    return Object.assign({}, projects);
}

function removeProject(title) {
    delete projects[title]
}


function getProject(title){
    return projects[title]
}


function sortTasks(tasks) {
    tasks.sort(function(a, b) {
        // TODO
        //return a[date] - b[date]
    })
}



















