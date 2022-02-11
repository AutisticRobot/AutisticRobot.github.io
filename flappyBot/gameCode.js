var time = 0;
var game = false;
var start = false;

var hidden = -3;
var score = 0;
var hiscore = 0;
if(window.localStorage.getItem('FlappyBot') !== null){
  hiscore = JSON.parse(window.localStorage.getItem('FlappyBot'));
}

createBox(100, 300, 0, 0, 10, 10, 0, 0, "yellow", true, false, false);

function cHitCheck(hitID2){
  if(0 != hitID2){
    hitbox.farX[0] = hitbox.x[0] + hitbox.sizeX[0];
    hitbox.farY[0] = hitbox.y[0] + hitbox.sizeY[0];
    hitbox.farX[hitID2] = hitbox.x[hitID2] + hitbox.sizeX[hitID2];
    hitbox.farY[hitID2] = hitbox.y[hitID2] + hitbox.sizeY[hitID2];
    if(hitbox.x[0] < hitbox.farX[hitID2]){
      if(hitbox.y[0] < hitbox.farY[hitID2]){
        if(hitbox.farX[0] > hitbox.x[hitID2]){
          if(hitbox.farY[0] > hitbox.y[hitID2]){
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}

function Start(){
  ctx.clearRect(0, 0, width, height);
  game = true;
  start = false;
  hidden = -3;
  score = 0;
  time = 0;
  while(hitbox.tag.length > 0){
    deleteHitbox(0);
  }
  if(hitbox.tag[0] == undefined || null){
    createBox(100, 300, 0, 0, 10, 10, 0, 0, "yellow", true, false, false);
  }else{
    
  hitbox.tag[0] = 0;
  hitbox.prop[0] = 0;
  hitbox.color[0] = "yellow";
  hitbox.sizeX[0] = 10;
  hitbox.sizeY[0] = 10;
  hitbox.x[0] = 100;
  hitbox.y[0] = 300;
  hitbox.farX[0] = 110;
  hitbox.farY[0] = 310;
  hitbox.xMove[0] = 0;
  hitbox.yMove[0] = 0;
  hitbox.hasGravity[0] = false;
  hitbox.hasMomentium[0] = true;
  hitbox.despawn[0] = false;
  }
}



body.addEventListener("keydown", e=>{
  if(game == false && e.keyCode != 17 && e.keyCode != 16){
    Start();
  }
});

if(start == true){
  Start();
}



// game loop----------------------------------------------------------------------------------------------------------------------------------------------
function update() {
  ctx.clearRect(0, 0, width, height);
  window.requestAnimationFrame(update);
  var img = document.getElementById("face");


  for(var a=0; a < hitbox.tag.length; a++){
    if(cHitCheck(a)){
      game = false;
    }
  }

  if(hitbox.y[0] >= height - 10){
    hitbox.yMove[0] = 0;
    hitbox.y[0] = height - 10;
    hitbox.hasGravity[0] = false;
    game = false;
  }
  if(hitbox.y[0] <= 0){
    hitbox.yMove[0] = 0;
    hitbox.y[0] = 0;
  }
  
  if(game){
    time++;
    if(time == 100){
      var center = {
        x: 1200,
        y: Math.floor(Math.random() * 300) + 150,
        offset: 100,
      }
      createBox(center.x, center.y + center.offset, -5, null, 50, 600, 1, 1, '#20fc20', false, false, true);
      createBox(center.x, center.y - center.offset - 600, -5, null, 50, 600, 1, 1, '#20fc20', false, false, true);
      time = 0;
    }
    if(time == 20){
      hidden++;
      if(hidden > score){
        score = hidden;
      }
    }

    for(var b=0; b < keys.length; b++){
      if(keyList[b] != null || undefined){
        if(keyList[b] == 80){
          hitbox.yMove[0] = 0;
          hitbox.hasGravity[0] = false;
          game = false;
        }else{
        hitbox.hasGravity[0] = true;
        hitbox.yMove[0] = -15;
        }
        keyList.splice(b,1);
      }
    }


  }else{
    for(var tag = 0; tag < hitbox.tag.length; tag++) {
      hitbox.xMove[tag] = 0;
    };
  }

  if( score > hiscore){
    hiscore = score;
    window.localStorage.setItem('FlappyBot', JSON.stringify(hiscore));
  }



  uniUpdate(.5);



  ctx.drawImage(img, 32, 32);

  ctx.fillStyle = 'black';
  ctx.font = '30px comic-sans';
  ctx.fillText('hiscore: ' + hiscore, 5, 25);
  ctx.fillStyle = 'black';
  ctx.font = '30px comic-sans';
  ctx.fillText('score: ' + score, 5, 65);

  
}

window.requestAnimationFrame(update);
