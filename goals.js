
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