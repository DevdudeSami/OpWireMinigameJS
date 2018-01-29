var game;

$(function() {
  game = $("#game");

  showSpriteNumber(0);
})

function showSpriteNumber(number) {
  var offset = number*900;

  game.css("background-position", `-${offset}px, 0px`);
}
