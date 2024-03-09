let confirm_pw = document.getElementById("confirm");
let password = document.getElementById("pw");

let first = document.getElementById("fn");
let last = document.getElementById("ln");
let username = document.getElementById("un");
let create_alert = document.getElementById("create-profile-alert");
let alert_color = "#DC143C";

first.onkeyup = () => {
  if (first.value != "") first.style.background = "white";
};
last.onkeyup = () => {
  if (last.value != "") last.style.background = "white";
};
username.onkeyup = () => {
  if (username.value != "") username.style.background = "white";
};
password.onchange = confirmPassword;
confirm_pw.onkeyup = confirmPassword;

async function authenticateUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let login_alert = document.getElementById("login-alert");
  login_alert.style.display = "none";

  if (password === "" || username === "") {
    login_alert.style.display = "block";
    login_alert.textContent = "Please enter your username and password!";
    return;
  }

  const response = await fetch("api/auth", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });

  if (response.status === 400) {
    login_alert.style.display = "block";
    login_alert.textContent = "Incorrect username or password";
  } else if (response.status === 200) {
    let body = await response.json();
    localStorage.setItem("this-user", JSON.stringify(body));
    document.location.href = "main.html";
  }
}

async function addUser() {
  create_alert.innerText = "";
  create_alert.display = "none";

  let create = validateCreateAccount();

  if (create) {
    user = {
      first: first.value,
      last: last.value,
      username: username.value,
      password: password.value,
    };

    const response = await fetch("api/user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    create_alert.style.display = "none";
    let modalEl = document.getElementById("create-account-modal");
    modalEl.setAttribute("aria-hidden", "true");
    modalEl.style.display = "none";
    modalEl.className = "modal fade";

    document.querySelector("body").className = "";
    document.querySelector("body").style = "";
    document.querySelector(".modal-backdrop.show").style.display = "none";
  }
}

function validateCreateAccount() {
  let valid = true;

  if (first.value == "") {
    create_alert.style.display = "block";
    create_alert.innerText += "Please enter your first name\n";
    first.style.background = alert_color;
    valid = false;
  }
  if (last.value == "") {
    create_alert.style.display = "block";
    create_alert.innerText += "Please enter your last name\n";
    last.style.background = alert_color;
    valid = false;
  }
  if (username.value == "") {
    create_alert.style.display = "block";
    create_alert.innerText += "Please enter a username\n";
    username.style.background = alert_color;
    valid = false;
  } else if (localStorage.getItem(username.value) != null) {
    create_alert.style.display = "block";
    create_alert.innerText += "Username already taken!\n";
    valid = false;
  }

  valid = confirmPassword();

  if (password.value == confirm_pw.value) {
    if (password.value.length < 8) {
      create_alert.style.display = "block";
      create_alert.innerText += "Password must have at least 8 characters\n";
      valid = false;
    }

    if (password.value.length > 20) {
      create_alert.style.display = "block";
      create_alert.innerText += "Password is too long\n";
      valid = false;
    }

    let regex1 = /[a-z]/;
    if (!regex1.test(password.value)) {
      create_alert.style.display = "block";
      create_alert.innerText += "Password should contain a lowercase letter\n";
      valid = false;
    }

    let regex2 = /[A-Z]/;
    if (!regex2.test(password.value)) {
      create_alert.style.display = "block";
      create_alert.innerText += "Password should contain an uppercase letter\n";
      valid = false;
    }

    let regex3 = /[\d]/;
    if (!regex3.test(password.value)) {
      create_alert.style.display = "block";
      create_alert.innerText += "Password should contain a number\n";
      valid = false;
    }

    let regex4 = /[!@#$%^&*.?]/;
    if (!regex4.test(password.value)) {
      create_alert.style.display = "block";
      create_alert.innerText +=
        "Password should contain a special character i.e !@#$%^&*.?\n";
      valid = false;
    }
  }

  return valid;
}

function confirmPassword() {
  let valid = true;

  if (password.value == "") {
    create_alert.style.display = "block";
    create_alert.innerText += "Please enter a password\n";
    password.style.background = alert_color;
    valid = false;
  } else {
    password.style.background = "white";
  }

  if (password.value != confirm_pw.value || confirm_pw.value == "") {
    confirm_pw.style.background = alert_color;
    valid = false;
  } else {
    confirm_pw.style.background = "white";
  }

  return valid;
}
