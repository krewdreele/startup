document.getElementById("username").textContent = localStorage.getItem("this_user");

updateTotals();
let date = new Date();

let input = document.getElementById("search-input");
let meals = [];
let selectedMeal = null;

for(var i in localStorage){
        item = localStorage[i];

        try{
            item = JSON.parse(item);
        }
        catch (error){
            continue;
        }

        if(!item.hasOwnProperty("type")){
            continue;
        }

        meals.push(item);
}

input.onkeyup = searchMeals;

function searchMeals(){
    let searchList = meals.filter((meal) => {return meal.name.toLowerCase().startsWith(input.value.toLowerCase())});
    let container = document.getElementById("meal-search-container");
    container.innerText = '';
    for(var i in searchList){
        let el = document.createElement("button");
        el.textContent = searchList[i].name;
        el.className = "btn btn-outline-info";
        el.setAttribute("onclick", "selectMeal(this)");
        container.appendChild(el);
    }
}

function selectMeal(element){
    let container = document.getElementById("meal-search-container");
    for(var i in container.children){
        container.children[i].className = "btn btn-outline-info";
    }
    element.className = "btn btn-info";
    selectedMeal = element;
}

function addMeal(){
    if(selectedMeal != null){
        meal_info = JSON.parse(localStorage.getItem(selectedMeal.textContent));

        let total_calories = localStorage.getItem("total-cals") ?? 0;
        let total_protein = localStorage.getItem("total-protein") ?? 0;
        let total_fat = localStorage.getItem("total-fat") ?? 0;
        let total_carbs = localStorage.getItem("total-carbs") ?? 0;

        total_calories = Number(total_calories) + Number(meal_info.calories);
        total_protein = Number(total_protein) + Number(meal_info.protein);
        total_fat = Number(total_fat) + Number(meal_info.fat);
        total_carbs = Number(total_carbs) + Number(meal_info.carbs);

        localStorage.setItem("total-cals", total_calories);
        localStorage.setItem("total-protein", total_protein);
        localStorage.setItem("total-fat", total_fat);
        localStorage.setItem("total-carbs", total_carbs);

        updateTotals();
    }
}

function updateTotals(){
    document.getElementById("total-cals").textContent = localStorage.getItem("total-cals") ?? 0;
    document.getElementById("total-protein").textContent = localStorage.getItem("total-protein") ?? 0;
    document.getElementById("total-fat").textContent = localStorage.getItem("total-fat") ?? 0;
    document.getElementById("total-carbs").textContent = localStorage.getItem("total-carbs") ?? 0;
}
