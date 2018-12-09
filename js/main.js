window.onload=loadFun;
function loadFun(){
    initialize();
    // localStorage.clear();
}

function initialize(){
    if (localStorage.getItem("username") === null) {
       document.getElementById("welcome-pop-up").style.display="block";
       document.getElementById("welcome-bg").style.filter = "blur(2px)";
       document.getElementsByClassName("aside")[0].style.filter = "grayscale(70%) blur(3px)";
       document.getElementsByClassName("main")[0].style.filter = "grayscale(70%) blur(3px)";
      }else{
        var asideHeader=document.getElementsByClassName("aside-header")[0];
        asideHeader.innerHTML=(localStorage.getItem("username"));
      }
}

let enter = document.getElementsByClassName("welcome-enter")[0];
enter.addEventListener("click",addName,false);
// --------------
var usernameForm=document.getElementById("username-form");

usernameForm.addEventListener("submit",addName, false);
function addName(){
    let username= document.getElementById("uname");
    localStorage.setItem("username", username.value);
    document.getElementById("welcome-pop-up").style.display="none";
    document.getElementsByClassName("aside")[0].style.filter = "grayscale(0%) blur(0px)";
    document.getElementsByClassName("main")[0].style.filter = "grayscale(0%) blur(0px)";
}

let createListButton = document.getElementsByClassName("create;list")[0];
createListButton.addEventListener("click",createList,false);
function createList(){
    
}