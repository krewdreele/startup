let user = JSON.parse(localStorage.getItem("this-user"));
let date = new Date();

let input = document.getElementById("search-input");
let meals = [];
let selectedMeal = null;

for (let i in user.meals) {
  item = JSON.parse(user.meals[i]);
  meals.push(item);
}

input.onkeyup = searchMeals;

function onStart() {
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

function addMeal() {
  if (selectedMeal != null) {
    let meal_info = meals.find(
      (meal) => meal.name === selectedMeal.textContent
    );

    user.total_calories =
      Number(user.total_calories) + Number(meal_info.calories);
    user.total_protein = Number(user.total_protein) + Number(meal_info.protein);
    user.total_fat = Number(user.total_fat) + Number(meal_info.fat);
    user.total_carbs = Number(user.total_carbs) + Number(meal_info.carbs);

    localStorage.setItem("this-user", JSON.stringify(user));

    updateTotals();
    clear();
  }
}

function updateTotals() {
  document.getElementById("total-cals").textContent = user.total_calories;
  document.getElementById("total-protein").textContent = user.total_protein;
  document.getElementById("total-fat").textContent = user.total_fat;
  document.getElementById("total-carbs").textContent = user.total_carbs;
}

function clear() {
  input.value = "";
  document.getElementById("meal-search-container").textContent = "";
}
