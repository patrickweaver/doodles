// Canvas
const canvas = document.getElementById("tenprint");
var ctx = canvas.getContext("2d");

// Controls
const spacingControl = document.getElementById("spacing-control");
const spacingLabel = document.getElementById("spacing-control-label");
const speedControl = document.getElementById("speed-control");
const speedLabel = document.getElementById("speed-control-label");
const directionControl = document.getElementById("direction-control");
const directionLabelUp = document.getElementById("direction-control-label-up");
const directionLabelDown = document.getElementById("direction-control-label-down");


spacingControl.addEventListener('input', updateSpacing);

function updateSpacing(event) {
  const newSpacing = gridSizes[spacingControl.value];
  spacingLabel.innerHTML = newSpacing// * 2;
  spacing = newSpacing;
}

speedControl.addEventListener('input', updateSpeed);

function updateSpeed(event) {
  window.clearTimeout(timer);
  const newSpeed = speeds[speedControl.value];
  const perSec = (1 / (newSpeed / 1000))
  let label = `${perSec} per sec.`;
  if (perSec < 1) {
    const perMin = (perSec * 60);
    label = `${perMin} per min.`;
    if (perMin < 1) {
      label = `${perMin * 60} per hour`;
    }
  }
  const readableLabel = label;
  speedLabel.innerHTML = readableLabel;
  speed = newSpeed;
  replaceSquare();
}

directionControl.addEventListener('input', updateDirection);

function updateDirection(event) {
  const newValue = directionControl.value
  direction = newValue;
  const upPercent = newValue / 10;
  const downPercent = 1 - upPercent;
  directionLabelUp.style.fontSize = `${40 * upPercent}px`;
  directionLabelDown.style.fontSize = `${40 * downPercent}px`;
}

window.onresize = findSize;

var hSize, vSize;
function findSize() {
  hSize = window.innerWidth;
  vSize = window.innerHeight;
  canvas.width = hSize;
  canvas.height = vSize;
}

findSize();

var spacing = 6;
var speed;
var direction = 5;
var timer;

const speeds = [0, .2, 1, 2, 5, 10, 20, 40, 100, 250, 500, 1000, 10000, 1000 * 60, 1000 * 60 * 5].reverse();

var gridSizes;

function resetGridSizes() {
  gridSizes = [1, 2, 4, 8, 16, 32, 64];
  const smallest = hSize < vSize ? hSize : vSize;
  console.log(smallest)
  for (var i = gridSizes[gridSizes.length - 1]; i < smallest / 2; i *= 2) {
    gridSizes.push(i);
  }
  spacingControl.max = gridSizes.length - 1;
}
resetGridSizes();


updateSpacing();


for (let y = 0; y < vSize; y += spacing) {
  for (let x = 0; x < hSize; x += spacing) {
    drawRandom(x, y);
  }
}

updateSpeed()

function up(x, y) {
  ctx.fillStyle = "white";
  for (var i = 0; i < spacing; i++) {
    for (var j = 0; j < spacing; j++) {
      if (
        i === spacing - j
        //|| i + 1 === spacing - j
        //|| i === spacing - j + 1
      ) {
        ctx.fillRect(i + x, j + y, 1, 1);
      }
    }
  }
}

function down(x, y) {
  ctx.fillStyle = "white";
  for (var i = 0; i < spacing; i++) {
    for (var j = 0; j < spacing; j++) {
      if (
        i === j
        //|| i + 1 === j
        //|| i === j + 1
      ) {
        ctx.fillRect(i + x, j + y, 1, 1);
      }
    }
  }
}

function drawRandom(x=null, y=null) {
  if (x === null) {
    x = Math.floor(Math.random() * (hSize / spacing)) * spacing;
  }
  if (y === null) {
    y = Math.floor(Math.random() * (vSize / spacing)) * spacing;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, spacing, spacing);
  if (Math.random() > direction / 10) {
    up(x, y);
  } else {
    down(x, y);
  }
}

function replaceSquare() {
  drawRandom();
  timer = setTimeout(replaceSquare, speed)
}
