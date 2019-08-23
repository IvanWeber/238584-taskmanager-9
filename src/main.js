import {Data} from './components/data.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSearchTemplate} from './components/search.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createBoardTemplate} from './components/board.js';
import {createSortingTemplate} from './components/sorting.js';


const NUMBER_OF_DEFAULT_TASKS = 19;
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

const dataObject = new Data(NUMBER_OF_DEFAULT_TASKS, MILLISECONDS_IN_DAY);

const tasks = dataObject.getTasks();

console.log(tasks);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Рендерим контролы
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSearchTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);

// Рендерим задачи

for (let i = 0; i < NUMBER_OF_DEFAULT_TASKS; i++) {
  if (i === 0) {
    render(taskListElement, createTaskEditTemplate(tasks[i]), `beforeend`);
  } else {
    render(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
  }
}

// Рендерим кнопку
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
