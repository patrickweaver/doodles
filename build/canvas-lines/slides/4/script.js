function drawCanvas3(spacing, lineWidth) {
  ctx.clearRect(0, 0, 100, 100);
  ctx.translate(-0.5, -0.5);
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
  ctx.resetTransform();
}

// line Spacing
const c3LineSpacing = document.getElementById("c3-line-spacing");
const c3LineSpacingLabel = document.getElementById("c3-line-spacing-label");
c3LineSpacingLabel.innerHTML = c3LineSpacing.value;

c3LineSpacing.oninput = (event) => {
  const v = c3LineSpacing.value;
  c3LineSpacingLabel.innerHTML = v;
  drawCanvas3(v, c3LineWidth.value);
}

// line width
const c3LineWidth = document.getElementById("c3-line-width");
const c3LineWidthLabel = document.getElementById("c3-line-width-label");
c3LineWidthLabel.innerHTML = c3LineWidth.value;

c3LineWidth.oninput = (event) => {
  const v = c3LineWidth.value;
  c3LineWidthLabel.innerHTML = v;
  drawCanvas3(c3LineSpacing.value, v);
}

drawCanvas3(c3LineSpacing.value, c3LineWidth.value)

