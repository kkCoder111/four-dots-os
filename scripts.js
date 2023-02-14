"use strict";

var workingDir = "A:\\Four Dots";

var defaultdirs = [
    "A:\\",
    "A:\\Four Dots",
    "A:\\UserData"
  ];
  
var title = "Four Dots OS pre-release";
  
var interval = window.setInterval(function(){
  getTime();
  getDuration();
}, 1000)
  
function dclick(name){
  openApp(name);
}

function getDuration(){
  let elmnt = document.getElementById("music-time");
  let audio = document.getElementById("fdmp");
  let duration = (audio.currentTime/audio.duration) * 100;
  elmnt.value = duration.toString();
}

function playPause(){
  let icon = document.getElementById("fdmp-glyph");
  let audio = document.getElementById("fdmp");
  console.log(audio.paused);
  console.log(audio.currentTime);
  if (audio.paused) {
    audio.play()
    icon.src = "icons/fdmp-pause.svg";
  }
  
  else {
    audio.pause()
    icon.src = "icons/fdmp-play.svg";
  }
  console.log(audio.paused);
}

function getFact(p){
  let facts =[
    "The workbar is semi-transparent. Put a window under it to see what we mean!",
    "This project is made possible by directlight and kkCoder111! Please check out their respective Github pages!"
  ];
  
  let ran = Math.floor(Math.random * facts.length-1);
  console.log(facts.length);
  console.log(ran);
  
  p.innerHTML = facts[ran];
  
}

function shutdown(){
  let windows = document.getElementsByClassName("window");
  
  let start = document.getElementsByClassName("start");
  
  for (let i = 0; i < windows.length; i++) {
    windows[i].style.display = "none";
    
  }
  
  for (let i = 0; i < start.length; i++) {
    start[i].style.display = "none";
    
  }
  
  document.getElementById("workbar").style.display = "none";
  document.getElementById("shutdown").style.display = "none";
  
  document.getElementById("shutdownscreen").style.display = "block";
}

function openApp(id){
    document.getElementById(id).display = "block";
}

function getTime(){
    let now = new Date();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    time = time.split(":");
    for(let i=0;i<time.length;i++){
      if (time[i].length == 1){
        time[i] = "0" + time[i];
      }
    }
    
    time = time[0] + ":" + time[1] +":" + time[2];
    document.getElementById("time").innerHTML = time;
}

function sendCommand(command) {
	command.placeholder = workingDir;

	let out = document.getElementById("output");
	let com = command.value.toUpperCase();
	let toGo = com.split(" ");
	let give = "Got '" + com + "' (" + workingDir +")";
	out.innerHTML += "<br>";
	out.innerHTML += give;

	if (toGo[0] == "HELP") {
		out.innerHTML +="<div class=content><br>help - Displays this help session<br>cd - Changes working directory<br>open - Opens a file<br>root - Goes to the root of the drive<br>shutdown - Logs off, shuts down, or restarts current user. Try it for more info<br>name - Sets the name of this session<br>devmode - Enables developer mode<br>mdir - Makes a directory<br>rm - Deletes a directory or file<br>say - Outputs text<br></div>";
	}

	else if (toGo[0] == "NAME") {
		toGo.splice(0, 1);
		
		for (i=0; i<toGo.length; i++){

		document.getElementById("terminal-text").innerHTML = toGo.toString().replace(",", " ");
		}
	}
	
	else if (toGo[0] == "SAY") {
	  toGo.splice(0,1);
	  
	  out.innerHTML += "<br>" + toGo + "<br>";
	}

	command.placeholder = workingDir;

	command.value = "";
}

function startup(){
	document.getElementById("startup").style.display = "none";
}

function tigerMenu(){
	let menu = document.getElementById("start-classic");

	if (menu.style.display == "none") {
		menu.style.display = "flex";
	}

	else {
		menu.style.display = "none";
	}
}


dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("terminal"));
dragElement(document.getElementById("media"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-topbar")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-topbar").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    //document.onmouseleave = closeDragElement;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    let topPixel = parseInt(elmnt.style.top, 10);
    let leftPixel = parseInt(elmnt.style.top, 10);

    if (topPixel == 0 || leftPixel == 0){
    	closeDragElement();
    }
    else if (topPixel == document.documentElement.clientHeight - 40){
    	closeDragElement();
    }
    else if (leftPixel == document.documentElement.clientWidth - 10){
    	closeDragElement();
    }

  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function setActive(toSet){
  let topbars = document.getElementsByClassName("topbar");
  for (let i = 0; i < topbars.length; i++) {
    topbars[i].style.background = "rgb(0,0,0)";
    topbars[i].zIndex = 0;
  }
  
  let toChange = document.getElementById(toSet + "-topbar");
  
  toChange.style.background = "linear-gradient(rgb(0,0,0), rgb(0,0,80)";
  toChange.style.zIndex = 1000;
}

function removeActive(){
  let topbars = document.getElementsByClassName("topbar");
  for (let i = 0; i < topbars.length; i++) {
    topbars[i].style.background = "rgb(0,0,0)";
    topbars[i].zIndex = 0;
  }
}
