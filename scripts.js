"use strict";

var filesystem = {
  "A:\\" : {
    "System.dir" : {
      "System.data" : "SYSTEM-DATA"
    },
    
    "MyFiles.dir" : {
      
    },
    
    "Users.dir" : {
      
    },
  }
};

var registry = {
  "ErrorReporting" : {
    "EnableFullScreenErrorReporting" : true
  }
};

var olderror = console.error;

console.error = function(message) {
  document.getElementById("rsod").style.display = "block";
  
  let errorname = document.getElementById("rsod-error");
  if (typeof message == "object") {
    errorname.innerHTML = (JSON && JSON.stringify ? JSON.stringify(message) : message);
  }
  
  else {
    errorname.innerHTML = message;
  }
};

function terminalStorage(toGo){
  if (toGo.length() == 1) {
	    spitOut("Currently stored text:");
	    spitOut(localStorage.terminal);
	    spitOut("HINT - To store something within the terminal, type 'STORE' followed by the text you want to store at the command line.");
	}
	  
  else {
	  toGo.splice(0,1);
	  terminalKey(toGo.join(" "));
	  spitOut("Stored the following in Terminal storage:");
	  spitOut(localStorage.terminal);
  }
}

function terminalKey(text) {
  if(localStorage.getItem("terminal") !== null){
    localStorage.setItem("terminal", text);
  }
  
  else {
    localStorage.setItem("terminal", "Nothing is stored yet.");
  }
}

//console.error("Hello world");

var workingDir = "A:\\Four Dots";
var user;

function spitOut(thing){
  let out = document.getElementById("output");
  let container = document.getElementById("console");
  out.innerHTML += "<br>";
  out.innerHTML += thing;
  container.scrollTop = container.scrollHeight;
}

function registerUser(ruser){
  user = ruser;
}

var defaultdirs = [
    "A:\\",
    "A:\\Four Dots",
    "A:\\UserData"
  ];
  
var title = "Four Dots OS pre-release";
  
var interval = window.setInterval(function(){
  getTime();
  getDuration();
}, 100)
  
function dclick(name){
  openApp(name);
}

function notify(title, message){
  let template = document.getElementById("notification");
  
  let toast = document.createElement("div");
  
  toast.id = "";
  toast.style.display = "block";
  
  toast.append(template.content.cloneNode(true));
  document.body.append(toast);
  
  toast.childNodes[0].innerHTML = title;
  toast.childNodes[1].innerHTML = message;
}

function toMinutesAndSeconds(int){
  let date = new Date(null);
  date.setSeconds(int);
  
  let now = date.toISOString().slice(14,19);
  
  return now;
}

function getDuration(){
  let elmnt = document.getElementById("music-time");
  let audio = document.getElementById("fdmp");
  let duration = (audio.currentTime/audio.duration) * 100;
  
  document.getElementById("music-now").innerHTML = toMinutesAndSeconds(audio.currentTime);
  document.getElementById("music-duration").innerHTML = toMinutesAndSeconds(audio.duration);
  
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
    //document.title = "Playing A:\\Four Dots\\system\\resources\\title.m4a";
  }
  
  else if (audio.currentTime == audio.duration) {
    icon.src = "icons/fdmp-play.svg";
    //document.title = title;
  }
  
  else {
    audio.pause()
    icon.src = "icons/fdmp-play.svg";
    //document.title = title;
  }
  console.log(audio.paused);
}

function mediaReplay(){
  let audio = document.getElementById("fdmp");
  audio.currentTime = 0;
}

function mediaEnd(){
  let audio = document.getElementById("fdmp");
  audio.currentTime = audio.duration;
  playPause();
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
	spitOut("Got '" + com + "' (" + workingDir +")");
	//out.innerHTML += "<br>";

	if (toGo[0] == "HELP") {
		//out.innerHTML +="<br>";
		spitOut("help - Displays this help session");
		spitOut("cd - Changes working directory");
		spitOut("open - Opens a file");
		spitOut("root - Goes to the root of the drive");
		spitOut("rsod - Triggers a JS error");
		spitOut("shutdown - Logs off, shuts down, or restarts current user. Try it for more info");
		spitOut("name - Sets the name of this session");
		spitOut("devmode - Enables developer mode");
		spitOut("mdir - Makes a directory");
		spitOut("rdir - Deletes a directory");
		spitOut("delete - Deletes a file");
		spitOut("say - Outputs text");
		spitOut("store - Gets/saves the terminal storage. You can pass text to save for later.");
	}

	else if (toGo[0] == "NAME") {
		toGo.splice(0, 1);

		document.getElementById("terminal-text").innerHTML = toGo.join(" ") + " - Terminal";
	}
	
	else if (toGo[0] == "SAY") {
	  toGo.splice(0,1);
	  
	  spitOut("<br>" + toGo.join(" ") + "<br>");
	}
	
	else if (toGo[0] == "RSOD") {
	  console.error("UserGeneratedError: This error/crash was generated by the end user.");
	}
	
	else if (toGo[0] == "ROOT"){
	  workingDir = "A:\\";
	  spitOut("Resolved to root: '" + workingDir + "'.");
	}
	
	else if (toGo[0] == "STORE") {
	  terminalStorage(toGo);
	}
	
	else {
	  spitOut("<br>" + "The command entered is invalid or not available yet.");
	}

	command.placeholder = workingDir;

	command.value = "";
}

function startup(){
	document.getElementById("startup").style.display = "none";
}

function menu(){
	let menu1 = document.getElementById("start-classic");

	if (menu1.style.display == "none") {
		menu1.style.display = "flex";
	}

	else {
		menu1.style.display = "none";
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
  let windows = document.getElementsByClassName("window");
  for (let i = 0; i < topbars.length; i++) {
    topbars[i].style.background = "rgb(0,0,0)";
    windows[i].style.zIndex = "0";
  }
  
  let toChange = document.getElementById(toSet + "-topbar");
  
  toChange.style.background = "linear-gradient(rgb(0,0,0), rgb(0,0,80)";
  document.getElementById(toSet).style.zIndex = "1000";
  document.title = document.getElementById(toSet).style.zIndex;
}

function removeActive(){
  let topbars = document.getElementsByClassName("topbar");
  for (let i = 0; i < topbars.length; i++) {
    topbars[i].style.background = "rgb(0,0,0)";
    topbars[i].style.zIndex = "0";
  }
}

function increaseZIndex(toSet){
  let toChange = document.getElementById(toSet + "-topbar");
  toSet.style.zIndex = toSet.style.zIndex;
}
