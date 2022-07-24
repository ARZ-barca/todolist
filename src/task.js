const tasks = {"default": []};

function Task(description, date) {
  return {description, date};
}

function addTask(project, description, date) {
  let task = Task(description, date);
  tasks[project].push(task);
}

function addProject(title) {
  tasks[title] = [];
}

function getTasksStr() {
  return JSON.stringify(tasks);
}

export {getTasksStr, addProject}












