var game;

var steps = [];
var length = 3;
var currentStep = 0;

const timeBetweenLights = 35;
var timeToNextStep = 0;

var isDead = false;
const deadTime = 15;
var deadTimer = 0;

var isWaitingForInput = false;
var clickedLights = [];
var lightStepWaiting = 0;

var shouldAllLightsBeRed = false;
var shouldAllLightsBeGreen = false;

$(function() {
  game = $("#game");
  turnOffLights();

  $(".light").mousedown(lightDown);
  $(".light").mouseup(lightUp);

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

    if (deadTime >= deadTime) {
			isDead = false;
  		deadTimer = 0;
  	}

    turnOffLights();
  	return;
  }

  for(var i = 0; i < 5; i++) {
  	if(lightShouldBeOn(i)) turnOnLight(i);
  }

  timeToNextStep++;

  if (timeToNextStep >= timeBetweenLights) {
		timeToNextStep = 0;

		currentStep++;
		isDead = true;

		// lightOnSound.Play();

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

  turnOnInputLight(lightIndex);
}
function lightUp() {
  if(!isWaitingForInput) return;

  var id = $(this).attr('id');
  var lightIndex = parseInt(id.charAt(id.length - 1));

  clickedLights[lightStepWaiting] = lightIndex;
  lightStepWaiting++;

  if(lightStepWaiting == length) {
    if(checkInput()) {
      shouldAllLightsBeGreen = true;
    } else {
      shouldAllLightsBeRed = true;
    }

    isWaitingForInput = false;

    setTimeout(nextLevel, 1000);
  }

  turnOffLights()
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

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max));
}

function isEqual(value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {
		// Code will go here...
	};

	// Compare properties
	var match;
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			compare(value[i], other[i]);
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				compare(value[key], other[key]);
			}
		}
	}

	// If nothing failed, return true
	return true;
};
