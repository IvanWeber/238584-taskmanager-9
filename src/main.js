import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSearchTemplate} from './components/search.js';
import {createFilterTemplate} from './components/filter.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createBoardTemplate} from './components/board.js';
import {createSortingTemplate} from './components/sorting.js';

const NUMBER_OF_DEFAULT_TASKS = 3;

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
render(taskListElement, createTaskEditTemplate(), `beforeend`);

for (let i = 1; i <= NUMBER_OF_DEFAULT_TASKS; i++) {
  render(taskListElement, createTaskTemplate(), `beforeend`);
}

// Рендерим кнопку
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
