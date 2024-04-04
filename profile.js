let user = JSON.parse(localStorage.getItem("this-user"));
let selectedMeal = null;
let meals = [];
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

  if (!socket) initializeSocket(user.username);
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
  posts_html.textContent = "";

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

      let html = await createPostHtml(post_info, true);

      posts_html.appendChild(html);
    }
  }

  const response2 = await fetch(`api/profile?user=${user.username}`);
  let profile_info = await response2.json();

  document.getElementById("username").textContent = user.username;
  document.getElementById("biography").textContent = profile_info.biography;
}

async function post() {
  let post_desc = document.getElementById("post-desc").value;

  let title = document.getElementById("title").value;

  if (post_desc === "" || title === "") {
    let alert = document.getElementById("post-alert");
    alert.style.display = "block";
    alert.textContent = "Please fill out all fields!";

    setTimeout(() => {
      alert.style.display = "none";
    }, 2500);
  } else {
    let posts = document.getElementById("posts");
    if (document.getElementById("no-posts")) {
      document.getElementById("no-posts").style.display = "none";
    }

    let date = new Date();
    let date_str = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    let post = {
      username: user.username,
      desc: post_desc,
      meal: selectedMeal?.textContent ?? "none",
      date: date_str,
      title: title,
    };

    let html = await createPostHtml(post, true);
    posts.appendChild(html);
    savePost(post);
    clearPostInput();
    socket.send(JSON.stringify(post));
  }
}

async function savePost(post) {
  const response = await fetch(`api/post`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  });
}

async function deletePost(element) {
  let request = {
    title:
      element.parentElement.parentElement.children[1].children[0].textContent,
    username: user.username,
  };

  const response = await fetch("api/post", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(request),
  });

  if (response.ok) {
    loadProfile();
  }
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
  document.getElementById("title").value = "";
}

function editProfile() {
  let bio_in = document.getElementById("bio-input");

  if (user.biography) {
    bio_in.textContent = user.biography;
  } else {
    bio_in.setAttribute("placeholder", "Enter your bio here...");
  }
}

async function saveEdit() {
  let bio_in = document.getElementById("bio-input");

  let body = {
    profile: { biography: bio_in.value },
  };

  const response = await fetch(`api/profile?user=${user.username}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  document.getElementById("biography").textContent = bio_in.value;
}

async function logout() {
  const response = await fetch("api/auth", {
    method: "DELETE",
  });

  if (response.ok) {
    window.location = "index.html";
  }
}
