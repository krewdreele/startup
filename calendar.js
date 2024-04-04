let user = JSON.parse(localStorage.getItem("this-user"));
document.getElementById("username").textContent = user.username;
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
let daily_goal = null;
let log = null;
window.onload = onLoad;

async function onLoad() {
  const response = await fetch(`api/goal?user=${user.username}&type=daily`);

  if (response.status === 200) {
    daily_goal = await response.json();
  }
  setCalendar();
}

async function loadMonth() {
  const response = await fetch(
    `api/monthly/totals?user=${user.username}&month=${current_month.id}`
  );

  return response.json();
}

async function setCalendar() {
  log = await loadMonth();

  document.getElementById("month-name").textContent = current_month.name;
  let calendar = document.getElementById("calendar");
  calendar.textContent = "";

  for (let i = 0; i < current_month.start_day; i++) {
    let blank = document.createElement("button");
    blank.className = "btn btn-light";
    calendar.appendChild(blank);
  }

  for (let i = 1; i <= current_month.num_days; i++) {
    let day_btn = document.createElement("button");

    let day = await log[i];
    if (!day) {
      day_btn.className = "btn btn-light";
    } else {
      let hit_cals = false;
      let hit_protein = false;
      let hit_fat = false;
      let hit_carbs = false;

      let parts = daily_goal.calories.split(" ");
      if (parts[0] === "<") {
        hit_cals = day.calories <= parts[1] ? true : false;
      } else {
        hit_cals = day.calories >= parts[1] ? true : false;
      }

      parts = daily_goal.protein.split(" ");
      if (parts[0] === "<") {
        hit_protein = day.protein <= parts[1] ? true : false;
      } else {
        hit_protein = day.protein >= parts[1] ? true : false;
      }

      parts = daily_goal.fat.split(" ");
      if (parts[0] === "<") {
        hit_fat = day.fat <= parts[1] ? true : false;
      } else {
        hit_fat = day.fat >= parts[1] ? true : false;
      }

      parts = daily_goal.carbs.split(" ");
      if (parts[0] === "<") {
        hit_carbs = day.carbs <= parts[1] ? true : false;
      } else {
        hit_carbs = day.carbs >= parts[1] ? true : false;
      }

      if (hit_cals && hit_carbs && hit_fat && hit_protein) {
        day_btn.className = "btn btn-success";
      } else {
        day_btn.className = "btn btn-danger";
      }
    }

    day_btn.setAttribute("data-bs-toggle", "modal");
    day_btn.setAttribute("data-bs-target", "#calendar-date");
    day_btn.setAttribute("onclick", "dateClicked(this)");
    day_btn.textContent = i;

    if (i === current_day && current_month === months[date.getMonth()]) {
      day_btn.style.border = "3px solid black";
    }
    calendar.appendChild(day_btn);
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

async function dateClicked(element) {
  let title = current_month.name + " " + element.textContent;
  document.getElementById("calendar-date-label").textContent = title;

  let totals = await log[element.textContent];

  if (totals) {
    document.getElementById("log-calories").textContent = totals.calories;
    document.getElementById("log-protein").textContent = totals.protein;
    document.getElementById("log-fat").textContent = totals.fat;
    document.getElementById("log-carbs").textContent = totals.carbs;
  }
}
