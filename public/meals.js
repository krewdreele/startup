let mode = "Breakfast";
let user = JSON.parse(localStorage.getItem("this-user"));

function changeMode(element) {
  mode = element.textContent.trim();
}

function loadMeals() {
  document.getElementById("username").textContent = user.username;

  let breakfast_container = document.getElementById("Breakfast").children[0];
  let lunch_container = document.getElementById("Lunch").children[0];
  let dinner_container = document.getElementById("Dinner").children[0];

  for (let i in user.meals) {
    item = JSON.parse(user.meals[i]);
    if (item.type == "Breakfast") {
      createCard(item, breakfast_container);
    } else if (item.type == "Lunch") {
      createCard(item, lunch_container);
    } else if (item.type == "Dinner") {
      createCard(item, dinner_container);
    }
  }
}

function createCard(item, container) {
  let card = document.createElement("div");
  card.className = "card";

  let html_img = document.createElement("img");

  let body = document.createElement("div");
  body.className = "card-body";

  let meal_name = document.createElement("h5");
  meal_name.textContent = item.name;

  let meal_desc = document.createElement("p");
  meal_desc.className = "card-text";
  meal_desc.textContent = item.description;

  let button = document.createElement("button");
  button.className = "btn btn-info";
  button.setAttribute("data-bs-target", "#meal-info");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("onclick", "getInfo(this)");
  button.textContent = "Info";

  card.appendChild(html_img);
  card.appendChild(body);
  body.appendChild(meal_name);
  body.appendChild(meal_desc);
  body.appendChild(button);

  container.appendChild(card);
}

function saveMeal() {
  let name = document.getElementById("name");
  let desc = document.getElementById("desc");
  let calories = document.getElementById("cals");
  let protein = document.getElementById("protein");
  let fat = document.getElementById("fat");
  let carbs = document.getElementById("carbs");
  let img = document.getElementById("meal-img");

  if (
    name.value &&
    desc.value &&
    calories.value &&
    protein.value &&
    fat.value &&
    carbs.value
  ) {
    let card_container = document.getElementById(mode).children[0];

    let card = document.createElement("div");
    card.className = "card";

    let html_img = document.createElement("img");

    let body = document.createElement("div");
    body.className = "card-body";

    let meal_name = document.createElement("h5");
    meal_name.textContent = name.value;

    let meal_desc = document.createElement("p");
    meal_desc.className = "card-text";
    meal_desc.textContent = desc.value;

    let button = document.createElement("button");
    button.className = "btn btn-info";
    button.setAttribute("data-bs-target", "#meal-info");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("onclick", "getInfo(this)");
    button.textContent = "Info";

    card.appendChild(html_img);
    card.appendChild(body);
    body.appendChild(meal_name);
    body.appendChild(meal_desc);
    body.appendChild(button);

    card_container.appendChild(card);

    user.meals.push(
      JSON.stringify({
        type: mode,
        name: name.value,
        description: desc.value,
        calories: calories.value,
        protein: protein.value,
        fat: fat.value,
        carbs: carbs.value,
      })
    );

    localStorage.setItem("this-user", JSON.stringify(user));

    name.value = "";
    desc.value = "";
    calories.value = "";
    protein.value = "";
    fat.value = "";
    carbs.value = "";
  } else {
    alert();
  }
}

function alert() {
  meal_alert = document.getElementById("meal-alert");
  meal_alert.style.display = "block";
  meal_alert.textContent = "Please fill out all the fields!";

  setTimeout(() => {
    meal_alert.style.display = "none";
  }, 2500);
}

function getInfo(element) {
  let name = element.parentElement.children[0];

  let info = JSON.parse(localStorage.getItem(name.textContent));

  document.getElementById("meal-info-label").textContent = name.textContent;
  document.getElementById("info-cals").textContent = `${
    info?.calories ?? "N/A"
  }`;
  document.getElementById("info-protein").textContent = `${
    info?.protein ?? "N/A"
  }`;
  document.getElementById("info-fat").textContent = `${info?.fat ?? "N/A"}`;
  document.getElementById("info-carbs").textContent = `${info?.carbs ?? "N/A"}`;
}

function editInfo(element) {
  document.getElementById("save-info-button").style.display = "block";
  element.style.display = "none";

  let calorie_info = document.getElementById("info-cals");
  let protein_info = document.getElementById("info-protein");
  let fat_info = document.getElementById("info-fat");
  let carb_info = document.getElementById("info-carbs");

  let calorie_input = document.createElement("input");
  calorie_input.setAttribute("type", "text");
  calorie_input.setAttribute("id", "cal-in");
  calorie_input.style.width = "50%";
  calorie_input.value = calorie_info.textContent;

  let protein_input = document.createElement("input");
  protein_input.setAttribute("type", "text");
  protein_input.setAttribute("id", "protein-in");
  protein_input.style.width = "50%";
  protein_input.value = protein_info.textContent;

  let fat_input = document.createElement("input");
  fat_input.setAttribute("type", "text");
  fat_input.setAttribute("id", "fat-in");
  fat_input.style.width = "50%";
  fat_input.value = fat_info.textContent;

  let carb_input = document.createElement("input");
  carb_input.setAttribute("type", "text");
  carb_input.setAttribute("id", "carb-in");
  carb_input.style.width = "50%";
  carb_input.value = carb_info.textContent;

  let body = element.parentElement.parentElement.children[1];

  body.replaceChild(calorie_input, calorie_info);
  body.replaceChild(protein_input, protein_info);
  body.replaceChild(fat_input, fat_info);
  body.replaceChild(carb_input, carb_info);
}

function cancelEdit(element) {
  if (document.getElementById("save-info-button").style.display === "none")
    return;

  document.getElementById("edit-button").style.display = "block";
  document.getElementById("save-info-button").style.display = "none";

  let name = document.getElementById("meal-info-label");
  let info = JSON.parse(localStorage[name.textContent]);

  let calories = document.createElement("p");
  calories.setAttribute("id", "info-cals");
  calories.textContent = info.calories;

  let protein = document.createElement("p");
  protein.setAttribute("id", "info-protein");
  protein.textContent = info.protein;

  let fat = document.createElement("p");
  fat.setAttribute("id", "info-fat");
  fat.textContent = info.fat;

  let carbs = document.createElement("p");
  carbs.setAttribute("id", "info-carbs");
  carbs.textContent = info.carbs;

  let body = element.parentElement.parentElement.children[1];

  let calorie_input = document.getElementById("cal-in");
  let protein_input = document.getElementById("protein-in");
  let fat_input = document.getElementById("fat-in");
  let carb_input = document.getElementById("carb-in");

  body.replaceChild(calories, calorie_input);
  body.replaceChild(protein, protein_input);
  body.replaceChild(fat, fat_input);
  body.replaceChild(carbs, carb_input);
}

function saveInfo(element) {
  document.getElementById("edit-button").style.display = "block";
  element.style.display = "none";

  let name = document.getElementById("meal-info-label");
  let calorie_input = document.getElementById("cal-in");
  let protein_input = document.getElementById("protein-in");
  let fat_input = document.getElementById("fat-in");
  let carb_input = document.getElementById("carb-in");

  for (let i in user.meals) {
    let item = user.meals[i];
    let old_item = 0;
    if (item.name === name.textContent) {
      old_item = i;
    }
  }

  user.meals[old_item].push({
    type: mode,
    name: name.textContent,
    description: old_item.description,
    calories: calorie_input.value,
    protein: protein_input.value,
    fat: fat_input.value,
    carbs: carb_input.value,
  });

  let calories = document.createElement("p");
  calories.setAttribute("id", "info-cals");
  calories.textContent = calorie_input.value;

  let protein = document.createElement("p");
  protein.setAttribute("id", "info-protein");
  protein.textContent = protein_input.value;

  let fat = document.createElement("p");
  fat.setAttribute("id", "info-fat");
  fat.textContent = fat_input.value;

  let carbs = document.createElement("p");
  carbs.setAttribute("id", "info-carbs");
  carbs.textContent = carb_input.value;

  let body = element.parentElement.parentElement.children[1];

  body.replaceChild(calories, calorie_input);
  body.replaceChild(protein, protein_input);
  body.replaceChild(fat, fat_input);
  body.replaceChild(carbs, carb_input);
}
