let socket = null;

function initializeSocket() {
  const protocol = window.location.protocol === "http:" ? "ws" : "wss";
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  socket.onopen = (event) => {
    console.log("client connected");
  };
  socket.onclose = (event) => {
    console.log("client disconnected");
  };
}

function createPostHtml(post) {
  let html = document.createElement("div");
  post.className = "post";

  let username = document.createElement("a");
  username.textContent = post.username;
  username.setAttribute("href", "profile.html");
  html.appendChild(username);

  let desc = document.createElement("p");
  desc.textContent = post.desc;
  html.appendChild(desc);

  if (post.meal != "none") {
    let item = meals.find((x) => x.name === post.meal);
    createCard(item, html);
  }
  return html;
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
