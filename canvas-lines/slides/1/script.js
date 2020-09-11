function drawCanvas1() {
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(10, 90);
  ctx.moveTo(20, 0);
  ctx.lineTo(70, 50);
  ctx.stroke();
  ctx.closePath();
}
drawCanvas1();