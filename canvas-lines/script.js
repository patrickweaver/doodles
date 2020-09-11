// - - - - - - - - - - - - - -
// <pre><code>
// - - - - - - - - - - - - - -

var matches = document.querySelectorAll("code");
for (var i = 0; i < matches.length; i++) {
  const e = matches[i];
  e.textContent = e.textContent.replace(/^\s+/mg, "");
}

// - - - - - - - - - - - - - -
// Canvases
// - - - - - - - - - - - - - -

var dpr = window.devicePixelRatio || 1;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;
ctx.strokeStyle = "#FF0000";

// - - - - - - - - - - - - - -
// Controls
// - - - - - - - - - - - - - -

function disableScaling() {
  scale(100)
  const scaleButton = document.getElementById("scale-button");
  const scaleStatus = document.getElementById("scale-status");
  scaleStatus.innerHTML = "not ";
  scaleButton.innerHTML = "Enable";
  scaleButton.onclick = enableScaling;
}

function enableScaling() {
  scale(400)
  const scaleButton = document.getElementById("scale-button");
  const scaleStatus = document.getElementById("scale-status");
  scaleStatus.innerHTML = "";
  scaleButton.innerHTML = "Disable";
  scaleButton.onclick = disableScaling;
}

function scale(size) {
  const cs = document.getElementsByTagName("canvas");
  for (var i = 0; i < cs.length; i++){
    var s = cs[i].style;
    s.width = `${size}px`;
    s.height = `${size}px`;
  }
}