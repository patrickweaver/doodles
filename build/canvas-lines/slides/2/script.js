function drawCanvas2() {
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, 90);
  ctx.moveTo(50, 10);
  ctx.lineTo(50, 90);
  ctx.stroke();
  ctx.closePath();
}
drawCanvas2();