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
  calculateField();
}

function draw() {
  
}

function calculateField() {
  for (var temp = 0; temp < width; temp++) {
    for (var considerCharges = 0; considerCharges < charges.length; considerCharges++) {
      var changeinY = ((charges.get(considerCharges) / width) - (temp / width));
      var changeinX = (temp % width) - (charges.get(considerCharges) % width);
      var force = 1 / sqrt(sq(changeinX) + sq(changeinY));
      var angle = atan(abs(changeinY) / abs(changeinX));
      if (changeinX > 0) netForcesX[temp] += force * cos(angle);
      else netForcesX[temp] -= force * cos(angle);
      if (changeinY > 0) netForcesY[temp] += force * sin(angle);
      else netForcesY[temp] -= force * sin(angle);
    }
    var angle = atan(abs(netForcesX[temp]) / abs(netForcesY[temp]));
    if (netForcesX[temp] < 0) {
      if (netForcesY[temp] < 0) {
        angle += PI;
      }
      else angle = PI - angle;
    }
    else if (netForcesY[temp] < 0) angle = TWO_PI - angle;
    netAngle[temp] = angle;
    magnitude[temp] = sqrt(sq(netForcesX[temp]) + sq(netForcesY[temp]));
  }
}

window.onload = function() {
  document.getElementById("defaultCanvas").style.width = "100%";
  document.getElementById("defaultCanvas").style.height = "100%";
}
