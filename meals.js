document.getElementById("username").textContent = localStorage.getItem("this_user");

function saveMeal(){
    let container = document.getElementById("add-meal-container");

    let name = document.getElementById("name");
    let desc = document.getElementById("desc");
    let calories = document.getElementById("cals");
    let protein = document.getElementById("protein");
    let fat = document.getElementById("fat");
    let carbs = document.getElementById("carbs");
    let img = document.getElementById("meal-img");

    if(name.value && desc.value && calories.value && protein.value && fat.value && carbs.value){
        let card_container = document.getElementById("card-container");

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

        localStorage.setItem(name.value, JSON.stringify({
            "calories" : calories.value,
            "protein" : protein.value,
            "fat" : fat.value,
            "carbs" : carbs.value
        }))
        
    }
    else{
        alert();
    }
}

async function alert(){
    meal_alert = document.getElementById("meal-alert");
    meal_alert.style.display = "block";
    meal_alert.textContent = "Please fill out all the fields!"

    await setTimeout(() => {meal_alert.style.display = "none";}, 2500);
}

function getInfo(element){
    let name = element.parentElement.children[0];

    let info = JSON.parse(localStorage.getItem(name.textContent));

    document.getElementById("info-cals").textContent = `Calories: ${info.calories}`;
    document.getElementById("info-protein").textContent = `Protein: ${info.protein}g`;
    document.getElementById("info-fat").textContent = `Fat: ${info.fat}g`;
    document.getElementById("info-carbs").textContent = `Carbs: ${info.carbs}g`;
}

function editInfo(element){
    //TODO
}