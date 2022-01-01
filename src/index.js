import { getProjects } from './task'
import { createHeader } from './headerFooter'
import { setCurrentProject, getCurrentProject, createNavbar, createNavListItem, createProjectListItem, createAddProject } from './sidebar'
import { createTasksDOM, createTaskItem, createTaskAdd, clearTasks } from './taskDOM'




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
createNavListItem('Today', 'fa-calendar-day');
createNavListItem('This Week', 'fa-calendar-week');


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

