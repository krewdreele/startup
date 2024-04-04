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

    ltgt_calorie.value = daily_goal.calories.substring(0, 1);
    ltgt_protein.value = daily_goal.protein.substring(0, 1);
    ltgt_fat.value = daily_goal.fat.substring(0, 1);
    ltgt_carb.value = daily_goal.carbs.substring(0, 1);

    calorie_in.value = daily_goal.calories.substring(2);
    protein_in.value = daily_goal.protein.substring(2);
    fat_in.value = daily_goal.fat.substring(2);
    carb_in.value = daily_goal.carbs.substring(2);
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

  let calorie_str = null;
  let protein_str = null;
  let fat_str = null;
  let carb_str = null;

  if (ltgt_calorie.value === "less than") {
    calorie_str = `< ${calorie_in.value}`;
  } else {
    calorie_str = `> ${calorie_in.value}`;
  }

  if (ltgt_protein.value === "less than") {
    protein_str = `< ${protein_in.value}`;
  } else {
    protein_str = `> ${protein_in.value}`;
  }

  if (ltgt_fat.value === "less than") {
    fat_str = `< ${fat_in.value}`;
  } else {
    fat_str = `> ${fat_in.value}`;
  }

  if (ltgt_carb.value === "less than") {
    carb_str = `< ${carb_in.value}`;
  } else {
    carb_str = `> ${carb_in.value}`;
  }

  calorie_goal.textContent = `Calories: ${calorie_str}`;
  protein_goal.textContent = `Protein: ${protein_str}`;
  fat_goal.textContent = `Fat: ${fat_str}`;
  carb_goal.textContent = `Carbs: ${carb_str}`;

  let daily_goal = {
    calories: calorie_str,
    protein: protein_str,
    fat: fat_str,
    carbs: carb_str,
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

    document.getElementById("start-date").textContent =
      "Start date: " + main_goal.start_date;
    document.getElementById("start-weight").textContent =
      "Start weight: " + main_goal.start_weight + " lbs";
    document.getElementById("goal-date").textContent =
      "Goal date: " + main_goal.goal_date;
    document.getElementById("goal-weight").textContent =
      "Goal weight: " + main_goal.goal_weight + " lbs";
  }

  const response2 = await fetch(`api/goal?user=${user.username}&type=daily`);
  let daily_goal = null;

  if (response2.status === 200) {
    daily_goal = await response2.json();

    let calorie_goal = document.getElementById("calorie-daily-goal");
    let protein_goal = document.getElementById("protein-daily-goal");
    let fat_goal = document.getElementById("fat-daily-goal");
    let carb_goal = document.getElementById("carb-daily-goal");

    calorie_goal.textContent = `Calories: ${daily_goal.calories}`;
    protein_goal.textContent = `Protein: ${daily_goal.protein}`;
    fat_goal.textContent = `Fat: ${daily_goal.fat}`;
    carb_goal.textContent = `Carbs: ${daily_goal.carbs}`;
  }
}
