'use strict'
let list=JSON.parse(localStorage.getItem("list"));
// window.onload=loadFun;
// function loadFun(){
    // initialize();
    if(list!=null){
        showList(list[list.length-1]);
    }else{
        let asideMain=document.getElementsByClassName("main-list-content")[0];
        asideMain.innerHTML="";
        document.getElementsByClassName("main")[0].style.filter = "grayscale(70%) blur(2px)";
        document.getElementsByClassName("main")[0].style.userSelect = "none";
        let createListAnime=document.getElementsByClassName("create-list-anime")[0];
        createListAnime.className+=" create-list-anime-start";
        createListAnime.style.display="block";
        createListAnime.innerHTML="&#8675;";
    }
// }
// localStorage.removeItem("list");
// function initialize(){
    if (localStorage.getItem("username") === null) {
       document.getElementById("welcome-pop-up").style.display="block";
       document.getElementById("welcome-bg").style.filter = "blur(2px)";
       document.getElementsByClassName("aside")[0].style.filter = "grayscale(70%) blur(3px)";
       document.getElementsByClassName("main")[0].style.filter = "grayscale(70%) blur(3px)";
      }else{
        var asideHeader=document.getElementsByClassName("aside-header")[0];
        asideHeader.innerHTML=(localStorage.getItem("username"));
        appendList();
      }
// }

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
/* create list pop up*/
let createListButton = document.getElementsByClassName("create-list-button")[0];
createListButton.addEventListener("click",displayCreateList,false);
function displayCreateList(){
    document.getElementById("create-list-pop-up").style.display="block";
       document.getElementById("create-list-bg").style.filter = "blur(2px)";
       document.getElementsByClassName("aside")[0].style.filter = "grayscale(70%) blur(3px)";
       document.getElementsByClassName("main")[0].style.filter = "grayscale(70%) blur(3px)";
}
let createListEnter = document.getElementsByClassName("create-list-enter-button")[0];
// createListEnter.addEventListener("click",createList,false);
// --------------
var createListForm=document.getElementById("create-list-form");
createListForm.addEventListener("submit",createList, false);

function createList(){
    let createListTitle= document.getElementById("create-list-title");
    const listItem={
        title:createListTitle.value,
        items:[]
    }
    if (localStorage.getItem("list") === null){
        let list=[listItem];
        localStorage.setItem("list",JSON.stringify(list));
    }else{
        let list=JSON.parse(localStorage.getItem("list"));
        list.push(listItem);
        localStorage.setItem("list",JSON.stringify(list));
        appendList();
        showList(listItem);
        document.getElementById("create-list-pop-up").style.display="none";
        document.getElementsByClassName("aside")[0].style.filter = "grayscale(0%) blur(0px)";
        document.getElementsByClassName("main")[0].style.filter = "grayscale(0%) blur(0px)";
    }
}

function appendList(){
    let list=JSON.parse(localStorage.getItem("list"));
        if(list!=null){
            for(let i of list){
                var listElement=document.createElement("p");
                var att=document.createAttribute("class");
                att.nodeValue="list-title";
                listElement.setAttributeNode(att);
                att=document.createAttribute("draggable");
                att.nodeValue="true";
                listElement.setAttributeNode(att);
                listElement.innerHTML=i.title;
                let asideMain=document.getElementsByClassName("aside-main")[0];
                asideMain.appendChild(listElement);
            }
        }
}

function showList(list){
    let listTitle = document.getElementsByClassName("main-header")[0];
    listTitle.innerHTML=list.title;
    let asideMain=document.getElementsByClassName("main-list-content")[0];
    while (asideMain.firstChild) {
        asideMain.removeChild(asideMain.firstChild);
    }
    if(list.items.length!==0){
        for(let i of list.items){
            var listElement=document.createElement("p");
            var att=document.createAttribute("class");
            att.nodeValue="main-list-item";
            listElement.setAttributeNode(att);
            att=document.createAttribute("draggable");
            att.nodeValue="true";
            listElement.setAttributeNode(att);
            listElement.innerHTML=i;
            asideMain.appendChild(listElement);
        }
    }
}
let addButton = document.getElementById("enter-list-button");
addButton.addEventListener("click", appendListItem, false);

function appendListItem(){
    let listText = document.getElementById("enter-list-text").value.trim();
    if(listText=="") return;
    let listTitle=document.getElementsByClassName("main-header")[0].innerHTML;
    for(let item of list){
        if(item.title===listTitle){
            item.items.push(listText);
        }
    }
    localStorage.setItem("list",JSON.stringify(list));  //
    var listElement=document.createElement("p");
    var att=document.createAttribute("class");
    att.nodeValue="main-list-item";
    listElement.setAttributeNode(att);
    att=document.createAttribute("draggable");
    att.nodeValue="true";
    listElement.setAttributeNode(att);
    listElement.innerHTML=listText;
    let asideMain=document.getElementsByClassName("main-list-content")[0];
    asideMain.appendChild(listElement);   
}

// function addEventListenerToLists(){
    let listTitles = document.getElementsByClassName("list-title");
    for(let listTitle of listTitles){
        listTitle.addEventListener("click", showListOnClick, false);
    }
// }
function showListOnClick(e){
    var target = event.target || event.srcElement;
    let selectedList=list.filter((item)=> item.title==target.innerHTML);
    showList(selectedList[0]);
}