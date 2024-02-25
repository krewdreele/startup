document.getElementById("username").textContent = localStorage.getItem("this_user");
function saveMainGoal(){
    let start_date_in = document.getElementById("start-date-in").value;
    let start_weight_in = document.getElementById("start-weight-in").value;
    let goal_date_in = document.getElementById("goal-date-in").value;
    let goal_weight_in = document.getElementById("goal-weight-in").value;

    localStorage.setItem("main_goal", JSON.stringify({
    'start-date': start_date_in, 
    'start-weight': start_weight_in, 
    'goal-weight': goal_weight_in, 
    'goal-date': goal_date_in}));

    document.getElementById("start-date").textContent = "Start date: " + start_date_in;
    document.getElementById("start-weight").textContent = "Start weight: " + start_weight_in + " lbs";
    document.getElementById("goal-date").textContent = "Goal date: " + goal_date_in;
    document.getElementById("goal-weight").textContent = "Goal weight: " + goal_weight_in + " lbs";
}

function editMainGoal(){
    let start_date_in = document.getElementById("start-date-in");
    let start_weight_in = document.getElementById("start-weight-in");
    let goal_date_in = document.getElementById("goal-date-in");
    let goal_weight_in = document.getElementById("goal-weight-in");

    let goal = JSON.parse(localStorage.getItem("main_goal"));

    start_date_in.textContent = goal['start-date'];
    start_weight_in.textContent = goal['start-weight'];
    goal_date_in.textContent = goal['goal-date'];
    goal_weight_in.textContent = goal['goal-weight'];
}

function saveDailyGoal(){
    let ltgt_calorie = document.getElementById("ltgt-calorie");
    let ltgt_protein = document.getElementById("ltgt-protein");
    let ltgt_fat = document.getElementById("ltgt-fat");
    let ltgt_carb = document.getElementById("ltgt-carb");

    let calorie_in = document.getElementById("calorie-in");
    let protein_in = document.getElementById("protein-in");
    let fat_in = document.getElementById("fat-in");
    let carb_in = document.getElementById("carb-in");

    let calorie_goal = document.getElementById("calorie-daily-goal");
    let protein_goal = document.getElementById("protein-daily-goal");
    let fat_goal = document.getElementById("fat-daily-goal");
    let carb_goal = document.getElementById("carb-daily-goal");

    calorie_goal.textContent = `Calories: ${ltgt_calorie.value} ${calorie_in.value}`;
    protein_goal.textContent = `Protein: ${ltgt_protein.value} ${protein_in.value}g`;
    fat_goal.textContent = `Fat: ${ltgt_fat.value} ${fat_in.value}g`;
    carb_goal.textContent = `Carbs: ${ltgt_carb.value} ${carb_in.value}g`;
}