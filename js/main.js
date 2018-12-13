'use strict'
let list=JSON.parse(localStorage.getItem("list"));
let length=list ? list.length: 0;
// localStorage.removeItem("list");
// localStorage.clear();
if(list!=null && list.length!=0){
    showList(list[list.length-1]);
}else if(localStorage.getItem("username") !== null){
    let asideMain=document.getElementsByClassName("main-list-content")[0];
    asideMain.innerHTML="";
    document.getElementsByClassName("main")[0].style.filter = "grayscale(70%) blur(2px)";
    document.getElementsByClassName("main")[0].style.userSelect = "none";
    let createListAnime=document.getElementsByClassName("create-list-anime")[0];
    createListAnime.className+=" create-list-anime-start";
    createListAnime.style.display="block";
    createListAnime.innerHTML="&#8675;";
}

if(localStorage.getItem("username") === null) {
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
        items:[],
        isDone: false
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
                listElement.id=i.id;
                listElement.innerHTML=i.title;
                asideMain.appendChild(listElement);
            }
        }
        addEventListenerToLists();
        addListTitlesDragAndDrop();
}

/** highlight entered list title */
if(list!=null && list.length!=0){
    let listTitles= document.getElementsByClassName("list-title");
    listTitles[listTitles.length-1].className+=" selected-list";
}
function showList(list){
    // console.log(list);
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
            listElement.innerHTML=`<input type="checkbox" ${ischecked} class="checkbox" value="${i.id}">${i.note}<span class="delete-button" id ="${i.id}">&#10008;<span>`;
            asideMain.appendChild(listElement);
        }
    }
    addCheckEvent();
    addListItemDeleteEvent();
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
    addListItemDeleteEvent();
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
        let del=listTitle.getElementsByClassName("delete-button")[0];
        if(del){
            listTitle.removeChild(del);
        }
    }
    target.className+=" selected-list";
    let dltBtn=document.createElement("span");
    let att=document.createAttribute("class");
    att.nodeValue="delete-button";
    dltBtn.setAttributeNode(att);
    dltBtn.id=e.target.id;
    dltBtn.innerHTML="&#10008;";
    target.appendChild(dltBtn);
    
    let selectedList=list.filter((item)=> item.id== e.target.id);
    showList(selectedList[0]);
    addListTitleDeleteEvent(e.target);
}

function addCheckEvent() {
    let checkboxes = document.getElementsByClassName("checkbox");
    for(let checkbox=0; checkbox<checkboxes.length;checkbox++){
        checkboxes[checkbox].addEventListener("change", checkBoxEvent, false);
    }
}

function checkBoxEvent(e){
    let listTitle=document.getElementsByClassName("main-header")[0].innerHTML;
    let listItem = list.filter((listItem)=> listItem.title==listTitle);
    if(listItem[0].items[e.target.value].isDone){
        listItem[0].items[e.target.value].isDone=false;
        e.target.removeAttribute("checked");
        e.target.parentNode.classList.remove("strikeout");
    }else{
        listItem[0].items[e.target.value].isDone=true;
        e.target.parentNode.className+=" strikeout";
        let att=document.createAttribute("checked");
        e.target.setAttributeNode(att);
    }
    localStorage.setItem("list",JSON.stringify(list));  
}


function addListTitleDeleteEvent(ele) {
    let dltBtn = ele.getElementsByClassName("delete-button")[0];
    dltBtn.addEventListener('click', listDeleteEvent, false);
}

function listDeleteEvent(e){
    let item=0;
    for(; item<list.length;item++){
        if(list[item].id==e.target.id){
            list.splice(item,1);
            break;
        }
    }
    console.log(e.target.parentNode.nextSibling);
    if(e.target.parentNode.nextSibling){
        showList(list[item]);
    }else if((e.target.parentNode.previousSibling)){
        showList(list[item-1]);
    }else{
        window.location.reload();
    }
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    localStorage.setItem("list", JSON.stringify(list));
}

function addListItemDeleteEvent() {
    let dltBtn = document.getElementsByClassName("main-main")[0].getElementsByClassName("delete-button");
    [...dltBtn].forEach((item)=>{
        item.addEventListener('click', listItemDeleteEvent, false);
    });
    
}
function listItemDeleteEvent(e){
     let selectedList= document.getElementsByClassName("selected-list")[0];
    let listObject={};
    let listNum=0;
    for(let item=0; item< list.length;item++){
        if(list[item].id==selectedList.id){
            listObject=list[item];
            break;
        }
        listNum++;
    }
    for(let item=0; item<listObject.items.length;item++){
        if(listObject.items[item].id==e.target.id){
            listObject.items.splice(item,1);
            break;
        }
    }
    list[listNum]=listObject;
    let isDone = e.target.parentNode.firstChild.hasAttribute("checked");
    if(isDone){
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        localStorage.setItem("list", JSON.stringify(list));
    }else if(confirm("The unchecked note will be deleted!")){
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        localStorage.setItem("list", JSON.stringify(list));
    }
    
}

function addListTitlesDragAndDrop(){
    let listTitles= document.getElementsByClassName("list-title");
    [...listTitles].forEach((item)=> {
        item.addEventListener("dragstart", listDragStart, false);
        item.addEventListener("dragend", listDragEnd, false);
        item.addEventListener("dragenter", listDragEnter, false);
        item.addEventListener("dragover", listDragOver, false);
        item.addEventListener("dragleave", listDragLeave, false);
        item.addEventListener("drop", listDrop, false);
    });
}
let listDragSrc= null;
function listDragStart(e){
    // console.log(e.type, e.target.innerHTML);
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setData("id", e.target.id);
    listDragSrc= this;
}
function listDragEnd(e){
    // console.log(e.type, e.target.innerHTML);
}
function listDragEnter(e){
    e.preventDefault();
    if(listDragSrc.id!=this.id){
        var listDropTarget=document.createElement("div");
        var att=document.createAttribute("class");
        att.nodeValue="list-drop-target";
        listDropTarget.setAttributeNode(att);
        e.target.appendChild(listDropTarget);
    }
    
}
function listDragOver(e){
    e.preventDefault();
}
function listDragLeave(e){
    let dropTarget=document.getElementsByClassName("list-drop-target")[0];
    if(dropTarget) dropTarget.parentNode.removeChild(dropTarget);
}
function listDrop(e){
    if (listDragSrc != this) {
        var dropSrcId = e.dataTransfer.getData('id');
        this.parentNode.insertBefore(listDragSrc,this);
      }
      this.classList.remove("list-drop-target");
      let targetIndicators= document.getElementsByClassName("list-drop-target");
    [...targetIndicators].forEach((item)=>{
        item.parentNode.removeChild(item);
    })
      addListTitlesDragAndDrop();
}