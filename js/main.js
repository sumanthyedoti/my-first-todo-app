'use strict'
let list=JSON.parse(localStorage.getItem("list"));
let length=list ? list.length: 0;
// localStorage.removeItem("list");

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
createListEnter.addEventListener("click",createList,false);
if(!createListEnter){
    var createListForm=document.getElementById("create-list-form");
    createListForm.addEventListener("submit",createList, false);
}

function createList(e){
    let createListTitle= document.getElementById("create-list-title");
    let listTitle=createListTitle.value;
    listTitle=listTitle.trim();
    if(listTitle=="") return false;
    const listItem={
        id: length++,
        title: listTitle,
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
    addEventListenerToLists();
    return true;
}

function appendList(){
    let list=JSON.parse(localStorage.getItem("list"));
        if(list!=null){
            let asideMain=document.getElementsByClassName("aside-main")[0];
            asideMain.innerHTML="";
            for(let i of list){
                var listElement=document.createElement("p");
                var att=document.createAttribute("class");
                att.nodeValue="list-title";
                listElement.setAttributeNode(att);
                att=document.createAttribute("draggable");
                att.nodeValue="true";
                listElement.setAttributeNode(att);
                listElement.innerHTML=i.title;
                asideMain.appendChild(listElement);
            }
        }
        addEventListenerToLists();
}

/** highlight entered list title */
let listTitles= document.getElementsByClassName("list-title");
listTitles[listTitles.length-1].className+=" selected-list";

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
            let ischecked="";
            if(i.isDone){
                listElement.className+=" strikeout";
                ischecked="checked";
            }
            
            listElement.setAttributeNode(att);
            listElement.innerHTML=`<input type="checkbox" ${ischecked} class="checkbox" value="${i.id}">${i.note}<span class="delete-button">&#10008;<span>`;
            asideMain.appendChild(listElement);
        }
    }
    addCheckEvent();
}
let addButton = document.getElementsByClassName("enter-list-form")[0];
addButton.addEventListener("submit", appendListItem, false);

function appendListItem(e){
    e.preventDefault();
    let listText = document.getElementById("enter-list-text").value.trim();
    if(listText=="") return;
    document.getElementById("enter-list-text").value="";
    let listTitle=document.getElementsByClassName("main-header")[0].innerHTML;
    const listNote={
        id: 0,
        note: listText,
        isDone: false
    }
    for(let item of list){
        if(item.title===listTitle){
            listNote.id=item.items.length;
            item.items.push(listNote);
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
    listElement.innerHTML=`<input type="checkbox" class="checkbox" value="${listNote.id}">${listText}<span class="delete-button">&#10008;<span>`;
    let asideMain=document.getElementsByClassName("main-list-content")[0];
    asideMain.appendChild(listElement);   
    addCheckEvent();
}

function addEventListenerToLists(){
    let listTitles = document.getElementsByClassName("list-title");
    for(let listTitle of listTitles){
        listTitle.addEventListener("click", showListOnClick, false);
    }
}
function showListOnClick(e){
    var target = event.target || event.srcElement;
    let listTitles= document.getElementsByClassName("list-title");
    for(let listTitle of listTitles){
        listTitle.classList.remove("selected-list");
    }
    target.className+=" selected-list";
    let selectedList=list.filter((item)=> item.title==target.innerHTML);
    showList(selectedList[0]);
}

function addCheckEvent() {
    let checkboxes = document.getElementsByClassName("checkbox");
    for(let checkbox=0; checkbox<checkboxes.length;checkbox++){
        checkboxes[checkbox].addEventListener("change", checkBoxEvent, false);
    }
}

function checkBoxEvent(e){
    e.preventDefault();
    let listTitle=document.getElementsByClassName("main-header")[0].innerHTML;
    let listItem = list.filter((listItem)=> listItem.title==listTitle);
    console.log(e.target.parentNode);
    console.log("-----------------------");
    if(listItem[0].items[e.target.value].isDone){
        // console.log(1);
        listItem[0].items[e.target.value].isDone=false;
        console.log(e.target.parentNode.classList);
        e.target.removeAttribute("checked");
        e.target.parentNode.classList.remove("strikeout");
        console.log(e.target.parentNode.classList);
    }else{
        listItem[0].items[e.target.value].isDone=true;
        e.target.parentNode.className+=" strikeout";
        let att=document.createAttribute("checked");
        e.target.setAttributeNode(att);
    }
    localStorage.setItem("list",JSON.stringify(list));  
    console.log(e.target.parentNode);
    console.log(list);
    strikeout();
}


