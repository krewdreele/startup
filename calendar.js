document.getElementById("username").textContent =
  localStorage.getItem("this_user");

class Month {
  constructor(name, start_day, num_days, id) {
    this.name = name;
    this.start_day = start_day;
    this.num_days = num_days;
    this.id = id;
  }
}

/*
    sunday - 0
    monday - 1
    tuesday - 2
    wednesday - 3
    thursday - 4
    friday - 5
    saturday - 6
*/

let months = [
  new Month("January", 1, 31, 0),
  new Month("February", 4, 29, 1),
  new Month("March", 5, 31, 2),
  new Month("April", 1, 30, 3),
  new Month("May", 3, 31, 4),
  new Month("June", 6, 30, 5),
  new Month("July", 1, 31, 6),
  new Month("August", 4, 31, 7),
  new Month("September", 0, 30, 8),
  new Month("October", 2, 31, 9),
  new Month("November", 5, 30, 10),
  new Month("December", 0, 31, 11),
];

let date = new Date();
let current_month = months[date.getMonth()];
let current_day = date.getDate();
setCalendar();

function setCalendar() {
  document.getElementById("month-name").textContent = current_month.name;
  let calendar = document.getElementById("calendar");
  calendar.textContent = "";

  for (let i = 0; i < current_month.start_day; i++) {
    let blank = document.createElement("button");
    blank.className = "btn btn-light";
    calendar.appendChild(blank);
  }

  for (let i = 1; i <= current_month.num_days; i++) {
    let date_string = current_month.name + " " + i;

    let log_info = localStorage.getItem(date_string) ?? "";
    if (log_info) {
      log_info = JSON.parse(log_info);
    }

    let hit_goal = log_info?.hit_goal ?? 2;

    let day = document.createElement("button");

    if (hit_goal === 1) {
      day.className = "btn btn-outline-success";
    } else if (hit_goal === 0) {
      day.className = "btn btn-outline-danger";
    } else if (hit_goal === 2) {
      day.className = "btn btn-light";
    }

    day.setAttribute("data-bs-toggle", "modal");
    day.setAttribute("data-bs-target", "#calendar-date");
    day.setAttribute("onclick", "dateClicked(this)");
    day.textContent = i;

    if (i === current_day && current_month === months[date.getMonth()]) {
      day.style.border = "3px solid black";
    }
    calendar.appendChild(day);
  }
}

function nextMonth() {
  current_month = months[(current_month.id + 1) % 12];
  setCalendar();
}

function prevMonth() {
  new_index = current_month.id - 1;
  if (new_index < 0) {
    new_index = 11;
  }
  current_month = months[new_index];
  setCalendar();
}

function dateClicked(element) {
  let date = current_month.name + " " + element.textContent;
  document.getElementById("calendar-date-label").textContent = date;
}
