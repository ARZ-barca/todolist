export {createTasksDOM, createTaskItem, createTaskAdd, clearTasks}

import {createTask, getProjects, deleteTask} from './task'
import { setCurrentProject, getCurrentProject} from './sidebar'

//creatin the tasks section in main
function createTasksDOM() {
    let tasks = document.createElement('div');
    tasks.setAttribute('id', 'tasks');
    tasks.innerHTML = `<div class="tasks-wrapper"></div>`;
    document.querySelector('#main').appendChild(tasks);
}

//creating each task
let taskIndex = 0;
function createTaskItem(task) {
    let taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task');
    
    taskWrapper.innerHTML = `<div class="task-left-side">
                                <i class="far fa-check-circle"></i>
                                <p>${task.description}</p>
                              </div>
                              <div class="task-right-side">
                                <p>${task.date}</p>
                                <i class="fas fa-times"></i>
                              </div>`;
    
    document.querySelector('.tasks-wrapper').appendChild(taskWrapper);

    let deleteIcon = taskWrapper.querySelector('.fa-times');
    deleteIcon.addEventListener('click', function(event) {
        taskWrapper.remove()
        deleteTask(task, getCurrentProject())
    })
}

//creating the adding tasks funcionality
function createTaskAdd() {
    let addTaskWrapper = document.createElement('div');
    addTaskWrapper.classList.add('add-task-wrapper');
    document.querySelector('#tasks').appendChild(addTaskWrapper);

    let addButton = document.createElement('div');
    addButton.classList.add('task-add-button', 'task');
    addButton.innerHTML = `<i class="fas fa-plus"></i>
                           <p>Add Task</p>`;
    addTaskWrapper.appendChild(addButton);

    let addTask = document.createElement('div');
    addTask.classList.add('add-task')
    addTask.innerHTML = `
                        <input class="add-task-input" type="text">
                        <div class="add-task-buttons">
                            <button class="add-task-button task-button">Add</button>
                            <button class="add-task-cancel task-button">Cancel</button>
                        </div>`
    addTask.style.display = 'none'
    addTaskWrapper.appendChild(addTask);

    //funtionality
    addButton.addEventListener('click', function(event) {
        this.style.display = 'none';
        addTask.style.display = 'flex';
    })

    let add = addTask.querySelector('.add-task-button');
    let cancel = addTask.querySelector('.add-task-cancel');
    let input = addTask.querySelector('.add-task-input');

    add.addEventListener('click', function(event) {
        //let projects = getProjects()
        let project = getCurrentProject()
        let value = input.value;
        let task = createTask(value, 'No Date', project)
        if (value == '') {
            return;
        }
        createTaskItem(task)
        addButton.style.display = 'flex';
        addTask.style.display = 'none';
    })

    cancel.addEventListener('click', function(event) {
        addButton.style.display = 'flex';
        addTask.style.display = 'none';
    })

}

function clearTasks() {
    document.querySelector('.tasks-wrapper').innerHTML = ''
}






