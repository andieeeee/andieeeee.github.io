// Create your global variables below:
var tracklist = ["Sisyphus", "Bloodless", "Olympians", "Cracking Codes", "Fallorun", "Archipelago", "TProxy War", "Manifest", "Don the Struggle", "Bellevue Bridge Club"];
var tracklist_num;
var volLevels = [];
var currVolLevel = 3;
var slider = document.getElementById("slider");

function init() {
  slider.value = 0;
  slider.min = 0;
  slider.max = 180;

// Set initial 3 colored in bars for volume and track name
    for(var i = 0; i < 6; i++) {
      var vol = document.getElementById("vl" + i);
      if(i < 3) {
        vol.style["background-color"] = "#4A6D3B";
      }
    volLevels.push(vol)
    };
    tracklist_num = tracklist.indexOf("Cracking Codes");
    currVolLevel = 2;
};

function volUp() {
	if(currVolLevel < 6){
    currVolLevel++;
    volLevels[currVolLevel-1].style.backgroundColor = "#4A6D3B";
  }
  else{
    currVolLevel = 5;
  }
}

function volDown() {
  if(currVolLevel >= 0){
    volLevels[currVolLevel].style.backgroundColor = "white";
    currVolLevel--;
  }
  else{ currVolLevel = 0;
  }
}

function switchPlay() {
  var switchButton = document.getElementById("play_text");
	//Do stuff based off of play/pause status
	if(switchButton.innerHTML === "play_arrow") {
		switchButton.innerHTML = "pause";
	}
  else {
		switchButton.innerHTML = "play_arrow";
	}
  if(switchButton.innerHTML === "pause") {
		var timer = setInterval(function(){ myTimer() }, 1000);
		function myTimer() {
			slider.value++;
			if(document.getElementById("play_text").innerHTML === "play_arrow") {
				clearInterval(timer);
			}
			if(slider.value === 180 || slider.value === "180") {
				nextSong();
			}
			document.getElementById("player-time").innerHTML = secondsToMs(slider.value);
		}
	}
}

function nextSong() {
  if(tracklist_num === 9) {
    tracklist_num = 0;
  }
  else {
    tracklist_num += 1;
  }
  slider.value = 0;
  document.getElementById("player-song-name").innerHTML = tracklist[tracklist_num];
  document.getElementById("player-time").innerHTML = secondsToMs(slider.value);
	// Your code goes here
}

function prevSong() {
  if(tracklist_num === 0) {
    tracklist_num = 9;
  }
  else {
    tracklist_num -= 1;
  }
  slider.value = 0;
  document.getElementById("player-song-name").innerHTML = tracklist[tracklist_num];
  document.getElementById("player-time").innerHTML = secondsToMs(slider.value);
	// Your code goes here
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();
