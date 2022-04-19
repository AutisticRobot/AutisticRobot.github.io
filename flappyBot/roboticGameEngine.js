const canvas = document.getElementById("ctx");
const body = document.getElementById("body");
const ctx = canvas.getContext("2d");
canvas.focus();
const width = canvas.width;
const height = canvas.height;
const img = document.getElementById('face');
const cloud = document.getElementById('cloud');
body.addEventListener("keydown", event=>{
  if(event.keyCode != 17 && 16){
    keyAdd(event);
  }
  keys.push(event.keyCode);
  if(event.keyCode == 32 || 40 || 39 || 38 || 37){
    event.preventDefault();
  }
});
body.addEventListener("keyup", event=>{
  keyRemove(event);
});


var keys = [];
var keyList = [];
var hitbox = {
  tag: [],
  prop: [],
  color: [],
  sizeX: [],
  sizeY: [],
  x: [],
  y: [],
  farX: [],
  farY: [],
  xMove: [],
  yMove: [],
  hasMomentium: [],
  hasGravity: [],
  despawn: [],
}
var cursor = {
  x: 0,
  y: 0,
}
canvas.addEventListener("mousemove", updateCursorPos);
function updateCursorPos(event){
  cursor = getMousePos(canvas, event);
  function getMousePos(canvas, event){
    var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    }
  }
}

//square render
function render(id){
  if(id == "all"){
    for(var c=0; c < hitbox.tag.length; c++){
      render(c);
    }
  }
  if(hitbox.prop[id] != 3 || 5){
    ctx.fillStyle='black';
    ctx.fillRect(hitbox.x[id] - 1, hitbox.y[id] - 1, hitbox.sizeX[id] + 2, hitbox.sizeY[id] + 2);
  }

  hitbox.farX[id] = hitbox.x[id] + hitbox.sizeX[id];
  hitbox.farY[id] = hitbox.y[id] + hitbox.sizeY[id];
  if(typeof hitbox.color[id] != "string"){
    switch(hitbox.prop[id]){
      default:
        ctx.fillStyle = "#424242";
        break;
      case 0:
        ctx.fillStyle = "black";
        break;
      case 1:
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.drawImage(img, hitbox.x[id], hitbox.y[id], hitbox.sizeX[id], hitbox.sizeY[id]);
        break;
      case 3:
        ctx.fillStyle = 'black';
        ctx.font = '50px comic-sans';
        ctx.fillText("press any key", hitbox.x[id], hitbox.y[id]);

        break
      case 5:
        ctx.fillStyle = "rgba(255, 255, 255, 255)";
        //ctx.drawImage(cloud, hitbox.x[id], hitbox.y[id], hitbox.sizeX[id], hitbox.sizeY[id]);
        break;
    }
  } else {
    ctx.fillStyle = hitbox.color[id];
  }
  if(hitbox.prop[id] != 1 || 3){
    ctx.beginPath();
    ctx.fillRect(hitbox.x[id], hitbox.y[id], hitbox.sizeX[id], hitbox.sizeY[id]);
  }
 
}

//Hitbox Collision Check
function hitCheck(hitID1, hitID2){
  if(hitID1 != hitID2){
    hitbox.farX[hitID1] = hitbox.x[hitID1] + hitbox.sizeX[hitID1]
    hitbox.farY[hitID1] = hitbox.y[hitID1] + hitbox.sizeY[hitID1]
    hitbox.farX[hitID2] = hitbox.x[hitID2] + hitbox.sizeX[hitID2]
    hitbox.farY[hitID2] = hitbox.y[hitID2] + hitbox.sizeY[hitID2]
    if(hitbox.x[hitID1] > hitbox.farX[hitID2] && hitbox.y[hitID1] > hitbox.farY[hitID2] && hitbox.x[hitID2] > hitbox.farX[hitID1] && hitbox.y[hitID2] > hitbox.farY[hitID1]){
      return true;
    }else{
      return false;
    }
  }
}

//Create hitbox
function createBox(x, y, xMove, yMove, sizeX, sizeY, property, tag, color, hasMomentium, hasGravity, despawn){
  if(tag === undefined || null){
    hitbox.tag.push(1);
  }else{
  hitbox.tag.push(tag);
  }
  if(property === undefined || null){
    hitbox.prop.push(-1);
  }else{
  hitbox.prop.push(property);
  }
  hitbox.color.push(color);
  if(sizeX === undefined || null){
    hitbox.sizeX.push(50);
    sizeX = 50;
  }else{
  hitbox.sizeX.push(sizeX);
  }
  if(sizeY === undefined || null){
    hitbox.sizeY.push(50);
    sizeY = 50;
  }else{
  hitbox.sizeY.push(sizeY);
  }
  if(x === undefined || null){
    hitbox.x.push(50);
    x = 50;
  }else{
  hitbox.x.push(x);
  }
  if(y === undefined || null){
    hitbox.y.push(50);
    y = 50;
  }else{
  hitbox.y.push(y);
  }
  hitbox.farX.push(x + sizeX);
  hitbox.farY.push(y + sizeY);
  if(xMove === undefined || null){
    hitbox.xMove.push(0);
  }else{
  hitbox.xMove.push(xMove);
  }
  if(yMove === undefined || null){
    hitbox.yMove.push(0);
  }else{
    hitbox.yMove.push(yMove);
  }
  if(hasMomentium === undefined || null){
    hitbox.hasMomentium.push(false);
  }else{
  hitbox.hasMomentium.push(hasMomentium);
  }
  if(hasGravity === undefined || null){
    hitbox.hasGravity.push(false);
  }else{
  hitbox.hasGravity.push(hasGravity);
  }
  if(despawn === undefined || null){
    hitbox.despawn.push(false);
  }else{
  hitbox.despawn.push(despawn);
  }
}

//delete Hitbox
function deleteHitbox(id){
  hitbox.tag.splice(id,1);
  hitbox.prop.splice(id,1);
  hitbox.color.splice(id,1);
  hitbox.sizeX.splice(id,1);
  hitbox.sizeY.splice(id,1);
  hitbox.x.splice(id,1);
  hitbox.y.splice(id,1);
  hitbox.farX.splice(id,1);
  hitbox.farY.splice(id,1);
  hitbox.xMove.splice(id,1);
  hitbox.yMove.splice(id,1);
  hitbox.hasGravity.splice(id,1);
  hitbox.hasMomentium.splice(id,1);
  hitbox.despawn.splice(id,1);
  return("done");
}

//momentium update
function move(id){
  hitbox.x[id] += hitbox.xMove[id];
  hitbox.y[id] += hitbox.yMove[id];
}

//universial updater
var maxTag;
function uniUpdate(gForce, game, airResist, buffer){
  maxTag = 2;
  //for(var c=0; c < hitbox.tag.length; c++){
  //  if(hitbox.tag[c] > maxTag){
  //    maxtag = hitbox.tag[c];
  //  }
  //}
  for(var t=0; t <= maxTag; t++){
    for(var c=0; c < hitbox.tag.length; c++){
      if(hitbox.tag[c] !== undefined || null){
        if(hitbox.tag[c] == t){
          gravity(c, gForce);
          momentium(c, airResist);
          if(hitbox.prop[c] != 1){
            if (game == true){
              move(c);
            }
          }else {
            move(c);
          }
          despawn(c, buffer);
          render(c);
        }
      }
    }
  }
}

//changeing momentium
function momentium(id, resist){
  if (hitbox.hasMomentium[id] != false || 0){
    let xSign = 1;
    let ySign = 1;
    if (resist === undefined || null){
      resist = 1;
    }
    // if negative, invert
    if (hitbox.xMove[id] < 0){
      var xAbs = -hitbox.xMove[id];
      xSign = -1;
    }else{
      xAbs = hitbox.xMove[id];
    }
    if (hitbox.yMove[id] < 0){
      var yAbs = -hitbox.yMove[id];
      ySign = -1;
    }else{
      yAbs = hitbox.yMove[id];
    }
    //apply air resistance
    if (xAbs >= resist){
      xAbs -= resist;
    }else{
      xAbs = 0;
    }
    //apply change
    if(xSign == -1){
      hitbox.xMove[id] = -xAbs;
    }else{
      hitbox.xMove[id] = xAbs;
    }
    //check for gravity

    if(hitbox.hasGravity == false || 0){
      if (yAbs >= resist){
        yAbs -= resist;
      }else{
        yAbs = 0;
      }

      if(ySign == -1){
        hitbox.yMove[id] = -yAbs;
      }else{
        hitbox.yMove[id] = yAbs;
      }

    }
  }
}


//gravity
function gravity(id, force){
  if (hitbox.hasGravity[id] != false || 0){
    if (force === undefined || null){
      force = 1;
    }
    hitbox.yMove[id] += force;
  }
}

//update key list
function keyAdd(event){
  if(event.keyCode != 17 && event.keyCode != 16){
    keyList.push(event.keyCode);
  }
}

function keyRemove(event){
  let id = 0;
  var done = false;
  while(done == false){
    if(keys[id] == event.keyCode){
      keys.splice(id,1);
      done = true;
    }else{
      id++;
    }
  }
}

//despawn
function despawn(id, buffer){
  if (hitbox.despawn[id] != false || 0){
    if (buffer === undefined || null){
      buffer = 100;
    }
    hitbox.farX[id] = hitbox.x[id] + hitbox.sizeX[id]
    hitbox.farY[id] = hitbox.y[id] + hitbox.sizeY[id]
    if(hitbox.x[id] > width + buffer &&
      hitbox.y[id] > height + buffer &&
      -buffer > hitbox.farX[id] &&
      -buffer > hitbox.farY[id]){
      deleteHitbox(id);
    }
  }
}
