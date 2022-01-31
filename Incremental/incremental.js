const canvas = document.getElementsByTagName(canvas);
var ctx = canvas.getContext("2d");
canvas.focus();
canvas.addEventListener(keypress, example)


function example(event) {
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

function update() {
  ctx.clearRect(0, 0, width, height);
  window.requestAnimationFrame(update);
  // game loop----------------------------------------------------------------------------------------------------------------------------------------------

}

window.requestAnimationFrame(update);
