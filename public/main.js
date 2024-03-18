let user = JSON.parse(localStorage.getItem("this-user"));
let selectedMeal = null;
let meals = [];
let date = new Date();
let input = document.getElementById("search-input");
window.onload = onLoad;

async function onLoad() {
  const response = await fetch(`api/meals?user=${user.username}`);
  let response_meals = await response.json();

  for (let i in response_meals) {
    item = response_meals[i];
    meals.push(item);
  }

  input.onkeyup = searchMeals;

  document.getElementById("username").textContent = user.username;
  updateTotals();
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

    add = {
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
      calories: meal_info.calories,
      protein: meal_info.protein,
      fat: meal_info.fat,
      carbs: meal_info.carbs,
    };

    const response = await fetch(`api/totals?user=${user.username}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(add),
    });

    updateTotals();
    clear();
  }
}

async function updateTotals() {
  let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

  const response = await fetch(
    `api/totals?user=${user.username}&date=${date_str}`
  );

  if (response.status === 200 || response.status === 201) {
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
