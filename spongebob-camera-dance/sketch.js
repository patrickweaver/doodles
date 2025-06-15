

//const size1Keypoint = document.getElementById('size1');
//const size2Keypoint = document.getElementById('size2');


const parts = [
	'nose',
	'leftEye',
	'rightEye',
	'leftEar',
	'rightEar',
	'leftShoulder',
	'rightShoulder',
	'leftElbow',
	'rightElbow',
	'leftWrist',
	'rightWrist',
	'leftHip',
	'rightHip',
	'leftKnee',
	'rightKnee',
	'leftAnkle',
	'rightAnkle'
]

var state = {}

for (var i in parts) {
  const part = parts[i];
  
  // Get HTML elements that take form input:
  window[part + 'PartColor'] = document.getElementById(part + 'PartColor');
  window[part + 'Image'] = document.getElementById(part + 'Image');
  window[part + 'PartColor'].addEventListener('change', (event) => {
    console.log(window[part + 'PartColor'].id, "New NPG Value:", window[part + 'PartColor'].value, hexToRGB(window[part + 'PartColor'].value))
  })
  
  var leftSelect = document.getElementById(part + 'Left');
  var rightSelect = document.getElementById(part + 'Right');
  
  var selects = [leftSelect, rightSelect]
  
  /*
  for (var m in parts) {
    for (var n in selects) {
      var node = document.createElement("option");
      node.value = parts[m]
      var textnode = document.createTextNode(parts[m]);
      node.appendChild(textnode);
      selects[n].appendChild(node)
    }
  }
  */
  
  
  // Make a state object for each part
  state[part] = {
    top: 0,
    left: 0,
    size: 250
  }
}



var canvas = document.getElementById('ghosts'),
context = canvas.getContext('2d');

let video;
let poseNet;
let poses = [];

function setup() {
  

  context.fillStyle = "black";
  context.fillRect(0, 0, 640, 480);
  
  
  
  var videoCanvas = createCanvas(320, 240);
  videoCanvas.parent('ghost-canvas');
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // This function draws keypoints on the video feed
  // and sets the new position of the ghost
  drawKeypoints();
  
  // This function draws the ghost in the new position
  make_base()
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    
    var leftX = 0;
    var rightX = 0;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      
      /* Draw dots on the video feed: */
      
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      
      
      //&& window[keypoint.part + 'Image'].value != ""
      if (keypoint.score > 0.2 ) {
        
        // Default dot color
        var rgb = [255,0,0];
        rgb = hexToRGB(window[keypoint.part + 'PartColor'].value)
        fill(...rgb)
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
    
    /* Find the position of where to place the image: */
    
    //var part = "nose";
    
    
    /* Reimplement size finding here */
    
    /*
            if (keypoint.position.x != 0 && rightX != 0) {
          ghost1Pos.size = leftX - rightX;
        }
        state[keypoint.part].left
        
    */
    
    for (var j in parts) {

      var part = parts[j];
      
      if (
        poses[0] && poses[0].pose && poses[0].pose[part] && poses[0].pose[part].confidence > 0.5
        && window[part + 'Image'].value != ""
      ) {
        var s = poses[0].pose[part];

        // Multiply position coordinates by 2 because ghost canvas is 2x larger than video.
        // Divide offset by 2 to place center of image on correct position.

        
        if (part === "nose") {
          state[part].left = (s.x * 2) - (state[part].size / 2)
          state[part].top = (s.y * 2) - (state[part].size / 2) + 200
          
        } else if (part.indexOf("Elbow") >= 0) {
          state[part].left = (s.x * 2) - (state[part].size / 2)
          state[part].top = (s.y * 2) - (state[part].size / 2) - 100
          
        } else {
          state[part].left = (s.x * 2) - (state[part].size / 2)
          state[part].top = (s.y * 2) - (state[part].size / 2)
        }
        
        
      } 
    }
  }
}


function make_base(){
  context.fillRect(0, 0, 640, 480);
  
  for (var k in parts) {
    var part = parts[k];
    var partState = state[part];
    var partImage = new Image();
    partImage.src = window[part + 'Image'].value;
    context.drawImage(partImage, partState.left, partState.top, partState.size, partState.size)
  }

}





function hexToRGB(hex) {
  var r, g, b;
  r = parseInt(hex.substring(1,3), 16);
  g = parseInt(hex.substring(3,5), 16);
  b = parseInt(hex.substring(5,7), 16);
  return [r,g,b];
}