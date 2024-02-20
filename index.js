const users = new Map();

class User {
    constructor(first, last, username, password){
        this.first = first
        this.last = last
        this.username = username
        this.password = password
    }
}

function authenticateUser(){
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let pw = localStorage.getItem(username.value);

    if(password.value != pw){
        console.log('incorrect password');
    }
    else{
        document.location.href="main.html";
    }
}

let confirm_pw = document.getElementById("confirm");
let password = document.getElementById("pw");

let first = document.getElementById("fn");
let last = document.getElementById("ln");
let username = document.getElementById("un");
let alert = document.getElementById("create-profile-alert");
let alert_color = "#DC143C";
let create_user = true;

first.onkeyup = validateFirst;
last.onkeyup = validateLast;
username.onkeyup = validateUsername;
password.onchange = validatePassword;
confirm_pw.onkeyup = validatePassword;


function addUser(){
    create_user = true;
    alert.innerText = "";
    alert.display = "none";
    validateFirst();
    validateLast();
    validateUsername();
    if(username.value != "" && localStorage.getItem(username.value) != null){
        alert.style.display = "block";
        alert.innerText += "Username already taken!\n";
        create_user = false;
    }
    validatePassword();
    if(create_user){
        user = new User(first.value, last.value, username.value, password.value);
        users.set(username.value, user);
        localStorage.setItem(username.value, password.value);
        alert.style.display = "none";
        let modalEl = document.getElementById("create-account-modal");
        modalEl.setAttribute("aria-hidden", "true");
        modalEl.style.display = "none";
        modalEl.className = "modal fade";

        document.querySelector("body").className = "";
        document.querySelector("body").style = "";
        document.querySelector(".modal-backdrop.show").style.display = "none";
    }
}


function validateFirst(){
    if(first.value == ""){
        alert.style.display = "block";
        alert.innerText += "Please enter your first name\n";
        first.style.background = alert_color;
        create_user = false;
    }
    else{
        first.style.background = "white";
    }
}

function validateLast(){
    if(last.value == ""){
        alert.style.display = "block";
        alert.innerText += "Please enter your last name\n";
        last.style.background = alert_color;
        create_user = false;
    }
    else{
        last.style.background = "white";
    }
}

function validateUsername(){
    if(username.value == ""){
        alert.style.display = "block";
        alert.innerText += "Please enter a username\n";
        username.style.background = alert_color;
        create_user = false;
    }
    else{
        username.style.background = "white";
    }
}

function validatePassword(){
    if(password.value == ""){
        alert.style.display = "block";
        alert.innerText += "Please enter a password\n";
        password.style.background = alert_color;
        create_user = false;
    }
    else{
        password.style.background = "white";
    }

    if(password.value != confirm_pw.value || confirm_pw.value == ""){
        confirm_pw.style.background = alert_color;
        create_user = false;
    }
    else{
        confirm_pw.style.background = "white";
    }
}