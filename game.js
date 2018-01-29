var game;

$(function() {
  game = $("#game");
  showSpriteNumber(0);

  $(".light").mousedown(lightDown);
  $(".light").mouseup(lightUp);
})

function showSpriteNumber(number) {
  var offset = number*900;

  game.css("background-position", `-${offset}px, 0px`);
}

function lightDown() {
  var id = $(this).attr('id');
  var lightIndex = parseInt(id.charAt(id.length - 1));

  showSpriteNumber(lightIndex+8);
}
function lightUp() {
  var id = $(this).attr('id');
  var lightIndex = parseInt(id.charAt(id.length - 1));

  showSpriteNumber(0);
}

function turnOnLight(lightIndex) {

}
