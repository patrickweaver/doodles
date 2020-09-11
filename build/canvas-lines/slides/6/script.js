function drawCanvas4(spacing, lineWidth) {
  canvas.width = 100 * 2;
  canvas.height = 100 * 2;
  ctx.scale(2, 2);
  ctx.strokeStyle = "#FF0000";
  ctx.clearRect(0, 0, 100, 100);
  ctx.lineWidth = parseInt(lineWidth);
  // Line 1
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 40);
  ctx.stroke();
  
  // Line 2
  ctx.beginPath();
  ctx.moveTo(25, 0);
  ctx.lineTo(60, 40);
  ctx.stroke();
  
  // Stripes
  for (var i = 0; i < 100; i += parseInt(spacing) + 1) {
    ctx.beginPath();
    ctx.moveTo(i, 50);
    ctx.lineTo(i, 100);
    ctx.stroke();
  }
  ctx.lineWidth = 1;
}
// line Spacing
const c4LineSpacing = document.getElementById("c4-line-spacing");
const c4LineSpacingLabel = document.getElementById("c4-line-spacing-label");
c4LineSpacingLabel.innerHTML = c4LineSpacing.value;

c4LineSpacing.oninput = (event) => {
  const v = c4LineSpacing.value;
  c4LineSpacingLabel.innerHTML = v;
  drawCanvas4(v, c4LineWidth.value);
}

// line width
const c4LineWidth = document.getElementById("c4-line-width");
const c4LineWidthLabel = document.getElementById("c4-line-width-label");
c4LineWidthLabel.innerHTML = c4LineWidth.value;

c4LineWidth.oninput = (event) => {
  const v = c4LineWidth.value;
  c4LineWidthLabel.innerHTML = v;
  drawCanvas4(c4LineSpacing.value, v);
}

drawCanvas4(c4LineSpacing.value, c4LineWidth.value)