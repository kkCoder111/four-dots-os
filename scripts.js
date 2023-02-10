var workingDir = "A:\\Four Dots";

var defaultdirs = [
    "A:\\",
    "A:\\Four Dots",
    "A:\\UserData"
  ];

class API {
  openApp(id){
    document.getElementById(id).display = "block";
  }
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
    topbars[i].style.backgroundColor = "rgb(55,55,55)";
    topbars[i].zIndex = 0;
  }
  
  let toChange = document.getElementById(toSet + "-topbar");
  
  toChange.style.backgroundColor = "rgb(0,0,100)";
  toChange.style.zIndex = 1000;
}
