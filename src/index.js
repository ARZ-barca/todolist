import { getLocalStorage, getProjects, getTasks } from "./task";
import { createHeader } from "./headerFooter";
import {
  setCurrentProject,
  getCurrentProject,
  createNavbar,
  createNavListItem,
  createProjectListItem,
  createAddProject,
} from "./sidebar";
import {
  createTasksDOM,
  createTaskItem,
  createTaskAdd,
  clearTasks,
  hideTaskAddButton,
  revealTaskAddButton,
} from "./taskDOM";
import { format, add } from "date-fns";

//gets the local storage
getLocalStorage();

//getting the default tasks -- gets called at the very end
function createDefaultTasks() {
  let tasks = getTasks();
  for (let task of tasks) {
    if (task.project == "default") {
      createTaskItem(task);
    }
  }
}

//creates header with given heading
createHeader("Todo List");

//create the navbar
createNavbar();

//create the default headings
let defaultProject = createNavListItem("Inbox", "fa-thumbtack");
defaultProject.addEventListener("click", function (event) {
  clearTasks();
  let tasks = getTasks();
  setCurrentProject("default");
  for (let task of tasks) {
    if (task.project == "default") {
      createTaskItem(task);
    }
  }
  hideTaskAddButton();
  revealTaskAddButton();
});

let todayDom = createNavListItem("Today", "fa-calendar-day");
todayDom.addEventListener("click", function (event) {
  clearTasks();
  let today = format(new Date(), "yyyy-MM-dd");
  //console.log(today)
  //console.log(typeof today)
  let tasks = getTasks();
  for (let task of tasks) {
    if (task.date == today) {
      createTaskItem(task);
    }
  }
  hideTaskAddButton();
});

let thisWeekDom = createNavListItem("This Week", "fa-calendar-week");
thisWeekDom.addEventListener("click", function (event) {
  clearTasks();
  let today = format(new Date(), "yyyy-MM-dd");
  //let endOfWeek = format(add(new Date(), {days}))
  //console.log(format(new Date(), 'ee-eeee-ii-iiii-c'));
  //console.log(format(add(new Date() , {days: 6}), 'ee-eeee-ii-iiii-c-H-mm'))
  let startOfWeek = format(getStartOfWeek(), "yyyy-MM-dd");
  let endOfWeek = format(getEndOfWeek(), "yyyy-MM-dd");
  let tasks = getTasks();
  for (let task of tasks) {
    if (task.date >= startOfWeek && task.date <= endOfWeek) {
      createTaskItem(task);
    }
  }
  hideTaskAddButton();
});

function getEndOfWeek() {
  let today = format(new Date(), "e");
  if (+today < 6) {
    let daysToAdd = 6 - today;
    return add(new Date(), { days: daysToAdd });
  } else if (today == 6) {
    return new Date();
  } else {
    return add(new Date(), { days: 6 });
  }
}

function getStartOfWeek() {
  let today = format(new Date(), "e");
  if (+today == 7) {
    return new Date();
  } else {
    return add(new Date(), { days: -today });
  }
}

//creating the existing projects
(() => {
  let projects = getProjects();
  for (let project of projects) {
    if (project == "default") {
      continue;
    }

    let p = createProjectListItem(project);
    let projectDom = p["projectDOM"];
    //let projectTitle = projectDom.querySelector('.project-title').textContent;

    //let projectTitle = p['title'];
    projectDom.addEventListener("click", function (event) {
      let tasks = getTasks();
      let projectTitle = projectDom.querySelector(".project-title").textContent;
      clearTasks();
      setCurrentProject(projectTitle);
      for (let task of tasks) {
        if (task.project == getCurrentProject()) {
          createTaskItem(task);
        }
      }
      hideTaskAddButton();
      revealTaskAddButton();
    });
  }
})();

createAddProject("Add Project");

//tasks dom
createTasksDOM();

createTaskAdd();

createDefaultTasks();
