function loadPosts() {
  let posts = document.getElementById("posts");
  let num_posts = localStorage.getItem("num-posts");
  if (num_posts == 0) {
    posts.appendChild(
      (document.createElement("p").textContent =
        "Looks like you don't have any posts yet...")
    );
  } else {
    for (let i = 1; i <= num_posts; i++) {
      let post_info = JSON.parse(localStorage.getItem(i));
      let post = createPostHtml(
        post_info.desc,
        post_info?.meal ?? "none",
        false
      );

      posts.appendChild(post);
    }
  }
}

function createPostHtml(description, meal, new_post) {
  let post = document.createElement("div");
  post.className = "post";

  let username = document.createElement("a");
  username.textContent = localStorage.getItem("this_user");
  username.setAttribute("href", "profile.html"); // this will need to be fixed later
  post.appendChild(username);

  let desc = document.createElement("p");
  desc.textContent = description;
  post.appendChild(desc);

  if (meal != "none") {
    let item = JSON.parse(localStorage.getItem(meal));
    createCard(item, post);
  }

  if (new_post) {
    let num_posts = Number(localStorage.getItem("num-posts") ?? 0);
    num_posts += 1;
    localStorage.setItem("num-posts", num_posts);

    localStorage.setItem(
      num_posts,
      JSON.stringify({
        user: username.textContent,
        desc: desc.textContent,
        meal: meal ?? "none",
      })
    );
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
    if (selectedMeal != null) {
      var meal_info = JSON.parse(
        localStorage.getItem(selectedMeal.textContent)
      );
    }
    let post = createPostHtml(post_desc.value, meal_info?.name ?? "none", true);
    let posts = document.getElementById("posts");
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

  let info = JSON.parse(localStorage.getItem(name.textContent));

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
