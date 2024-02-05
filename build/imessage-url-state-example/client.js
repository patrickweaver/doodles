/* global React, ReactDom */
console.log("✨ iMessage Compatible URL State App ✨");

// Because this is deployed without a bundler React and ReactDOM are global
const { useState, useEffect, useMemo } = React;
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

const ROOT_URL = "http://localhost:3000/imessage-url-state-example";
// const ROOT_URL = "https://doodles.patrickweaver.net/imessage-url-state-example";
const COLORS = ["r", "g", "b"];
const BOX_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const URL_SAFE_CHARS = ["-", "_", ".", "+", "!", "*", "'", ",", "%E2%9C%A8"];
const DEFAULT_DISTANCE = 40;
const WARNING_DISTANCE = 301;

function App() {
  const hash = window.location.hash;
  const { separator: hashSeparator, distance: hashDistance } =
    parseHashForSeparator(hash);
  const initialSeparator = hashSeparator ?? URL_SAFE_CHARS[0];
  const initialDistance = hashDistance ?? DEFAULT_DISTANCE;
  const [initialColors, parseError] = getColorsFromWindowHashOrRandom(hash);

  if (parseError) alert(`Error: ${parseError}`);

  const [hashString, setHashString] = useState(hash);
  const [separator, setSeparator] = useState(initialSeparator);
  const [distance, setDistance] = useState(initialDistance);
  const [experimentMode, setExperimentMode] = useState(false);
  const [colors, setColors] = useState(initialColors);

  // Set window hash if loaded from URL without hash
  if (!hash || parseError) updateWindowHash(colors, separator, distance);

  function updateWindowHash(state, separator, distance) {
    const iMessageSafeHash = getIMessageSafeHash(state, separator, distance);
    setWindowHash(iMessageSafeHash);
    setHashString(iMessageSafeHash);
  }

  function handleUpdateColors(newColors) {
    setColors(newColors);
    updateWindowHash(newColors, separator, distance);
  }

  function handleUpdateSeparator(event) {
    const newSeparator = event.target.value;
    setSeparator(newSeparator);
    updateWindowHash(colors, newSeparator, distance);
  }

  function handleUpdateDistance(event) {
    const newDistance = event.target.value;
    setDistance(newDistance);
    updateWindowHash(colors, separator, newDistance);
  }

  return (
    <div>
      <header>
        <h1>iMessage Safe URL Stored Color Palette Example</h1>
      </header>
      <div id="sharable-url">
        <h2>Sharable URL:</h2>
        <textarea value={`${ROOT_URL}/${hashString}`}></textarea>
      </div>
      <Experiments
        {...{
          experimentMode,
          setExperimentMode,
          separator,
          handleUpdateSeparator,
          distance,
          handleUpdateDistance,
        }}
      />
      <ColorSwatchList colors={colors} onUpdateColors={handleUpdateColors} />
    </div>
  );
}

function Experiments({
  experimentMode,
  setExperimentMode,
  separator,
  handleUpdateSeparator,
  distance,
  handleUpdateDistance,
}) {
  return (
    <>
      <h2>Experiments</h2>
      <div id="exp-toggle">
        <label htmlFor="exp-enable">Toggle Experiments Area</label>
        <input
          id="exp-enable"
          type="checkbox"
          checked={experimentMode}
          onChange={() => setExperimentMode(!experimentMode)}
        />
      </div>
      {experimentMode && (
        <div id="experiments">
          <fieldset id="experiment-separator" onChange={handleUpdateSeparator}>
            <legend>Separator Character</legend>
            {URL_SAFE_CHARS.map((char, index) => (
              <span key={char}>
                <input
                  type="radio"
                  id={index}
                  name="separator"
                  value={char}
                  checked={separator === char}
                />
                <label htmlFor={index}>{char}</label>
              </span>
            ))}
          </fieldset>
          <label htmlFor="exp-distance">Separator Distance</label>
          <input
            id="exp-distance"
            type="number"
            value={distance}
            onChange={handleUpdateDistance}
            min="1"
            max="500"
          />
          <label id="distance-warning" htmlFor="exp-distance">
            <em>
              Distances greater than {WARNING_DISTANCE} break iMessage
              compatibility
            </em>
          </label>
        </div>
      )}
    </>
  );
}

function ColorSwatchList({ colors, onUpdateColors }) {
  function handleSetColor(id, newColor) {
    const newState = {
      ...colors,
      [id]: newColor,
    };
    onUpdateColors(newState);
  }

  const list = BOX_IDS.map((id) => (
    <ColorSwatch
      key={id}
      color={colors[id]}
      id={id}
      onChangeColor={handleSetColor}
    />
  ));

  return <ul id="color-list">{list}</ul>;
}

function ColorSwatch({ id, color, onChangeColor }) {
  function handleColorUpdate(name, value) {
    onChangeColor(id, {
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
            key={colorName}
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

function getColorsFromWindowHashOrRandom(hash) {
  const randomState = BOX_IDS.reduce(
    (a, c) => ({ [c]: randomColor(), ...a }),
    {}
  );
  try {
    const iMessageSafeData = hash?.slice(1, hash.length);
    const originalData = base64DataFromIMessageSafeData(iMessageSafeData);
    const hashStateString = hash ? atob(originalData) : "{}";
    const hashState = JSON.parse(hashStateString);
    const state = {
      ...randomState,
      ...hashState,
    };
    return [state, null];
  } catch (error) {
    return [randomState, "Could not get colors from URL."];
  }
}

function getIMessageSafeHash(newState, separator, distance) {
  const newHash = btoa(JSON.stringify(newState));
  const iMessageSafeData = iMessageSafeDataFromBase64Data(
    newHash,
    separator,
    distance
  );
  return `#${iMessageSafeData}`;
}

function setWindowHash(iMessageSafeHash) {
  if (history.replaceState) {
    history.replaceState(null, null, iMessageSafeHash);
  } else {
    window.location.hash = iMessageSafeHash;
  }
}

function parseHashForSeparator(hash) {
  for (let i = 0; i < hash.length; i++) {
    const char = hash[i];
    if (URL_SAFE_CHARS.includes(char)) {
      return { separator: char, distance: i - 1 };
    }
  }
  return { separator: null, distance: null };
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

function iMessageSafeDataFromBase64Data(
  unsafeData,
  separator = URL_SAFE_CHARS[1],
  distance = DEFAULT_DISTANCE
) {
  const safeHashData = unsafeData.split("").reduce((a, c, i) => {
    let nextChar = c;
    if (i > 0 && i % distance === 0) nextChar = `${separator}${nextChar}`;
    return `${a}${nextChar}`;
  }, "");
  return `${safeHashData}`;
}

function base64DataFromIMessageSafeData(safeData) {
  if (!safeData) return "";
  let resultHash = safeData;
  URL_SAFE_CHARS.forEach((char) => {
    resultHash = resultHash.replaceAll(char, "");
  });
  return resultHash;
}
