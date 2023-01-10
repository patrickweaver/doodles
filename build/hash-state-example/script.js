const ROOT_URL = "https://doodles.patrickweaver.net/";
const state = {};

function app() {
  initialize();
  const boxes = [1, 2, 3];
  boxes.forEach((boxNumber) => {
    getInputs(boxNumber).forEach((i) => i.addEventListener("input", update));
  });
  update();
}

function initialize() {
  const _hash = window.location.hash;
  const hash = _hash.slice(1, _hash.length);
  const _hashState = atob(hash);
  console.log({ _hashState });
  const hashState = JSON.parse(_hashState || "{}");
  Object.keys(hashState).forEach((boxNumber) => {
    setInputs(boxNumber, hashState[boxNumber]);
  });
}

function update() {
  const boxes = [1, 2, 3];
  boxes.forEach((boxNumber) => {
    const [colorR, colorG, colorB] = getInputs(boxNumber);
    const colorBox = document.getElementById(`color-${boxNumber}`);
    colorBox.style.backgroundColor = `rgba(${colorR.value}, ${colorG.value}, ${colorB.value})`;
    state[boxNumber] = {
      red: colorR.value,
      green: colorG.value,
      blue: colorB.value,
    };
  });

  const stateJSON = JSON.stringify(state);
  document.getElementById("current-state").innerHTML = stateJSON;
  const newURL = `${ROOT_URL}#${btoa(stateJSON)}`;
  document.getElementById("current-url-code").innerHTML = newURL;
  const urlLink = document.getElementById("current-url-link");
  urlLink.innerHTML = newURL;
  urlLink.href = newURL;
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

app();
