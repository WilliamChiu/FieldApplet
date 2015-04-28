var netForcesX = new Array(windowWidth * windowHeight);
var netForcesY = new Array(windowWidth * windowHeight);
var netAngle = new Array(windowWidth * windowHeight);
var magnitude = new Array(windowWidth * windowHeight);

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
}

window.onload = function() {
  document.getElementById("defaultCanvas").style.width = "100%";
  document.getElementById("defaultCanvas").style.height = "100%";
}
