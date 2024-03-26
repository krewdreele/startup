let user = JSON.parse(localStorage.getItem("this-user"));
let selectedMeal = null;
let meals = [];
let feed = [];
let date = new Date();
let input = document.getElementById("search-input");
let notifications = document.getElementById("notifications");
window.onload = onLoad;

async function onLoad() {
  const response = await fetch(`api/meals?user=${user.username}`);
  let response_meals = await response.json();

  if (response.ok) {
    for (let i in response_meals) {
      item = response_meals[i];
      meals.push(item);
    }
  }
  input.onkeyup = searchMeals;

  document.getElementById("username").textContent = user.username;
  updateTotals();
  if (!socket) initializeSocket(user.username);
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    let post = await createPostHtml(msg);
    notifications.appendChild(post);
    feed.push(msg);
    localStorage.setItem("feed", JSON.stringify(feed));
  };

  feed = JSON.parse(localStorage.getItem("feed"));
  if (feed.length != notifications.childElementCount) {
    for (i of feed) {
      let post = await createPostHtml(i);
      notifications.appendChild(post);
    }
  }
}

function searchMeals() {
  let searchList = meals.filter((meal) => {
    return meal.name.toLowerCase().startsWith(input.value.toLowerCase());
  });
  let container = document.getElementById("meal-search-container");
  container.innerText = "";
  for (let i in searchList) {
    let el = document.createElement("button");
    el.textContent = searchList[i].name;
    el.className = "btn btn-outline-info";
    el.setAttribute("onclick", "selectMeal(this)");
    container.appendChild(el);
  }
}

function selectMeal(element) {
  let container = document.getElementById("meal-search-container");
  for (let i in container.children) {
    container.children[i].className = "btn btn-outline-info";
  }
  element.className = "btn btn-info";
  selectedMeal = element;
  input.value = element.textContent;
}

async function addMeal() {
  if (selectedMeal != null) {
    let meal_info = meals.find(
      (meal) => meal.name === selectedMeal.textContent
    );

    let add = {
      calories: meal_info.calories,
      protein: meal_info.protein,
      fat: meal_info.fat,
      carbs: meal_info.carbs,
    };

    let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

    const response = await fetch(
      `api/totals?user=${user.username}&date=${date_str}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(add),
      }
    );

    updateTotals();
    clear();
  }
}

async function updateTotals() {
  let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

  const response = await fetch(
    `api/totals?user=${user.username}&date=${date_str}`
  );

  if (response.ok) {
    let totals = await response.json();
    document.getElementById("total-cals").textContent = totals.calories;
    document.getElementById("total-protein").textContent = totals.protein;
    document.getElementById("total-fat").textContent = totals.fat;
    document.getElementById("total-carbs").textContent = totals.carbs;
  }
}

function clear() {
  input.value = "";
  document.getElementById("meal-search-container").textContent = "";
}

async function getInfo(element) {
  let name = element.parentElement.children[0].textContent;
  let username = element.parentElement.parentElement.children[0].textContent;

  const response = await fetch("api/meal", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: username, meal_name: name }),
  });

  if (response.ok) {
    let info = await response.json();

    document.getElementById("meal-info-label").textContent = name.textContent;
    document.getElementById("info-cals").textContent = `${
      info?.calories ?? "N/A"
    }`;
    document.getElementById("info-protein").textContent = `${
      info?.protein ?? "N/A"
    }`;
    document.getElementById("info-fat").textContent = `${info?.fat ?? "N/A"}`;
    document.getElementById("info-carbs").textContent = `${
      info?.carbs ?? "N/A"
    }`;
  }
}
