var width = 900;
var height = 500;

var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
canvas.focus();
canvas.addEventListener("keydown", movePlayer);

//player vars
var player = {
  size: 50,
  xPos: 50,
  yPos: 50,
  xNeg: this.xPos + this.size,
  yNeg: this.yPos + this.size,
  xMid: this.xPos + this.size / 2,
  yMid: this.yPos + this.size / 2,
  speed: 5,
};

//square1
var square1 = {
  size: 60,
  xPos: 300,
  xNeg: this.size + this.xPos,
  yPos: 300,
  yNeg: this.size + this.yPos,
  xMid: this.xPos + this.size / 2,
  yMid: this.yPos + this.size / 2,
}

var keys = {
  up: false,
  right: false,
  left: false,
  down: false,
};

//movements

function movePlayer(event) {
  switch (event.keyCode) {
    case 39:
      keys["right"] = true;
      break;
    case 38:
      keys["up"] = true;
      break;
    case 40:
      keys["down"] = true;
      break;
    case 37:
      keys["left"] = true;
      break;
  }
}

function keyUp(event) {
  switch (event.keyCode) {
    case 39:
      keys["right"] = false;
      break;
    case 38:
      keys["up"] = false;
      break;
    case 40:
      keys["down"] = false;
      break;
    case 37:
      keys["left"] = false;
      break;
  }
}

// game loop
function update() {

  window.requestAnimationFrame(update);
  ctx.clearRect(0, 0, width, height);

  // player
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(player.xPos, player.yPos, player.size, player.size);

  player.xNeg = player.xPos + player.size;
  player.yNeg = player.yPos + player.size;
  player.xMid = player.xPos + player.size / 2;
  player.yMid = player.yPos + player.size / 2;

  //movement
  if (keys["up"]) {
    player.yPos -= player.speed;
  }
  if (keys["down"]) {
    player.yPos += player.speed;
  }
  if (keys["right"]) {
    player.xPos += player.speed;
  }
  if (keys["left"]) {
    player.xPos -= player.speed;
  }

  //Collisions

  //looping walls
  if (player.xPos > width) {
    player.xPos = -50;
  }
  if (player.xPos < -50) {
    player.xPos = width;
  }
  if (player.yPos > height) {
    player.yPos = -50;
  }
  if (player.yPos < -50) {
    player.yPos = height;
  }

  //square
  square1.xNeg = square1.xPos + square1.size;
  square1.yNeg = square1.yPos + square1.size;
  square1.xMid = square1.xPos + square1.size / 2;
  square1.yMid = square1.yPos + square1.size / 2;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.fillRect(square1.xPos, square1.yPos, square1.size, square1.size);
  if(player.yNeg >= square1.yPos){
    if(player.xNeg >= square1.xPos){
      if(player.yPos <= square1.yNeg){
        if(player.xPos <= square1.xNeg){
    player.xPos = 50;
    player.yPos = 50;
        }
      }
  }
  }
}

window.requestAnimationFrame(update);
