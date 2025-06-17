var delayTime = 100;

var customCheckbox = document.getElementById("custom-checkbox");
var realCheckbox = document.getElementById("checkbox");
var nameField = document.getElementById("name");
var submitButton = document.getElementById("submit");
var imagesPopup = document.getElementById("images");
var bag = document.getElementById("bubble-arrow-grey");
var baw = document.getElementById("bubble-arrow-white");
var tryAgain = document.getElementById("try-again");
var alertBox = document.getElementById("alert");
var checkboxAlert = document.getElementById("checkbox-alert");
var nameAlert = document.getElementById("name-alert");
var captchaContainer = document.getElementById("captcha-container");
var nameContainer = document.getElementById("name-container");
var robotsList = document.getElementById("confirmed-robots-section");
var dow = document.getElementById("dow");

function handleRobotClick(e) {
  var inputCheckbox = document.getElementById("checkbox");
  var check = document.getElementById("check");
  if (!inputCheckbox.checked) {
    inputCheckbox.checked = true;
    check.style.display = "block";
  }
}

function handleRobotSubmit(e) {
  var checkedValue = realCheckbox.checked;
  var nameValue = nameField.value != "";
  console.log("Checked? " + checkedValue);
  console.log("Name? " + nameValue);
  if (!(checkedValue && nameValue)) {
    e.preventDefault();
    if (!checkedValue) {
      checkboxAlert.style.display = "block";
      captchaContainer.style.border = "1px solid red";
    }
    if (!nameValue) {
      nameAlert.style.display = "block";
      nameContainer.style.border = "1px solid red";
    }
  }
}

function isNotRobot() {
  customCheckbox.removeEventListener("click", handleRobotClick);
  //submitButton.removeEventListener("click", handleRobotSubmit);
  customCheckbox.addEventListener("click", handleNotRobotClick);
}

function handleNotRobotClick(e) {
  var images = [
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r12.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r13.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r18.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r15.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r17.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r11.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r9.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r10.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r14.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r16.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r8.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r5.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r7.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r2.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r6.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r4.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r3.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r1.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r20.jpeg",
    "/please-confirm-you-are-a-robot/images/a5e521be-edd4-433c-885e-f2d838d40fbf_r19.jpeg",
  ];

  var thumbnailsHTML = "";
  var usedImages = [];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dow.innerHTML = days[Math.floor(Math.random() * days.length)];
  for (var i = 0; i < 9; i++) {
    var randomIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
    if (usedImages.indexOf(randomIndex) === -1) {
      thumbnailsHTML += '<img src="' + images[randomIndex] + '" />';
      usedImages.push(randomIndex);
    } else {
      i--;
    }
  }

  document.getElementById("images-thumbnails").innerHTML = thumbnailsHTML;

  imagesPopup.style.display = "block";
  robotsList.style.bottom = "20px";
  bag.style.display = "block";
  baw.style.display = "block";
  setTimeout(function () {
    imagesPopup.style.display = "none";
    robotsList.style.bottom = "187px";
    bag.style.display = "none";
    baw.style.display = "none";
    alertBox.style.display = "block";
  }, 300);
}

function hideAlert(e) {
  alertBox.style.display = "none";
  robotsList.style.bottom = "0px";
}

customCheckbox.addEventListener("click", handleRobotClick);
submitButton.addEventListener("click", handleRobotSubmit);
tryAgain.addEventListener("click", hideAlert);
setTimeout(isNotRobot, delayTime);

var xhr = new XMLHttpRequest();
xhr.open("GET", "/please-confirm-you-are-a-robot/get-robots");
xhr.onload = function () {
  if (xhr.status === 200) {
    var robotNameData = xhr.responseText;
    var robotNameObject = JSON.parse(robotNameData);
    console.log(robotNameObject);
    for (var i in robotNameObject) {
      robots.addNewRobot(robotNameObject[i].name);
    }
  } else {
    alert("Request failed.  Returned status of " + xhr.status);
  }
};
xhr.send();

var robots = new Vue({
  el: "#confirmed-robots",
  data: {
    defaultText: "No confirmed robots",
    robots: [],
  },
  methods: {
    addNewRobot: function (name) {
      this.robots.push({
        name: name,
      });
    },
  },
});
