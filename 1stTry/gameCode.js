var width = 900;
var height = 500;
var i = 1;
var score = 999;
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
  xSize: 50,
  ySize: 50,
  xPos: 50,
  yPos: 50,
  xNeg: this.xPos + this.xSize,
  yNeg: this.yPos + this.ySize,
  speed: 5,
};

//square
function deathSquare(xPos, yPos, xSize, ySize){
  var xNeg;
  var yNeg;

  xNeg = xPos + xSize;
  yNeg = yPos + ySize;
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
  ctx.fillRect(player.xPos, player.yPos, player.xSize, player.ySize);

  player.xNeg = player.xPos + player.xSize;
  player.yNeg = player.yPos + player.ySize;

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
  
  ctx.fillStyle = 'green';
  ctx.font = '20px san-serif';
  ctx.fillText(score, 0, 0);
}

window.requestAnimationFrame(update);
