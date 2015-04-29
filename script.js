var charges = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  charges.push(int(height / 2) * width + (width / 2));
  stroke(255);
  strokeWeight(0.5);
  this.drawingContext.mozImageSmoothingEnabled=!1;
  this.drawingContext.ImageSmoothingEnabled=!1;
  ellipse(charges[0] % width, charges[0] / width, 5, 5);
}

function draw() {
  if (mouseIsPressed) {
  var temp = int(mouseY * width + mouseX);
  netForcesX = 0;
  netForcesY = 0;
  netAngle = 0;
  magnitude = 0;
  for (var considerCharges = 0; considerCharges < charges.length; considerCharges++) {
    var changeinY = ((charges[considerCharges] / width) - (temp / width));
    var changeinX = (temp % width) - (charges[considerCharges] % width);
    var force = 1000 / sqrt(sq(changeinX) + sq(changeinY));
    var angle = atan(abs(changeinY) / abs(changeinX));
    if (changeinX > 0) netForcesX += force * cos(angle);
    else netForcesX -= force * cos(angle);
    if (changeinY > 0) netForcesY += force * sin(angle);
    else netForcesY -= force * sin(angle);
  }
  var angle = atan(abs(netForcesY) / abs(netForcesX));
  if (netForcesX < 0) {
    if (netForcesY < 0) {
      angle += PI;
    }
    else angle = PI - angle;
  }
  else if (netForcesY < 0) angle = TWO_PI - angle;
  netAngle = angle;
  magnitude = sqrt(sq(netForcesX) + sq(netForcesY));
  print(netForcesX);
  line(mouseX, mouseY, mouseX + magnitude * cos(netAngle), mouseY - magnitude * sin(netAngle));
  }
}

window.onload = function() {
  document.documentElement.style.overflow = 'hidden';
}
