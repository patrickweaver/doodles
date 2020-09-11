function drawCanvas2(spacing, lineWidth) {
  ctx.clearRect(0, 0, 100, 100);
  ctx.lineWidth = parseInt(lineWidth);
  ctx.beginPath();
  for (var i = 0; i < 100; i += parseInt(spacing) + 1) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 100);
  }
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1;
}

// line Spacing
const c2LineSpacing = document.getElementById("c2-line-spacing");
const c2LineSpacingLabel = document.getElementById("c2-line-spacing-label");
c2LineSpacingLabel.innerHTML = c2LineSpacing.value;

c2LineSpacing.oninput = (event) => {
  const v = c2LineSpacing.value;
  c2LineSpacingLabel.innerHTML = v;
  drawCanvas2(v, c2LineWidth.value);
}

// line width
const c2LineWidth = document.getElementById("c2-line-width");
const c2LineWidthLabel = document.getElementById("c2-line-width-label");
c2LineWidthLabel.innerHTML = c2LineWidth.value;

c2LineWidth.oninput = (event) => {
  const v = c2LineWidth.value;
  c2LineWidthLabel.innerHTML = v;
  drawCanvas2(c2LineSpacing.value, v);
}

drawCanvas2(c2LineSpacing.value, c2LineWidth.value)