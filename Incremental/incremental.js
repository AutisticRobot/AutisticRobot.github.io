const canvas = document.getElementsByTagName(canvas);
var ctx = canvas.getContext("2d");
canvas.focus();
canvas.addEventListener('click', click)
var cursor = {
  X: 0,
  Y: 0,
}

function click() {
  cursor.X = event.clientX
  cursor.Y = event.clientY
}

function update() {
  ctx.clearRect(0, 0, width, height);
  window.requestAnimationFrame(update);
  // game loop----------------------------------------------------------------------------------------------------------------------------------------------

}

window.requestAnimationFrame(update);
