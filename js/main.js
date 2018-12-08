window.onload=loadFun;
function loadFun(){
    checkUser();
}
localStorage.clear();
function checkUser(){
    if (localStorage.getItem("username") === null) {
       document.getElementById("welcome-pop-up").style.display="block";
       document.getElementById("welcome-bg").style.filter = "blur(2px)";
       document.getElementsByClassName("aside")[0].style.filter = "grayscale(70%) blur(3px)";
       document.getElementsByClassName("main")[0].style.filter = "grayscale(70%) blur(3px)";
      }
}

let enter = document.getElementsByClassName("welcome-enter")[0];
let username= document.getElementById("uname");
enter.addEventListener("click",addName,false);
function addName(){
    localStorage.setItem("username", username.value);
    document.getElementById("welcome-pop-up").style.display="none";
    document.getElementsByClassName("aside")[0].style.filter = "grayscale(0%) blur(0px)";
    document.getElementsByClassName("main")[0].style.filter = "grayscale(0%) blur(0px)";
}