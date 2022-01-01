import { getProjects, getTasks } from './task'
import { createHeader } from './headerFooter'
import { setCurrentProject, getCurrentProject, createNavbar, createNavListItem, createProjectListItem, createAddProject } from './sidebar'
import { createTasksDOM, createTaskItem, createTaskAdd, clearTasks } from './taskDOM'
import { format, add } from 'date-fns'



//creates header with given heading
createHeader('Todo List');

//create the navbar
createNavbar();

//create the default headings
let defaultProject = createNavListItem('Inbox', 'fa-thumbtack');
defaultProject.addEventListener('click', function(event) {
    clearTasks()
    let projects = getProjects()
    setCurrentProject('default')
    for (let task of projects['default']) {
        createTaskItem(task)
    }
})


let todayDom = createNavListItem('Today', 'fa-calendar-day');
todayDom.addEventListener('click', function(event) {
    clearTasks();
    let today = format(new Date(), 'yyyy-MM-dd');
    //console.log(today)
    //console.log(typeof today)
    let tasks = getTasks();
    for (let task of tasks) {
        createTaskItem(task);
    }
})


let thisWeekDom = createNavListItem('This Week', 'fa-calendar-week');
thisWeekDom.addEventListener('click', function(event) {
    let today = format(new Date(), 'yyyy-MM-dd');
    //let endOfWeek = format(add(new Date(), {days}))
})

(() => {
    let projects = getProjects();

    for (let project in projects) {
        if (project == 'default') {
            continue;
        }
        let P = createProjectListItem(project);
        let projectDom = p['projectDOM'];
        let projectTitle = p['title'];
        projectDom.addEventListener('click', function(event) {
            clearTasks();
            for (let task of projects[project]) {
                createTaskItem(task);
            }
            setCurrentProject(project)
        })
    }
})()


createAddProject('Add Project');

//tasks dom
createTasksDOM();

createTaskAdd();

