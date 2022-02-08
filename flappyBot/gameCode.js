var time = 119;
var game = false;
var start = false;

    createBox(100, 300, 0, 0, 10, 10, 0, 0, "yellow", true, false, false);

function cHitCheck(hitID1, hitID2){
  if(0 != hitID2){
    hitbox.farX[0] = hitbox.x[0] + hitbox.sizeX[0]
    hitbox.farY[0] = hitbox.y[0] + hitbox.sizeY[0]
    hitbox.farX[hitID2] = hitbox.x[hitID2] + hitbox.sizeX[hitID2]
    hitbox.farY[hitID2] = hitbox.y[hitID2] + hitbox.sizeY[hitID2]
    if(hitbox.x[0] > hitbox.farX[hitID2]){
      if(hitbox.y[0] > hitbox.farY[hitID2]){
        if(hitbox.x[hitID2] > hitbox.farX[0]){
          if(hitbox.y[hitID2] > hitbox.farY[0]){
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
  var chop = hitbox.tag.length;
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
  if(game == false){
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

  
  if(game){
    time++;
    if(time == 120){
      var center = {
        x: 1200,
        y: Math.floor(Math.random() * 300) + 150,
        offset: 100,
      }
      createBox(center.x, center.y + center.offset, -5, null, 50, 600, 1, 1, '#20fc20', false, false, true)
      createBox(center.x, center.y - center.offset, -5, null, 50, -600, 1, 1, '#20fc20', false, false, true)
      time = 0;
    }

    for(var c=0; c < keys.length; c++){
      if(keyList[c] == 32){
        hitbox.hasGravity[0] = true;
        hitbox.yMove[0] = -10;
        keyList.splice(c,1);
      }
    }

    for(var c=0; c < hitbox.tag.length; c++){
      if(cHitCheck(0, c)){
        game = false;
      }
    }

    if(hitbox.y[0] > height - 10){
      hitbox.yMove[0] = 0;
      hitbox.hasGravity[0] = false;
      game = false;
    }
  }else{
    for(var tag = 0; tag < hitbox.tag.length; tag++) {
      hitbox.xMove[tag] = 0;
    };
  }



  uniUpdate(.3);
}

window.requestAnimationFrame(update);
