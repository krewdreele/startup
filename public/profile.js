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
  loadProfile();
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

async function loadProfile() {
  document.getElementById("username").textContent = user.username;
  let posts_html = document.getElementById("posts");
  posts_html.children = "";

  const response = await fetch(`api/posts?user=${user.username}`);
  let posts = await response.json();

  if (posts.length === 0) {
    let no_posts = document.createElement("p");
    no_posts.setAttribute("id", "no-posts");
    no_posts.textContent = "Looks like you don't have any posts yet...";
    posts_html.appendChild(no_posts);
  } else {
    for (let i = 0; i < posts.length; i++) {
      let post_info = posts[i];
      let post = createPostHtml(
        post_info.desc,
        post_info?.meal ?? "none",
        false
      );

      posts_html.appendChild(post);
    }
  }

  const response2 = await fetch(`api/profile?user=${user.username}`);
  let profile_info = await response2.json();

  document.getElementById("username").textContent = user.username;
  document.getElementById("biography").textContent = profile_info.biography;
}

function createPostHtml(description, meal, new_post) {
  let post = document.createElement("div");
  post.className = "post";

  let username = document.createElement("a");
  username.textContent = user.username;
  username.setAttribute("href", "profile.html"); // this will need to be fixed later
  post.appendChild(username);

  let desc = document.createElement("p");
  desc.textContent = description;
  post.appendChild(desc);

  if (meal != "none") {
    let item = meals.find((x) => x.name === meal);
    createCard(item, post);
  }

  if (new_post) {
    savePost(username.textContent, desc.textContent, meal);
  }

  return post;
}

async function savePost(username, desc, meal) {
  let post_json = JSON.stringify({
    name: username,
    desc: desc,
    meal: meal ?? "none",
  });

  const response = await fetch(`api/post?user=${user.username}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: post_json,
  });
}

function post() {
  let post_desc = document.getElementById("post-desc");

  if (post_desc.value === "") {
    let alert = document.getElementById("post-alert");
    alert.style.display = "block";
    alert.textContent = "Unable to post. Please provide a description!";

    setTimeout(() => {
      alert.style.display = "none";
    }, 2500);
  } else {
    let posts = document.getElementById("posts");
    if (document.getElementById("no-posts")) {
      document.getElementById("no-posts").style.display = "none";
    }

    let post = createPostHtml(
      post_desc.value,
      selectedMeal?.textContent ?? "none",
      true
    );
    posts.appendChild(post);

    clearPostInput();
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

function getInfo(element) {
  let name = element.parentElement.children[0];

  let info = meals.find((x) => x.name === name.textContent);

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

function clearPostInput() {
  document.getElementById("post-desc").value = "";
  input.value = "";
  document.getElementById("meal-search-container").textContent = "";
}

function editProfile() {
  let user_in = document.getElementById("username-input");
  let bio_in = document.getElementById("bio-input");

  user_in.value = user.username;
  if (user.biography) {
    bio_in.textContent = user.biography;
  } else {
    bio_in.setAttribute("placeholder", "Enter your bio here...");
  }
}

async function saveEdit() {
  let user_in = document.getElementById("username-input");
  let bio_in = document.getElementById("bio-input");

  let body = {
    username: user_in.value,
    profile: { biography: bio_in.value },
  };

  const response = await fetch(`api/profile?user=${user.username}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  user.username = user_in.value;
  localStorage.setItem("this-user", JSON.stringify(user));

  document.getElementById("username").textContent = user.username;
  document.getElementById("biography").textContent = bio_in.value;
}
