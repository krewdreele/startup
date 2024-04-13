export function initializeSocket(username) {
  const protocol = window.location.protocol === "http:" ? "ws" : "wss";
  let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  socket.onopen = (event) => {
    console.log(`${username} connected`);
  };
  socket.onclose = (event) => {
    console.log(`${username} disconnected`);
  };

  return socket;
}

async function createPostHtml(post, profile = false) {
  let html = document.createElement("div");
  html.className = "post";

  let header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";

  let username = document.createElement("a");
  username.textContent = post.username;
  username.setAttribute("href", "profile.html");
  header.appendChild(username);

  if (profile) {
    let delete_btn = document.createElement("button");
    delete_btn.setAttribute("onClick", "deletePost(this)");
    delete_btn.className = "btn btn-danger";
    delete_btn.textContent = "X";
    delete_btn.style.marginLeft = "20px";
    header.appendChild(delete_btn);
  }

  html.appendChild(header);

  let body = document.createElement("div");
  body.style.display = "flex";
  body.style.flexDirection = "column";
  body.style.justifyContent = "space-evenly";
  let title = document.createElement("p");
  let date = document.createElement("p");
  let desc = document.createElement("p");
  title.textContent = post.title;
  date.textContent = post.date;
  desc.textContent = post.desc;
  body.appendChild(title);
  body.appendChild(date);
  body.appendChild(desc);

  html.appendChild(body);

  if (post.meal != "none") {
    const response = await fetch("api/meal", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: post.username, meal_name: post.meal }),
    });

    if (response.ok) {
      let meal = await response.json();
      createCard(meal, html);
    }
  }

  return html;
}

function createCard(item, container) {
  let card = document.createElement("div");
  card.className = "card";

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

  card.appendChild(body);
  body.appendChild(meal_name);
  body.appendChild(meal_desc);
  body.appendChild(button);

  container.appendChild(card);
}
