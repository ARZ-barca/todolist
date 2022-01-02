export { changeTaskDone, getLocalStorage, getTasks, createTask, changeTaskDescription, changeTaskDate, deleteTask, createProject, getProject, getProjects, removeProject }

/*
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
*/


let tasks = []

let projects = {'default': []}


function getLocalStorage() {
    if (localStorage.length == 0) {
        return;
    }
    tasks = JSON.parse(localStorage.getItem('tasks'));
    projects = JSON.parse(localStorage.getItem('projects'));
}


function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('projects', JSON.stringify(projects));
}


function createTask(description, date, project = 'default') {
    //let date;
    let task = {description, date, project, done : false};
    tasks.push(task);
    addToProjects(project, task);
    updateLocalStorage();
    return task;
}


function getTasks() {
    return tasks
}


function changeTaskDescription(task, project, newValue) {
    tasks[tasks.indexOf(task)].description = newValue;
    projects[project][projects[project].indexOf(task)].description = newValue;
    updateLocalStorage();
}


function changeTaskDate(task, project, newValue) {
    tasks[tasks.indexOf(task)].date = newValue;
    projects[project][projects[project].indexOf(task)].date = newValue;
    updateLocalStorage();
}


function changeTaskDone(task, project, newValue) {
    // console.log(task)
    // console.log(project)
    // console.log(tasks, '--', projects)
    // problem here
    tasks[tasks.indexOf(task)].done = newValue;
    projects[project][projects[project].indexOf(task)].done = newValue;
    updateLocalStorage();
}


function deleteTask(task, project) {
    tasks.splice(tasks.indexOf(task), 1);
    projects[project].splice(projects[project].indexOf(task), 1)
    updateLocalStorage();
}


function createProject(title) {
    projects[title] = [];
    updateLocalStorage();
}


function addToProjects(project, task) {
    if (projects[project] == undefined) {
        projects[project] = [];
    }

    projects[project].push(task);
    updateLocalStorage();
}


function getProjects() {
    return Object.assign({}, projects);
}


function removeProject(title) {
    delete projects[title]
    updateLocalStorage();
}


function getProject(title){
    return projects[title]
}


/*
function sortTasks(tasks) {
    tasks.sort(function(a, b) {
        // TODO
        //return a[date] - b[date]
    })
}
*/



















