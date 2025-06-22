var selectedEmoji = false;
var blank = false;

var emoji = [];
var count = 0;
var valid = false;

const hash = location.hash;
const query = hash
  ? hash
      .slice(1, hash.length)
      .split("&")
      .map((i) => i.split("="))
  : null;

if (query?.length > 0) {
  valid = true;
}

console.log(query?.length, valid, query, JSON.stringify(query));

for (const [k, v] of query ?? []) {
  if (k === "no" && v === "emojis") {
    blank = true;
    break;
  }
}

if (blank) {
  emoji = [];
} else if (valid) {
  for (const [k, v] of query ?? []) {
    if (v >= 0 && v <= allEmoji.length) {
      emoji.push(allEmoji[v]);
    }
    form = false;
  }
} else {
  emoji = allEmoji;
}

var previousInput = "";
var emojiInput = document.getElementById("emoji-input");
if (emojiInput) {
  emojiInput.addEventListener("input", function (evt) {
    if (
      this.value[this.value.length - 1] != "\n" &&
      this.value.length > previousInput.length
    ) {
      this.value = this.value + "\n";
    }
    previousInput = this.value;
  });
}

var submitButton = document.getElementById("submit-button");
if (submitButton) {
  submitButton.addEventListener(
    "click",
    function () {
      generateNew();
    },
    false
  );
}

var hideButton = document.getElementById("hide-link");
if (hideButton) {
  hideButton.addEventListener(
    "click",
    function () {
      document.getElementById("to-form").style.display = "none";
    },
    false
  );
}

function moreEmojis() {
  var yMaxBody = document.documentElement.clientHeight + 700;
  var xMaxBody = document.documentElement.clientWidth + 100;
  var yMaxWindow = window.innerHeight;
  +100;
  var xMaxWindow = window.innerWidth;
  +100;

  var xMax = xMaxBody > xMaxWindow ? xMaxBody : xMaxWindow;
  var yMax = yMaxBody > yMaxWindow ? yMaxBody : yMaxWindow;
  // console.log("BODY: " + yMaxBody + "   ___ WINDOW: " + yMaxWindow);
  document.getElementById("container").style.width = xMax;
  document.getElementById("container").style.height = yMax;

  var x = Math.floor(Math.random() * xMax) - 50;
  var y = Math.floor(Math.random() * yMax) - 50;
  var size = Math.floor(Math.random() * 400) + 100;
  if (!selectedEmoji) {
    selectedEmoji = emoji;
  }
  var em = selectedEmoji[Math.floor(Math.random() * selectedEmoji.length)];
  var e = document.createElement("div");
  e.className = "emoji";
  e.setAttribute(
    "style",
    "top: " + y + "px; left: " + x + "px; font-size: " + size + "%;"
  );
  e.textContent = em;
  document.body.appendChild(e);
}

function generateNew() {
  var emojiInput = document
    .getElementById("emoji-input")
    .value.split(/[\n\r\s]+/);
  var q = "#";
  var c = 0;
  for (var e in emojiInput) {
    var nextEmoji = emoji.indexOf(emojiInput[e]);
    if (nextEmoji >= 0) {
      q += c++ + "=" + nextEmoji + "&";
    }
  }
  q = q.slice(0, -1);
  window.location = "https://doodles.patrickweaver.net/emojiwallpaper" + q;
}

if (!blank) {
  window.setInterval(function () {
    moreEmojis();
  }, 5);
}
