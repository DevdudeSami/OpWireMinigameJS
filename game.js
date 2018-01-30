var game;

var steps = [];
var length = 1;
var currentStep = 0;

const timeBetweenLights = 35;
var timeToNextStep = 0;

var isDead = false;
const deadTime = 20;
var deadTimer = 0;

var isWaitingForInput = false;
var clickedLights = [];
var lightStepWaiting = 0;

var shouldAllLightsBeRed = false;
var shouldAllLightsBeGreen = false;

const backgroundMusic = new Audio('assets/minigame_music.wav');

var score = -1;
var highScore = -1;

$(function() {
  game = $("#game");
  turnOffLights();

  $(".light").mousedown(lightDown);
  $(".light").mouseup(lightUp);

  backgroundMusic.loop = true;
  backgroundMusic.play();

  nextLevel();

  setInterval(update, 15);
})

function update() {
  if(isWaitingForInput) return;

  if(shouldAllLightsBeGreen) {
    turnOnGreenLights();
    return;
  } else if(shouldAllLightsBeRed) {
    turnOnRedLights();
    return;
  }

  if(isDead) {
    deadTimer++;

    if (deadTimer >= deadTime) {
			isDead = false;
  		deadTimer = 0;
  	}

    turnOffLights();
  	return;
  }

  for(var i = 0; i < 5; i++) {
  	if(lightShouldBeOn(i)) turnOnLight(i);
  }

  if(timeToNextStep == 0) {
    playLightOnSound();
  }

  timeToNextStep++;

  if (timeToNextStep >= timeBetweenLights) {
		timeToNextStep = 0;

		currentStep++;
		isDead = true;

		if(currentStep == length) startCollectingInput();
	}
}

function lightShouldBeOn(lightIndex) {
  return !isDead && lightIndex == steps[currentStep];
}

function startCollectingInput() {
  turnOffLights();
  isWaitingForInput = true;
  clickedLights = [];
  lightStepWaiting = 0;
}

function nextLevel() {
  shouldAllLightsBeGreen = false;
  shouldAllLightsBeRed = false;

  isWaitingForInput = false;
  length++;
  currentStep = 0;

  steps = [];
	for(var i = 0; i < length; i++) {
		steps[i] = getRandomInt(0,5);
	}

  addScore();
}

function reset() {
  length = 3;
  score = 0;
  $("#score").html(score);

  nextLevel();
}

function checkInput() {
  if(clickedLights.length != steps.length) return false;

  for(var i = 0; i < clickedLights.length; i++) {
    if(clickedLights[i] != steps[i]) return false;
  }

  return true;
}

function showSpriteNumber(number) {
  var offset = number*900;

  game.css("background-position", `-${offset}px, 0px`);
}

function lightDown() {
  if(!isWaitingForInput) return;

  var id = $(this).attr('id');
  var lightIndex = parseInt(id.charAt(id.length - 1));

  playLightPressedSound();

  turnOnInputLight(lightIndex);
}
function lightUp() {
  if(!isWaitingForInput) return;

  var id = $(this).attr('id');
  var lightIndex = parseInt(id.charAt(id.length - 1));

  clickedLights[lightStepWaiting] = lightIndex;
  lightStepWaiting++;

  if(lightStepWaiting == length) {
    isWaitingForInput = false;

    if(checkInput()) {
      playCorrectSound();
      shouldAllLightsBeGreen = true;
      setTimeout(nextLevel, 1000);
    } else {
      playWrongSound();
      shouldAllLightsBeRed = true;
      setTimeout(reset, 2000);
    }
  }

  turnOffLights()
}

function addScore() {
  score++;
  $("#score").html(`${score}`);

  if(score > highScore) {
    highScore = score;
    $("#highScore").html(`${highScore}`);
  }
}

function turnOnLight(lightIndex) {
  showSpriteNumber(lightIndex+3);
}
function turnOnInputLight(lightIndex) {
  showSpriteNumber(lightIndex+8);
}
function turnOffLights() {
  showSpriteNumber(0);
}
function turnOnGreenLights() {
  showSpriteNumber(2);
}
function turnOnRedLights() {
  showSpriteNumber(1);
}

function playLightOnSound() {
  var lightOnSound = new Audio('assets/light_up.wav');
  lightOnSound.play();
}
function playLightPressedSound() {
  var lightPressedSound = new Audio('assets/press_light.wav');
  lightPressedSound.play();
}
function playCorrectSound() {
  var correctSound = new Audio('assets/correct.wav');
  correctSound.play();
}
function playWrongSound() {
  var wrongSound = new Audio('assets/wrong.wav');
  wrongSound.play();
}

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max));
}
