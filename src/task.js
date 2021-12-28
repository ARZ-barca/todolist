export default createTask;

let tasks = []

function createTask(title, description, priority, project = "default") {
    let date;
    let task = {title, description, priority, date, project};
    tasks.push(task)
    return task;
}


function deleteTask(index) {
    tasks.splice(index, 1)
}






