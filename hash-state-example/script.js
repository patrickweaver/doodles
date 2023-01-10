const ROOT_URL = "https://doodles.patrickweaver.net/hash-state-example/";
const state = { 1: {}, 2: {}, 3: {} };
const boxes = [1, 2, 3];
const colors = ["r", "g", "b"];

function app() {
  initialize();
  boxes.forEach((boxNumber) => {
    getInputs(boxNumber).forEach((i) => i.addEventListener("input", update));
  });
  update();
}

function initialize() {
  const _hash = window.location.hash;
  const hash = _hash.slice(1, _hash.length);
  const _hashState = atob(hash);
  const hashState = JSON.parse(_hashState || "{}");
  const board = document.getElementById("board");
  Object.keys(state).forEach((boxNumber) => {
    board.insertAdjacentElement("beforeend", getColorSquare(boxNumber));
  });
  Object.keys(hashState).forEach((boxNumber) => {
    setInputs(boxNumber, hashState[boxNumber]);
  });
}

function update() {
  boxes.forEach((boxNumber) => {
    const [colorR, colorG, colorB] = getInputs(boxNumber);
    const values = [colorR.value, colorG.value, colorB.value];
    const colorBox = document.getElementById(`color-${boxNumber}`);
    colorBox.style.backgroundColor = `rgba(${values[0]}, ${values[1]}, ${values[2]})`;
    colors.forEach((color, index) => {
      document.getElementById(`color-${boxNumber}-${color}-label`).innerHTML =
        values[index];
    });
    state[boxNumber] = {
      red: values[0],
      green: values[1],
      blue: values[2],
    };
  });

  const stateJSON = JSON.stringify(state);
  document.getElementById("current-state").innerHTML = stateJSON;
  const newHash = btoa(stateJSON);
  const newURL = `${ROOT_URL}#${newHash}`;
  document.getElementById("current-url-code").innerHTML = newURL;
  const urlLink = document.getElementById("current-url-link");
  urlLink.innerHTML = newURL;
  urlLink.href = newURL;
  window.location.hash = newHash;
}

function getInputs(boxNumber) {
  const colorR = document.getElementById(`color-${boxNumber}-r-slider`);
  const colorG = document.getElementById(`color-${boxNumber}-g-slider`);
  const colorB = document.getElementById(`color-${boxNumber}-b-slider`);
  return [colorR, colorG, colorB];
}

function setInputs(boxNumber, boxState) {
  document.getElementById(`color-${boxNumber}-r-slider`).value =
    boxState.red ?? 255 / 2;
  document.getElementById(`color-${boxNumber}-g-slider`).value =
    boxState.green ?? 255 / 2;
  document.getElementById(`color-${boxNumber}-b-slider`).value =
    boxState.blue ?? 255 / 2;
}

function getColorSquare(boxNumber) {
  const colorSquare = document.createElement("div");
  colorSquare.id = `color-${boxNumber}`;
  colorSquare.classList.add("color-square");
  const controls = document.createElement("div");
  controls.classList.add("controls");
  colors.forEach((color) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const id = `color-${boxNumber}-${color}-slider`;
    input.id = id;
    label.htmlFor = id;
    input.type = "range";
    input.min = 0;
    input.max = 255;
    input.value = 255 / 2;
    label.innerHTML = `<strong>${color.toUpperCase()}: </strong><span id="color-${boxNumber}-${color}-label"></span>`;
    controls.insertAdjacentElement("beforeend", label);
    controls.insertAdjacentElement("beforeend", input);
  });
  colorSquare.insertAdjacentElement("beforeend", controls);
  return colorSquare;
}

app();
