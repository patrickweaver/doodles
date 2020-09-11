function drawCanvas(spacing, lineWidth) {
  ctx.clearRect(0, 0, 100, 100);
  var lineWidth = parseInt(lineWidth);
  // Line 1
  ctx.fillRect(0, 0, lineWidth, 40);
  // Line 2
  //ctx.fillRect(25, 0, 1, 40)
  function drawRectLine(ctx, sx, sy, ex, ey, w) {
    ctx.translate(sx, sy);
    var yD = ey - sy;
    var xD = ex - sx;
    ctx.rotate(-Math.atan(xD / yD));
    ctx.translate(-sx, -sy);
    var l = Math.sqrt((yD * yD) + (xD * xD));
    ctx.fillRect(sx, sy, w, l);
    ctx.resetTransform();
  }
  drawRectLine(ctx, 25, 0, 60, 40, lineWidth)
  // Stripes
  for (var i = 0; i < 100; i += parseInt(spacing) + 1) {
    ctx.fillRect(i, 50, lineWidth, 50);
  }
  /*
  
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
  ctx.resetTransform();
  */
}
ctx.fillStyle = "#FF0000";
// line Spacing
const c3LineSpacing = document.getElementById("c3-line-spacing");
const c3LineSpacingLabel = document.getElementById("c3-line-spacing-label");
c3LineSpacingLabel.innerHTML = c3LineSpacing.value;

c3LineSpacing.oninput = (event) => {
  const v = c3LineSpacing.value;
  c3LineSpacingLabel.innerHTML = v;
  drawCanvas(v, c3LineWidth.value);
}

// line width
const c3LineWidth = document.getElementById("c3-line-width");
const c3LineWidthLabel = document.getElementById("c3-line-width-label");
c3LineWidthLabel.innerHTML = c3LineWidth.value;

c3LineWidth.oninput = (event) => {
  const v = c3LineWidth.value;
  c3LineWidthLabel.innerHTML = v;
  drawCanvas(c3LineSpacing.value, v);
}

drawCanvas(c3LineSpacing.value, c3LineWidth.value)