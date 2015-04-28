var netForcesX = [];
var netForcesY = [];
var netAngle = [];
var magnitude = [];
var charges = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  charges.push((height / 2) * width + (width / 2));
  ellipse(charges[0] % width, charges[0] / width, 5, 5);
}

window.onload = function() {
  document.getElementById("defaultCanvas").style.width = "100%";
  document.getElementById("defaultCanvas").style.height = "100%";
}
