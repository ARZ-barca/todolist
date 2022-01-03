export {createTasksDOM, createTaskItem, createTaskAdd, clearTasks, hideTaskAddButton, revealTaskAddButton}

import { changeTaskDone, createTask, getProjects, deleteTaskD, changeTaskDescription, changeTaskDate, deleteTask} from './task'
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
                                <i class="fas fa-check-circle"></i>
                                <p class="description">${task.description}</p>
                                <input class="description-input" type="text">
                              </div>
                              <div class="task-right-side">
                                <p class="date">${task.date}</p>
                                <input class="date-input" type="date">
                                <i class="fas fa-times"></i>
                              </div>`;
    
    document.querySelector('.tasks-wrapper').appendChild(taskWrapper);
    
    if (!task.done) {
        taskWrapper.style.backgroundColor = 'transparent';
    } else {
        taskWrapper.style.backgroundColor = 'rgb(79, 209, 79)';
    }


    //deleting the task
    let deleteIcon = taskWrapper.querySelector('.fa-times');
    deleteIcon.addEventListener('click', function(event) {
        taskWrapper.remove();
        deleteTask(task);
    })

    let description = taskWrapper.querySelector('.description');
    description.style.cursor = 'pointer';
    let date = taskWrapper.querySelector('.date');


    //changing the description
    let descriptionInput = taskWrapper.querySelector('.description-input') 
    descriptionInput.style.display = 'none';

    description.addEventListener('click', function(event) {
        description.style.display = 'none';
        descriptionInput.style.display = 'block';
    })

    descriptionInput.addEventListener('keydown', function(event) {
        if (descriptionInput.style.display == 'none') {
            return;
        }
        //console.log(event.key)
        if (event.key === 'Enter') {
            //console.log(descriptionInput.value)
            if (descriptionInput.value === "") {
                alert("task name can't be empty");
                return;
            } else {
                let newValue = descriptionInput.value;
                description.textContent = newValue;
                changeTaskDescription(task, newValue);
            }
            description.style.display = 'block';
            descriptionInput.style.display = 'none';
            descriptionInput.value = '';

        } 
        if (event.key === 'Escape') {
            //console.log(1)
            description.style.display = 'block';
            descriptionInput.style.display = 'none';
            descriptionInput.value = '';
        }
    })

    // date input

    let dateInput = taskWrapper.querySelector('.date-input');
    dateInput.style.display = 'none';

    date.addEventListener('click', function(event) {
        date.style.display = 'none';
        dateInput.style.display = 'block'
    })

    dateInput.addEventListener('keydown', function(event) {
        if (dateInput.style.display == 'none') {
            return;
        }
        if (event.key === 'Escape') {
            date.style.display = 'block';
            dateInput.style.display = 'none';
        }
    })

    dateInput.addEventListener('change', function(event) {
        let newDate = dateInput.value;
        //console.log(newDate);
        date.textContent = newDate;
        date.style.display = 'block';
        dateInput.style.display = 'none';
        changeTaskDate(task, newDate);
    })

    // changing the Done status

    let checkIcon = taskWrapper.querySelector('.fa-check-circle');
    checkIcon.addEventListener('click', function(event) {
        if (taskWrapper.style.backgroundColor === 'rgb(79, 209, 79)') {
            taskWrapper.style.backgroundColor = 'transparent';
            changeTaskDone(task, false);
        } else {
            taskWrapper.style.backgroundColor = 'rgb(79, 209, 79)';
            changeTaskDone(task, true);
        }
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
    document.querySelector('.tasks-wrapper').innerHTML = '';
}

function hideTaskAddButton() {
    document.querySelector('.task-add-button').style.display = 'none';
    document.querySelector('.add-task').style.display = 'none';
}

function revealTaskAddButton() {
    document.querySelector('.task-add-button').style.display = 'flex';
}


