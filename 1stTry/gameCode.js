var width = 900;
var height = 500;
var i = 1;
var score = 0;
var saved_data = {
  hiscore: 0,
}
if(window.localStorage.getItem('SB-HS') !== null){
  saved_data = JSON.parse(window.localStorage.getItem('SB-HS'));
}
var array = {
  tag: [],
  x:[],
  y:[],
  sizeX: [],
  sizeY: [],
  di: [],
}

const canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
canvas.focus();
canvas.addEventListener("onkeydown", movePlayer);

//player vars
var player = {
  frames: 5,
  xSize: 50,
  ySize: 50,
  xPos: 50,
  yPos: 225,
  xNeg: this.xPos + this.xSize,
  yNeg: this.yPos + this.ySize,
  speed: 4,
};

//square
function deathSquare(type, xPos, yPos, xSize, ySize, count){
  var xNeg = xPos + xSize;
  var yNeg = yPos + ySize;

  switch(type){
    case 0:
      ctx.fillStyle = "red";
      break;
    case 1:
      ctx.fillStyle = "yellow";
      break;
  }
  ctx.beginPath();
  ctx.fillRect(xPos, yPos, xSize, ySize);
  if(player.yNeg >= yPos && player.xNeg >= xPos && player.yPos <= yNeg && player.xPos <= xNeg && player.frames == 0){
    switch(type){
      case 0:
        player.xPos = 50;
        player.yPos = 225;
        score = 0;
        player.frames += 5;
        player.xNeg = player.xPos + player.xSize;
        player.yNeg = player.yPos + player.ySize;
        break;
      case 1:
        score += 5;
        delete array.tag[count];
        delete array.x[count];
        delete array.y[count];
        delete array.sizeX[count];
        delete array.sizeY[count];
        delete array.di[count];
        //array.tag.filter;
        //array.x.filter;
        //array.y.filter;
        //array.sizeX.filter;
        //array.sizeY.filter;
        //c--;
        break;
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
  if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
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
  if(player.frames > 0){
    player.frames -= 1;
  }
  for (var t=0; t < array.tag.length; t++){
    switch (array.di[t]){
      case 0:
        break;
      case 1:
        array.y[t] += 4;
        break;
      case 2:
        array.y[t] -= 4;
        break;
    }
  }
  if (i === 24){
    array.tag.push(0);
    array.x.push(300);
    array.y.push(-50);
    array.sizeX.push(60);
    array.sizeY.push(10);
    array.di.push(1);
    
    
    array.tag.push(0);
    array.x.push(450);
    array.y.push(550);
    array.sizeX.push(60);
    array.sizeY.push(10);
    array.di.push(2);
    
    
    array.tag.push(0);
    array.x.push(600);
    array.y.push(-50);
    array.sizeX.push(60);
    array.sizeY.push(10);
    array.di.push(1);
    
    
    array.tag.push(0);
    array.x.push(750);
    array.y.push(550);
    array.sizeX.push(60);
    array.sizeY.push(10);
    array.di.push(2);
    i = 0;
  }
  if (i === 12){
    array.tag.push(1);
    array.x.push(320);
    array.y.push(-50);
    array.sizeX.push(20);
    array.sizeY.push(20);
    array.di.push(1);
    
    
    array.tag.push(1);
    array.x.push(470);
    array.y.push(550);
    array.sizeX.push(20);
    array.sizeY.push(20);
    array.di.push(2);
    
    
    array.tag.push(1);
    array.x.push(620);
    array.y.push(-50);
    array.sizeX.push(20);
    array.sizeY.push(20);
    array.di.push(1);
    
    
    array.tag.push(1);
    array.x.push(770);
    array.y.push(550);
    array.sizeX.push(20);
    array.sizeY.push(20);
    array.di.push(2);
  }
  i++
  


  window.requestAnimationFrame(update);
  ctx.clearRect(0, 0, width, height);


  // player
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(player.xPos, player.yPos, player.xSize, player.ySize);

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
  player.xNeg = player.xPos + player.xSize;
  player.yNeg = player.yPos + player.ySize;

  for (var c=0; c < array.tag.length; c++){
      deathSquare(array.tag[c], array.x[c], array.y[c], array.sizeX[c], array.sizeY[c], c);
  }
  
  ctx.fillStyle = 'LawnGreen';
  ctx.font = '30px comic-sans';
  ctx.fillText('Score: ' + score, 5, 50);
  if( score > saved_data.hiscore){
    saved_data.hiscore = score;
    window.localStorage.setItem('SB-HS', JSON.stringify(saved_data));
  }
  ctx.fillStyle = 'LawnGreen';
  ctx.font = '30px comic-sans';
  ctx.fillText('hiscore: ' + saved_data.hiscore, 5, 25);
}

window.requestAnimationFrame(update);
