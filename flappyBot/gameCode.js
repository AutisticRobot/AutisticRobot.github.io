var time = 119;
var game = false;
var start = true;


function Start(){
  ctx.clearRect(0, 0, width, height);
  game = true;
  start = false;
  var chop = hitbox.tag.length;
  console.log(chop)
  while(hitbox.tag.length > 0){
    deleteHitbox(0);
    console.log(0);
  }
  createBox(100, 300, 0, 0, 10, 10, 0, 0, "yellow", true, false, false);
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
      if(hitCheck(0, c)){
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
