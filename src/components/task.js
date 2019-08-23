export const createTaskTemplate = (task) => {
  const date = new Date(task.dueDate);
  const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`,
    `July`, `August`, `September`, `October`, `November`, `December`
  ];
  return `<article class="card card--black">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${task.description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date.getDate()} ${monthNames[date.getMonth()]}</span>
                  <span class="card__time">${date.getHours() > 11 ? (date.getHours() - 12) : date.getHours()}:${date.getMinutes()} ${date.getHours() > 11 ? `PM` : `AM`}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              
                    ${Object.keys(task.tags).map(function (key) {
    if (task.tags[key] !== undefined) {
      return `<span class="card__hashtag-inner">
                                    <span class="card__hashtag-name">
                                      #${task.tags[key]}
                                    </span>
                                  </span>`;
    }
    return ``;
  }).join(``)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
};
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp*1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();
//
// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
