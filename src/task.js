export {
  changeTaskDone,
  getLocalStorage,
  getTasks,
  createTask,
  changeTaskDescription,
  changeTaskDate,
  deleteTask,
  createProject,
  getProjects,
  deleteProject,
  changeProject,
};

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

let tasks = [];

let projects = ["default"];

function getLocalStorage() {
  if (localStorage.length == 0) {
    return;
  }
  if (!localStorage.getItem("tasks") === null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  if (!localStorage.getItem("projects") === null) {
    projects = JSON.parse(localStorage.getItem("projects"));
  }
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("projects", JSON.stringify(projects));
}

function createTask(description, date, project = "default") {
  //let date;
  let task = { description, date, project, done: false };
  tasks.push(task);
  //addToProjects(project);
  updateLocalStorage();
  return task;
}

function getTasks() {
  return tasks;
}

function getProjects() {
  return projects;
}

function changeTaskDescription(task, newValue) {
  tasks[tasks.indexOf(task)].description = newValue;
  updateLocalStorage();
}

function changeTaskDate(task, newValue) {
  tasks[tasks.indexOf(task)].date = newValue;
  updateLocalStorage();
}

function changeTaskDone(task, newValue) {
  tasks[tasks.indexOf(task)].done = newValue;
  updateLocalStorage();
}

function deleteTask(task) {
  tasks.splice(tasks.indexOf(task), 1);
  updateLocalStorage();
}

function changeTaskProject(task, newProject) {
  tasks[tasks.indexOf(task)].project = newProject;
  updateLocalStorage();
}

function createProject(project) {
  projects.push(project);
  updateLocalStorage();
}

function changeProject(project, newProject) {
  projects.splice(projects.indexOf(project), 1, newProject);
  for (let task of tasks) {
    if (task.project == project) {
      changeTaskProject(task, newProject);
    }
  }
  updateLocalStorage();
}

function deleteProject(title) {
  projects.splice(projects.indexOf(title), 1);
  for (let task of tasks) {
    // console.log(tasks)
    // console.log(task)
    // console.log(task.project, '-', title)
    if (task.project == title) {
      deleteTask(task);
    }
  }
  updateLocalStorage();
}

/*
function sortTasks(tasks) {
    tasks.sort(function(a, b) {
        // TODO
        //return a[date] - b[date]
    })
}
*/
