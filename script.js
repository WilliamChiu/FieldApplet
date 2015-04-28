var netForcesX = [];
var netForcesY = [];
var netAngle = [];
var magnitude = [];
var charges = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  charges.push(int(height / 2) * width + (width / 2));
  ellipse(charges[0] % width, charges[0] / width, 5, 5);
}

function calculateField() {
  for (var temp = 0; temp < width; temp++) {
    for (var considerCharges = 0; considerCharges < charges.length; considerCharges++) {
      var changeinY = ((charges.get(considerCharges) / width) - (temp / width));
      var changeinX = (charges.get(considerCharges) % width) - (temp % width);
      changeinX *= -1; // Flippy
      //println(changeinX + " " + changeinY);
      var distance = sqrt(sq(changeinX) + sq(changeinY));
    }
  }
}

window.onload = function() {
  document.getElementById("defaultCanvas").style.width = "100%";
  document.getElementById("defaultCanvas").style.height = "100%";
}
