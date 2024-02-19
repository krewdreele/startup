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
    try{
        let user = users.get(username);
        if(user.password != password){
            throw new Error('incorrect password');
        }
    }
    catch(error){
        console.error(error);
    }
}

let confirm_pw = document.getElementById("confirm");
let password = document.getElementById("pw");

password.onchange = validatePassword;
confirm_pw.onkeyup = validatePassword;

function addUser(){
    let first = document.getElementById("fn").value;
    let last = document.getElementById("ln").value;
    let username = document.getElementById("un").value;

    user = new User(first, last, username, password.value);
    users.set(username, user);
    
}

function validatePassword(){
    if(password.value != confirm_pw.value){
        confirm_pw.style.background = "#DC143C";
    }
    else{
        confirm_pw.style.background = "white";
    }
    
}