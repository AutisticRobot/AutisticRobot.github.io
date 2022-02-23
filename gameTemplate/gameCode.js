const canvas = document.getElementsByTagName(canvas);
var ctx = canvas.getContext("2d");
canvas.focus();


// game loop----------------------------------------------------------------------------------------------------------------------------------------------
function update() {
  ctx.clearRect(0, 0, width, height);
  window.requestAnimationFrame(update);

}

window.requestAnimationFrame(update);
