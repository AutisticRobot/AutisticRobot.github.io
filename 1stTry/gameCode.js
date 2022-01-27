var width = 900;
var height = 500;
var i = 1;
var array = {
  tag: [],
  x:[],
  y:[],
  sizeX: [],
  sizeY: [],
}

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

//square
function deathSquare(xPos, yPos, xSize, ySize){
  var xNeg;
  var yNeg;
  var xMid;
  var yMid;

  xNeg = xPos + xSize;
  yNeg = yPos + ySize;
  xMid = xPos + xSize / 2;
  yMid = yPos + ySize / 2;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.fillRect(xPos, yPos, xSize, ySize);
  if(player.yNeg >= yPos){
    if(player.xNeg >= xPos){
      if(player.yPos <= yNeg){
        if(player.xPos <= xNeg){
          player.xPos = 50;
          player.yPos = 50;
        }
      }
    }
  }
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

// game loop----------------------------------------------------------------------------------------------------------------------------------------------
function update() {
  for (var t=0; t < array.tag.length; t++){
    switch (array.tag[t]){
      case 0:
        array.y[t] += 5;
    }
  }
  if (i === 20){
    array.tag.push(0)
    array.x.push(300)
    array.y.push(0)
    array.sizeX.push(60)
    array.sizeY.push(10)
    i = 0;
  }
  i++
  


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

  for (var t=0; t < array.tag.length; t++){
    deathSquare(array.x[t], array.y[t], array.sizeX[t], array.sizeY[t]);
  }
}

window.requestAnimationFrame(update);
