export { setCurrentProject, getCurrentProject, createNavbar, createNavListItem, createProjectListItem, createAddProject}
import { createProject, removeProject, getProjects } from './task'
import { clearTasks, createTaskItem, revealTaskAddButton } from './taskDOM'

//creating the basic navbar
function createNavbar() {
    let navBar = document.createElement('div');
    navBar.setAttribute('id', 'nav-bar');
    navBar.innerHTML = `
                        <div class="default-list nav-list"></div>
                            
                        <div class="nav-bar-header"><h1>Projects</h1></div>

                        <div class="project-list nav-list"></div>
                            
                        `;
    document.querySelector('main').appendChild(navBar);
    //return navBar;
}

//creating default list item
function createNavListItem(title, icon) {
    let item = document.createElement('button');
    item.classList.add("default-list-items", "nav-list-items")
    item.innerHTML = `
                        <i class="fas ${icon}"></i>
                        <p>${title}</p>
                     `;
    document.querySelector('.default-list').appendChild(item);
    return item
}


let currentProject = 'default';


function getCurrentProject() {
    return currentProject;
}


function setCurrentProject(newCurrentProject) {
    currentProject = newCurrentProject;
}


//creating project list item
function createProjectListItem(title) {
    let item = document.createElement('button');
    item.classList.add("project-list-items", "nav-list-items")
    item.innerHTML = `  
                        <i class="fas fa-tasks"></i>
                        <p>${title}</p>
                        <i class="fas fa-times"></i>
                     `;
    document.querySelector('.project-list').appendChild(item);

    let deleteIcon = item.querySelector('.fa-times');

    deleteIcon.addEventListener('click', function(event) {
        item.remove();
        removeProject(title);
    })
    
    return {projectDOM : item, title};
}






//creating add project section
function createAddProject(title) {
    let addWrapper = document.createElement('div');
    addWrapper.classList.add('add-project-wrapper');
    document.querySelector('#nav-bar').appendChild(addWrapper);

    let addButton = document.createElement('div');
    addButton.classList.add('project-add-button', 'nav-list-items');
    addButton.innerHTML = `<i class="fas fa-plus"></i>
                           <p>${title}</p>`;
    addWrapper.appendChild(addButton);

    let addProject = document.createElement('div')
    addProject.classList.add('add-project')
    addProject.innerHTML = `
                            <input class="add-project-input" type="text">
                            <div class="add-project-buttons">
                                <button class="add-project-button project-button">Add</button>
                                <button class="add-project-cancel project-button">Cancel</button>
                            </div>
                            `
    addProject.style.display = 'none';
    addWrapper.appendChild(addProject)

    //functionality for add-button
    addButton.addEventListener('click', function(event) {
        this.style.display = 'none'
        addProject.style.display = 'flex'
    })
    
    //funtionality for addProject buttons
    let add = addProject.querySelector('.add-project-button');
    let cancel = addProject.querySelector('.add-project-cancel');
    let input = addProject.querySelector('.add-project-input');
    //add functionality
    add.addEventListener('click', function(event) {
        let value = input.value;
        if (value == '') {
            return;
        }
        createProject(value);
        let projects = getProjects();
        let p = createProjectListItem(value);
        let projectDom = p['projectDOM'];
        let projectTitle = p['title'];
        projectDom.addEventListener('click', function(event) {
            clearTasks();
            currentProject = projectTitle;
            //console.log(getProjects())
            for (let task of projects[projectTitle]) {
                createTaskItem(task);
            }
            revealTaskAddButton()
        })
        addProject.style.display = 'none';
        addButton.style.display = 'flex';
        
    })
    //cancel functionality
    cancel.addEventListener('click', function(event) {
        addProject.style.display = 'none';
        addButton.style.display = 'flex';
    })


}



