let user = JSON.parse(localStorage.getItem("this-user"));

document.getElementById("username").textContent = user.username;

async function saveMainGoal() {
  let start_date_in = document.getElementById("start-date-in").value;
  let start_weight_in = document.getElementById("start-weight-in").value;
  let goal_date_in = document.getElementById("goal-date-in").value;
  let goal_weight_in = document.getElementById("goal-weight-in").value;

  let main_goal = {
    start_date: start_date_in,
    start_weight: start_weight_in,
    goal_weight: goal_weight_in,
    goal_date: goal_date_in,
  };

  const response = await fetch(`api/goal?user=${user.username}&type=main`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(main_goal),
  });

  document.getElementById("start-date").textContent =
    "Start date: " + start_date_in;
  document.getElementById("start-weight").textContent =
    "Start weight: " + start_weight_in + " lbs";
  document.getElementById("goal-date").textContent =
    "Goal date: " + goal_date_in;
  document.getElementById("goal-weight").textContent =
    "Goal weight: " + goal_weight_in + " lbs";
}

async function editMainGoal() {
  const response = await fetch(`api/goal?user=${user.username}&type=main`);
  if (response.status === 200) {
    let main_goal = await response.json();

    let start_date_in = document.getElementById("start-date-in");
    let start_weight_in = document.getElementById("start-weight-in");
    let goal_date_in = document.getElementById("goal-date-in");
    let goal_weight_in = document.getElementById("goal-weight-in");

    start_date_in.textContent = main_goal.start_date;
    start_weight_in.textContent = main_goal.start_weight;
    goal_date_in.textContent = main_goal.goal_date;
    goal_weight_in.textContent = main_goal.goal_weight;
  }
}

async function editDailyGoal() {
  const response = await fetch(`api/goal?user=${user.username}&type=daily`);

  if (response.status === 200) {
    let daily_goal = await response.json();

    let ltgt_calorie = document.getElementById("ltgt-calorie");
    let ltgt_protein = document.getElementById("ltgt-protein");
    let ltgt_fat = document.getElementById("ltgt-fat");
    let ltgt_carb = document.getElementById("ltgt-carb");

    let calorie_in = document.getElementById("calorie-in");
    let protein_in = document.getElementById("protein-in");
    let fat_in = document.getElementById("fat-in");
    let carb_in = document.getElementById("carb-in");

    ltgt_calorie.value = daily_goal.calories.substring(10, 19);
    ltgt_protein.value = daily_goal.protein.substring(9, 18);
    ltgt_fat.value = daily_goal.fat.substring(5, 14);
    ltgt_carb.value = daily_goal.carbs.substring(7, 16);

    calorie_in.value = daily_goal.calories.substring(20);
    protein_in.value = daily_goal.protein.substring(19);
    fat_in.value = daily_goal.fat.substring(15);
    carb_in.value = daily_goal.carbs.substring(17);
  }
}

async function saveDailyGoal() {
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
  protein_goal.textContent = `Protein: ${ltgt_protein.value} ${protein_in.value}`;
  fat_goal.textContent = `Fat: ${ltgt_fat.value} ${fat_in.value}`;
  carb_goal.textContent = `Carbs: ${ltgt_carb.value} ${carb_in.value}`;

  let daily_goal = {
    calories: calorie_goal.textContent,
    protein: protein_goal.textContent,
    fat: fat_goal.textContent,
    carbs: carb_goal.textContent,
  };

  const response = await fetch(`api/goal?user=${user.username}&type=daily`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(daily_goal),
  });
}

async function loadGoals() {
  const response = await fetch(`api/goal?user=${user.username}&type=main`);
  let main_goal = null;
  if (response.status === 200) {
    main_goal = await response.json();
  } else {
    main_goal = {
      start_date: "none",
      start_weight: "none",
      goal_weight: "none",
      goal_date: "none",
    };
  }
  document.getElementById("start-date").textContent =
    "Start date: " + main_goal.start_date;
  document.getElementById("start-weight").textContent =
    "Start weight: " + main_goal.start_weight + " lbs";
  document.getElementById("goal-date").textContent =
    "Goal date: " + main_goal.goal_date;
  document.getElementById("goal-weight").textContent =
    "Goal weight: " + main_goal.goal_weight + " lbs";

  const response2 = await fetch(`api/goal?user=${user.username}&type=daily`);
  let daily_goal = null;

  if (response2.status === 200) {
    daily_goal = await response2.json();
  } else {
    daily_goal = {
      calories: "none",
      protein: "none",
      fat: "none",
      carbs: "none",
    };
  }

  let calorie_goal = document.getElementById("calorie-daily-goal");
  let protein_goal = document.getElementById("protein-daily-goal");
  let fat_goal = document.getElementById("fat-daily-goal");
  let carb_goal = document.getElementById("carb-daily-goal");

  calorie_goal.textContent = daily_goal.calories;
  protein_goal.textContent = daily_goal.protein;
  fat_goal.textContent = daily_goal.fat;
  carb_goal.textContent = daily_goal.carbs;
}
