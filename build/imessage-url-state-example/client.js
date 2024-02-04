/* global React, ReactDom */
console.log("✨ iMessage Compatible URL State App ✨");

const ROOT_URL = "http://localhost:3000/imessage-url-state-example";
// const ROOT_URL = "https://doodles.patrickweaver.net/imessage-url-state-example";
const COLORS = ["r", "g", "b"];
const BOX_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const { useState } = React;

// Render your React component instead
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

function App() {
  const [hashState, setHashState] = useState(getWindowHashState());

  function handleUpdate(newState) {
    setHashState(newState);
    setWindowHashState(newState);
  }

  return (
    <div>
      <header>
        <h1>Color Palette Tool</h1>
      </header>
      <div id="sharable-url">
        <h2>Sharable URL:</h2>
        <textarea value={`${ROOT_URL}/${window.location.hash}`}></textarea>
      </div>
      <ColorSwatchList hashState={hashState} updateHashState={handleUpdate} />
    </div>
  );
}

function ColorSwatchList({ hashState, updateHashState }) {
  function handleSetColor(id, newColor) {
    const newState = {
      ...hashState,
      [id]: newColor,
    };
    updateHashState(newState);
  }

  const list = BOX_IDS.map((id, index) => (
    <ColorSwatch color={hashState[id]} id={id} setColor={handleSetColor} />
  ));

  return <ul id="color-list">{list}</ul>;
}

function ColorSwatch({ id, color, setColor }) {
  function handleColorUpdate(name, value) {
    setColor(id, {
      ...color,
      [name]: value,
    });
  }

  const backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b})`;
  const idColor = isDarkColor(color) ? "white" : "black";
  return (
    <li id={`color-${id}`} className="color-input" style={{ backgroundColor }}>
      <span style={{ color: idColor }}>{id}</span>
      <div className="controls">
        {COLORS.map((colorName) => (
          <ColorInput
            colorValue={color[colorName]}
            colorName={colorName}
            id={id}
            setColor={handleColorUpdate}
          />
        ))}
      </div>
    </li>
  );
}

function ColorInput({ colorValue, colorName, id, setColor }) {
  const inputId = `color-${id}-${colorName}-slider`;
  const colorLabel = colorName.toUpperCase();

  function handleUpdate(event) {
    setColor(colorName, event.target.value);
  }
  return (
    <div>
      <label htmlFor={inputId}>
        <strong>{colorLabel}:</strong> {colorValue}
      </label>
      <input
        type="range"
        min="0"
        max="255"
        id={inputId}
        value={colorValue}
        onChange={handleUpdate}
      ></input>
    </div>
  );
}

function getWindowHashState() {
  const _hash = window.location.hash;
  const hash = _hash.slice(1, _hash.length);
  const _hashState = atob(hash);
  const hashState = JSON.parse(_hashState || "null");
  if (hashState) return hashState;
  const randomState = BOX_IDS.reduce(
    (a, c) => ({ [c]: randomColor(), ...a }),
    {}
  );
  setWindowHashState(randomState);
  return randomState;
}

function setWindowHashState(newState) {
  const newHash = btoa(JSON.stringify(newState));
  if (history.replaceState) {
    history.replaceState(null, null, `#${newHash}`);
  } else {
    window.location.hash = newHash;
  }
}

function randomInt(maxValue = 255) {
  return Math.floor(Math.random() * maxValue);
}

function randomColor() {
  return {
    r: randomInt(),
    g: randomInt(),
    b: randomInt(),
  };
}

function isDarkColor(color) {
  return (parseInt(color.r) + parseInt(color.g) + parseInt(color.b)) / 3 < 115;
}
