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
    let login_alert = document.getElementById("login-alert");
    login_alert.style.display = "none";

    console.log(password.value + "   " + pw);
    if(password.value != pw || password.value == "" || pw == null){
        login_alert.style.display = "block";
        login_alert.textContent = 'Incorrect username or password';
    }
    else{
        document.location.href="main.html";
        localStorage.setItem("this_user", username.value);
    }
}

let confirm_pw = document.getElementById("confirm");
let password = document.getElementById("pw");

let first = document.getElementById("fn");
let last = document.getElementById("ln");
let username = document.getElementById("un");
let create_alert = document.getElementById("create-profile-alert");
let alert_color = "#DC143C";
let create_user = true;

first.onkeyup = () => {if(first.value != "") first.style.background = "white";};
last.onkeyup = () => {if(last.value != "") last.style.background = "white"};
username.onkeyup = () => {if(username.value != "") username.style.background = "white";};
password.onchange = validatePassword;
confirm_pw.onkeyup = validatePassword;


function addUser(){
    create_user = true;
    create_alert.innerText = "";
    create_alert.display = "none";
    if(first.value == ""){
        create_alert.style.display = "block";
        create_alert.innerText += "Please enter your first name\n";
        first.style.background = alert_color;
        create_user = false;
    }
    if(last.value == ""){
        create_alert.style.display = "block";
        create_alert.innerText += "Please enter your last name\n";
        last.style.background = alert_color;
        create_user = false;
    }
    if(username.value == ""){
        create_alert.style.display = "block";
        create_alert.innerText += "Please enter a username\n";
        username.style.background = alert_color;
        create_user = false;
    }
    else if(localStorage.getItem(username.value) != null){
        create_alert.style.display = "block";
        create_alert.innerText += "Username already taken!\n";
        create_user = false;
    }
    validatePassword();
    if(password.value == confirm_pw.value) {
        if(password.value.length < 8){
            create_alert.style.display = "block";
            create_alert.innerText += "Password must have at least 8 characters\n";
            create_user = false;
        }

        if(password.value.length > 20){
            create_alert.style.display = "block";
            create_alert.innerText += "Password is too long\n";
            create_user = false;
        }

        let regex1 = /[a-z]/; 
        if (!regex1.test(password.value)){
            create_alert.style.display = "block";
            create_alert.innerText += "Password should contain a lowercase letter\n";
            create_user = false;
        } 

        let regex2 = /[A-Z]/; 
        if (!regex2.test(password.value)){
            create_alert.style.display = "block";
            create_alert.innerText += "Password should contain an uppercase letter\n";
            create_user = false;
        } 

        let regex3 = /[\d]/; 
        if (!regex3.test(password.value)) {
            create_alert.style.display = "block";
            create_alert.innerText += "Password should contain a number\n";
            create_user = false;
        }

        let regex4 = /[!@#$%^&*.?]/; 
        if (!regex4.test(password.value)) {
            create_alert.style.display = "block";
            create_alert.innerText += "Password should contain a special character i.e !@#$%^&*.?\n";
            create_user = false;
        }
    }
    if(create_user){
        user = new User(first.value, last.value, username.value, password.value);
        users.set(username.value, user);
        localStorage.setItem(username.value, password.value);
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


function validatePassword(){
    if(password.value == ""){
        create_alert.style.display = "block";
        create_alert.innerText += "Please enter a password\n";
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