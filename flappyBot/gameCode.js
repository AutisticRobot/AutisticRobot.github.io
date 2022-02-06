var time = 59;




createBox(100, 300, 0, 0, 10, 10, 0, 0, "yellow", true, false, false);


// game loop----------------------------------------------------------------------------------------------------------------------------------------------
function update() {
  ctx.clearRect(0, 0, width, height);
  window.requestAnimationFrame(update);
  time++;
  if(time == 60){
    var center = {
      x: 1200,
      y: 300,
      offset: 100,
    }
    createBox(center.x, center.y + center.offset, -3, null, 50, 600, 1, 1, '#20fc20', false, false, true)
    createBox(center.x, center.y - center.offset, -3, null, 50, -600, 1, 1, '#20fc20', false, false, true)
    time = 0;
  }

  for(var c=0; c < keys.length; c++){
    if(keys[c] == 32){
      hitbox.yMove = -50; 

    }
  }




  uniUpdate(.1);
}

window.requestAnimationFrame(update);
