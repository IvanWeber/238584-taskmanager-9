export class Data {
  constructor(numberOfDefaultTasks, millisecondsInDay) {
    this._numberOfDefaultTasks = numberOfDefaultTasks;
    this._millisecondsInDay = millisecondsInDay;
  }

  getNewRandomArrayFromArray(array, upperLimitOfRandomQuantity) {
    let newArray = [];
    const quantityOfElements = Math.round(Math.random() * upperLimitOfRandomQuantity);
    if (quantityOfElements !== 0) {
      for (let i = 0; i < quantityOfElements; i++) {
        const randomArrayIndex = Math.round(Math.random() * array.length);
        newArray.push(array[randomArrayIndex]);
        array.splice(randomArrayIndex, 1);
      }
    }
    return newArray;
  }

  getTask() {
    let tagsToBeProcessed = Array.from(new Set([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`,
    ]));

    return {
      description: [
        `Изучить теорию`,
        `Сделать домашку`,
        `Пройти интенсив на соточку`,
      ][Math.floor(Math.random() * 3)],
      dueDate: Date.now() - 7 * this._millisecondsInDay + Math.round(Math.random() * 14 * this._millisecondsInDay),
      tags: this.getNewRandomArrayFromArray(tagsToBeProcessed, 3),
      repeatingDays: {
        'mo': Math.round(Math.random()) === 1,
        'tu': Math.round(Math.random()) === 1,
        'we': Math.round(Math.random()) === 1,
        'th': Math.round(Math.random()) === 1,
        'fr': Math.round(Math.random()) === 1,
        'sa': Math.round(Math.random()) === 1,
        'su': Math.round(Math.random()) === 1,
      },
      color: [
        `black`,
        `yellow`,
        `blue`,
        `green`,
        `pink`,
      ][Math.floor(Math.random() * 5)],
      isFavorite: Math.round(Math.random()) === 1,
      isArchive: Math.round(Math.random()) === 1,
    };
  }

  getTasks() {
    let tasks = [];
    for (let i = 0; i < this._numberOfDefaultTasks; i++) {
      tasks.push(this.getTask());
    }
    return tasks;
  }

  getFilterAll(tasks) {
    return {
      title: `All`,
      count: tasks.filter((t) => !t.isActive).length,
    };
  }

  getFilterOverdue(tasks) {
    const now = Date.now();
    return {
      title: `Overdue`,
      count: tasks.filter((t) => t.dueDate < now).length,
    };
  }

  getFilterToday(tasks) {
    let count = 0;
    tasks.forEach((task) => {
      const isThereStillTime = task.dueDate > Date.now();
      const daysPastSince1970AtNow = task.dueDate - task.dueDate % this._millisecondsInDay;
      const daysPastSince1970AtDeadline = Date.now() % this._millisecondsInDay;
      const isSameDate = daysPastSince1970AtNow === daysPastSince1970AtDeadline;
      if (isThereStillTime && isSameDate) {
        count++;
      }
    });
    return {
      title: `Overdue`,
      count,
    };
  }

  getFilterFavorites(tasks) {
    return {
      title: `Favorites`,
      count: tasks.filter((t) => t.isFavorite).length,
    };
  }

  getFilterRepeating(tasks) {
    let count = 0;
    tasks.forEach((task) => {
      Object.values(task.repeatingDays).forEach((repeatingDay) => {
        if (repeatingDay === true) {
          count++;
        }
      });
    });
    return {
      title: `Repeating`,
      count,
    };
  }

  getFilterTags(tasks) {
    let count = 0;
    tasks.forEach((task) => {
      if (typeof task.tags === `object`) {
        count++;
      }
    });
    return {
      title: `Tags`,
      count,
    };
  }

  getFilterArchive(tasks) {
    return {
      title: `Archive`,
      count: tasks.filter((t) => t.isArchive).length,
    };
  }
}
