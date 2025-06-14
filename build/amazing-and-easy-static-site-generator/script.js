var c = document.getElementById("static");
var ctx = c.getContext("2d");
var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
c.width = vw;
c.height = vh;

for (var i = 0; i < vw; i++) {
  for (var j = 0; j < vh; j++) {
    var m = Math.random();
    var color = m < .2 ? "#000" : (m < .4 ? "#444" : (m < .6 ? "#888" : (m < .8 ? "#BBB" : "#fff")));
    //console.log(color);
    ctx.fillStyle = color;
    ctx.fillRect(i, j, 1, 1)
  }
}