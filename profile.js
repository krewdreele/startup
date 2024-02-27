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
    input.value = element.textContent;
}

/*
<div class="post">
              Spencer
              <img width="30px" src="Portrait.png" />
              <p>Check out this meal! 1500 calories!</p>
              <img src="breakfast.jpg" />
              <div>
                <input type="text" placeholder="comment" />
                <button class="btn btn-info">></button>
              </div>
            </div>
*/

function post(){
    
}