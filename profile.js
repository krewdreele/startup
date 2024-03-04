function loadProfile() {
  let posts = document.getElementById("posts");
  let num_posts = user.posts.length;

  if (num_posts === 0) {
    let no_posts = document.createElement("p");
    no_posts.setAttribute("id", "no-posts");
    no_posts.textContent = "Looks like you don't have any posts yet...";
    posts.appendChild(no_posts);
  } else {
    for (let i = 0; i < num_posts; i++) {
      let post_info = JSON.parse(user.posts[i]);
      let post = createPostHtml(
        post_info.desc,
        post_info?.meal ?? "none",
        false
      );

      posts.appendChild(post);
    }
  }

  document.getElementById("username").textContent = user.username;

  document.getElementById("biography").textContent =
    user.biography ?? "No biography found. Please create one!";
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
    console.log(item);
    createCard(item, post);
  }

  if (new_post) {
    user.posts.push(
      JSON.stringify({
        name: username.textContent,
        desc: desc.textContent,
        meal: meal ?? "none",
      })
    );

    localStorage.setItem("this-user", JSON.stringify(user));
  }

  return post;
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

function saveEdit() {
  let user_in = document.getElementById("username-input");
  let bio_in = document.getElementById("bio-input");

  user.username = user_in.value;
  user.biography = bio_in.value;

  localStorage.setItem("this-user", JSON.stringify(user));

  document.getElementById("username").textContent = user_in.value;
  document.getElementById("biography").textContent = bio_in.value;

  let num_posts = localStorage.getItem("num-posts") ?? 0;

  for (let i = 1; i <= num_posts; i++) {}
}
