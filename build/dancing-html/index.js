const videoId = "video";
const videoWidth = 300;
const videoHeight = 250;
const fps = 15;
let activeTagLastUpdated = 0;
const activeTagTimeoutMs = 250;
let isActive = false;
const spacer = `<!-- spacer -->`;

const canvas = document.getElementById("output");
const webPage = document.getElementById("web-page");
const viewSourceButton = document.getElementById("view-source");
const webPageSource = document.getElementById("web-page-source");
const closeViewSourceButton = document.getElementById("close-view-source");

let activeTag = null;
let runningInnerHtml = "";
let x = undefined;
let y = undefined;
const def = [x, y];

const guiState = {
  algorithm: "multi-pose",
  input: {
    architecture: "ResNet50",
    outputStride: 32,
    inputResolution: 257,
    multiplier: 1.0,
    quantBytes: 2,
  },
  multiPoseDetection: {
    maxPoseDetections: 5,
    minPoseConfidence: 0.15,
    minPartConfidence: 0.1,
    nmsRadius: 30.0,
  },
  output: {
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
  },
  skeleton: {
    lineWidth: 6,
    pointRad: 7,
    red: 114,
    green: 243,
    blue: 14,
    alpha: 1.0,
    color: "rgba(114,243,14,1.0)",
  },
  net: null,
};

let lastUpdate = 0;

async function poseDetection() {
  function detectPoseInRealTime(video) {
    const canvas = document.getElementById("output");
    const ctx = canvas.getContext("2d");
    const flipPoseHorizontal = true; // since images are being fed from a webcam

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    async function poseDetectionFrame() {
      let poses = [];
      let minPoseConfidence;
      let minPartConfidence;

      let all_poses = await guiState.net.estimatePoses(video, {
        flipHorizontal: flipPoseHorizontal,
        decodingMethod: "multi-person",
        maxDetections: guiState.multiPoseDetection.maxPoseDetections,
        scoreThreshold: guiState.multiPoseDetection.minPartConfidence,
        nmsRadius: guiState.multiPoseDetection.nmsRadius,
      });
      poses = poses.concat(all_poses);
      minPoseConfidence = +guiState.multiPoseDetection.minPoseConfidence;
      minPartConfidence = +guiState.multiPoseDetection.minPartConfidence;

      ctx.clearRect(0, 0, videoWidth, videoHeight);

      if (guiState.output.showVideo) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();
      }

      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          if (guiState.output.showPoints) {
            drawKeypoints(keypoints, minPartConfidence, ctx);
          }
          if (guiState.output.showSkeleton) {
            drawSkeleton(keypoints, minPartConfidence, ctx);
          }
        }
      });

      const now = new Date().getTime();
      if (now > lastUpdate + 67) {
        handleVideoFrame(poses);
        lastUpdate = now;
      }

      setTimeout(() => {
        requestAnimationFrame(poseDetectionFrame);
      }, 1000 / fps);
    }
    poseDetectionFrame();
  }

  const uiLoading = document.getElementById("loading"),
    uiMain = document.getElementById("hidden-video");
  function toggleLoadingUI(loading) {
    uiLoading.style.display = loading ? "block" : "none";
    uiMain.style.display = loading ? "none" : "block";
  }

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  const net = await posenet.load({
    architecture: guiState.input.architecture,
    outputStride: guiState.input.outputStride,
    inputResolution: guiState.input.inputResolution,
    multiplier: guiState.input.multiplier,
    quantBytes: guiState.input.quantBytes,
  });

  toggleLoadingUI(false);

  let video;
  try {
    video = await loadVideo(videoId);
  } catch (e) {
    const info = document.getElementById("info");
    info.textContent += " - " + e.toString();
    info.style.display = "block";
    throw e;
  }

  setupGui([], net);
  detectPoseInRealTime(video);
}

async function listener() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;

  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  var speech = document.getElementById("speech-transcript");
  var bg = document.querySelector("html");
  var currentStatus = document.getElementById("current-status");

  const listenButton = document.getElementById("listen");
  const noListenButton = document.getElementById("no-listen");
  listenButton.onclick = function (event) {
    isActive = true;
    recognition.start();
    currentStatus.innerHTML = "🎙️ Listening";
    listenButton.disabled = true;
    noListenButton.disabled = false;
  };
  noListenButton.onclick = function () {
    isActive = false;
    recognition.stop();
    currentStatus.innerHTML = "🔇";
    listenButton.disabled = false;
    noListenButton.disabled = true;
  };

  recognition.onresult = function (event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    const { results } = event;
    const nextItem = results[results.length - 1];
    // console.log("🎙️", nextItem);
    const nextTranscript = nextItem[0].transcript;
    // console.log(nextTranscript);
    // console.log("Confidence: " + event.results[0][0].confidence);
    speech.innerHTML += " " + nextTranscript;

    const currentElement = document.getElementById("current-element");
    const currentElementTag = currentElement?.tagName?.toLowerCase();

    if (!activeTag || activeTag !== currentElementTag) {
      runningInnerHtml = "";
    }

    if (activeTag) {
      runningInnerHtml += nextTranscript + " ";
      if (runningInnerHtml.trim().length && currentElement) {
        currentElement.innerHTML = runningInnerHtml.trim();
      }
    }
  };

  recognition.onspeechend = function () {
    recognition.stop();
  };

  recognition.onerror = function (event) {
    console.log("Error occurred in recognition: " + event.error);
  };
}

poseDetection();
listener();

function setupGui(cameras, net) {
  guiState.net = net;

  if (cameras.length > 0) {
    guiState.camera = cameras[0].deviceId;
  }
}

function isMobile() {
  return (
    /Android/i.test(navigator.userAgent) ||
    /iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

async function setupCamera(videoId) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw "Browser API navigator.mediaDevices.getUserMedia not available";
  }

  const video = document.getElementById(videoId);
  video.width = videoWidth;
  video.height = videoHeight;

  const mobile = isMobile();
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight,
    },
  });

  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo(videoId) {
  const video = await setupCamera(videoId);
  video.play();
  return video;
}

function toTuple({ y, x }) {
  return [y, x];
}

function drawSegment([ay, ax], [by, bx], ctx, scale) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = guiState.skeleton.lineWidth;
  ctx.strokeStyle = guiState.skeleton.color;
  ctx.stroke();
}

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    if (keypoint.score < minConfidence) continue;
    const { y, x } = keypoint.position;
    ctx.beginPath();
    ctx.arc(x * scale, y * scale, guiState.skeleton.pointRad, 0, 2 * Math.PI);
    ctx.fillStyle = guiState.skeleton.color;
    ctx.fill();
  }
}

function drawSkeleton(keypoints, minConfidence, ctx) {
  const scale = 1;
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      ctx,
      scale
    );
  });
}

function handleVideoFrame(poses) {
  let webPageUpdated = false;
  const keypoints = poses?.[0]?.keypoints ?? [];

  const validKeypoints = [];
  for (const i in keypoints) {
    const keypoint = keypoints[i];
    const label = document.getElementById(keypoint.part);
    if (!label) continue;
    if (keypoint.score < 0.5) {
      label.innerHTML = "";
      continue;
    }
    label.innerHTML = `${parseInt(keypoint.position.x)}, ${parseInt(
      keypoint.position.y
    )}`;
    validKeypoints.push(keypoint);
  }

  const positions = {
    rightWrist: def,
    leftWrist: def,
  };
  for (const i in validKeypoints) {
    const keypoint = validKeypoints[i];
    positions[keypoint.part] = [keypoint.position.x, keypoint.position.y];
  }

  const activeTagDisplay = document.getElementById("active-tag");
  const elementChecks = [
    ["h1", isH1],
    ["h2", isH2],
    ["h3", isH3],
    ["p", isP],
    ["img", isImg],
    ["marquee", isMarquee],
    ["ul", isUl],
    ["ol", isOl],
    ["li", isLi],
  ];

  const parentChild = {
    ul: "li",
    ol: "li",
  };

  let foundValidPosition = false;
  let currentElement = document.getElementById("current-element");
  let currentElementTag = currentElement?.tagName?.toLowerCase();

  let newlyActive = false;
  for (let i in elementChecks) {
    const [tag, fn] = elementChecks?.[i];
    if (fn(positions)) {
      foundValidPosition = true;
      activeTagLastUpdated = new Date().getTime();
      activeTagDisplay.innerHTML = `&lt;${tag.toUpperCase()}&gt;`;
      canvas.style.borderColor = isActive ? "LawnGreen" : "Yellow";
      if (activeTag !== tag) {
        newlyActive = true;
      }
      activeTag = tag;

      if (isActive) {
        const currentElementNotActive =
          !!currentElementTag && currentElementTag !== activeTag;
        if (currentElementNotActive) {
          if (
            currentElement.innerHTML === "" &&
            currentElement.tagName.toLowerCase() !== "img"
          ) {
            // console.log(
            //   "🔮 removing empty current element",
            //   currentElement.tagName
            // );
            currentElement.remove();
          } else {
            // console.log("🔮 deactivating current element", currentElementTag);
            // console.log("current content:", currentElement.innerHTML);
            webPage.innerHTML =
              webPage.innerHTML.replaceAll(' id="current-element"', "") +
              spacer;
            runningInnerHtml = "";
          }
          currentElement = undefined;
          currentElementTag = undefined;
          webPageUpdated = true;
        }

        const validForInnerHtml = ["h1", "h2", "h3", "p", "li", "marquee"];
        const selfClosing = ["img"];

        if (!currentElementTag) {
          // console.log("🔮 no current element adding as current:", activeTag);
          let appendParent = webPage;
          const lastElement = webPage.lastElementChild;
          const lastElementTag = lastElement?.tagName?.toLowerCase();
          const childIfParent = parentChild[lastElementTag];

          if (childIfParent === activeTag) {
            appendParent = lastElement;
          } else {
            if (
              !selfClosing.includes(lastElementTag) &&
              lastElement?.innerHTML === ""
            ) {
              lastElement?.remove();
            }
          }

          const isSelfClosing = selfClosing.includes(activeTag);
          const setCurrent =
            validForInnerHtml.includes(activeTag) || isSelfClosing;
          const currentElementIdProperty = setCurrent
            ? ` id="current-element"`
            : "";
          const elementHtml = `<${activeTag}${currentElementIdProperty}${
            isSelfClosing ? "/ " : ""
          }>${isSelfClosing ? "" : `</${activeTag}>`}`;
          const lastElementOfParent = appendParent.lastElementChild;
          const lastElementOfParentTag =
            lastElementOfParent?.tagName?.toLowerCase();
          if (lastElementOfParentTag === activeTag && !newlyActive) {
            break;
          }
          if (
            lastElementOfParent?.innerHTML !== "" ||
            !lastElementOfParent ||
            selfClosing.includes(lastElementOfParentTag)
          ) {
            appendParent.innerHTML += elementHtml;
          }

          // console.log("🔮 current source:", webPage.innerHTML);
          currentElement = document.getElementById("current-element");

          if (activeTag === "img") {
            if (!currentElement?.src) {
              getDogImage().then((url) => {
                currentElement.src = url;
                currentElement.style.maxWidth = "100%";
                currentElement.style.maxHeight = "300px";
                webPage.innerHTML =
                  webPage.innerHTML.replaceAll(' id="current-element"', "") +
                  spacer;
                runningInnerHtml = "";
              });
            }
          }
          webPageUpdated = true;
        }
      }

      break;
    }
  }
  const nowMs = new Date().getTime();
  if (
    !foundValidPosition &&
    nowMs - activeTagLastUpdated > activeTagTimeoutMs
  ) {
    activeTagDisplay.innerHTML = "&nbsp;";
    canvas.style.borderColor = "black";
    activeTag = null;

    if (currentElement) {
      if (
        currentElement.innerHTML === "" &&
        currentElement.tagName.toLowerCase() !== "img"
      ) {
        // console.log(
        //   "😻 removing empty current element",
        //   currentElement.tagName
        // );
        currentElement.remove();
      } else {
        // console.log("😻 deactivating current element", currentElementTag);
        // console.log("current content:", currentElement.innerHTML);
        webPage.innerHTML =
          webPage.innerHTML.replaceAll(' id="current-element"', "") + spacer;
        runningInnerHtml = "";
      }

      webPageUpdated = true;
    }
  }

  if (true || webPageUpdated) {
    webPageSource.innerHTML = escapeHTML(webPage.innerHTML);
  }
}

const hozS = 90;
const hozE = 210;
const hozMiS = 110;
const hozMiE = 190;
const verS = 70;
const verE = 180;

function inTopRCorner([x, y]) {
  return x > hozE && y < verS;
}

function inTopLCorner([x, y]) {
  return x < hozS && y < verS;
}

function inBottomRCorner([x, y]) {
  return x > hozE && y > verE;
}

function inBottomLCorner([x, y]) {
  return x < hozS && y > verE;
}

function inMiddleTop([x, y]) {
  return x > hozMiS && x < hozMiE && y < verS;
}

function inMiddleBot([x, y]) {
  return x > hozMiS && x < hozMiE && y > verE;
}

function isH1({ rightWrist, leftWrist }) {
  return inTopRCorner(rightWrist) && inTopLCorner(leftWrist);
}

function isH2({ rightWrist, leftWrist }) {
  return inMiddleTop(rightWrist) && inMiddleTop(leftWrist);
}

function isH3({ rightWrist, leftWrist }) {
  return inMiddleBot(rightWrist) && inMiddleBot(leftWrist);
}

function isP({ rightWrist, leftWrist }) {
  return inBottomRCorner(rightWrist) && inBottomLCorner(leftWrist);
}

function isImg({ rightWrist, leftWrist }) {
  return inTopRCorner(rightWrist) && inBottomLCorner(leftWrist);
}

function isMarquee({ rightWrist, leftWrist }) {
  return inBottomRCorner(rightWrist) && inTopLCorner(leftWrist);
}

function isUl({ rightWrist, leftWrist }) {
  return (
    (inTopLCorner(rightWrist) && inBottomLCorner(leftWrist)) ||
    (inTopLCorner(leftWrist) && inBottomLCorner(rightWrist))
  );
}

function isOl({ rightWrist, leftWrist }) {
  return (
    (inTopRCorner(rightWrist) && inBottomRCorner(leftWrist)) ||
    (inTopRCorner(leftWrist) && inBottomRCorner(rightWrist))
  );
}

function isLi({ rightWrist, leftWrist }) {
  return (
    (inMiddleTop(rightWrist) && inMiddleBot(leftWrist)) ||
    (inMiddleBot(rightWrist) && inMiddleTop(leftWrist))
  );
}

viewSourceButton.onclick = (_event) => {
  webPageSource.innerHTML = escapeHTML(webPage.innerHTML);
  webPage.parentElement.style.display = "none";
  webPageSource.parentElement.style.display = "block";
};

closeViewSourceButton.onclick = (_event) => {
  webPageSource.parentElement.style.display = "none";
  webPage.parentElement.style.display = "block";
};

function escapeHTML(html) {
  return html
    .replaceAll(spacer, "#LINEBREAK#")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("/", "&#47;")
    .replaceAll("#LINEBREAK#", "<br />");
}

async function getDogImage() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();
  return data.message;
}
