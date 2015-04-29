var charges = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  charges.push(int(height / 2) * width + (width / 2));
  stroke(255);
  strokeWeight(0.5);
  noSmooth();
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
  print(mouseX);
  newline(mouseX, mouseY, mouseX + int(magnitude * cos(netAngle)), mouseY - int(magnitude * sin(netAngle)));
  newline(mouseX + int(magnitude * cos(netAngle)), mouseY - int(magnitude * sin(netAngle)), mouseX + int(magnitude * cos(netAngle + 40) * 4 / 5), mouseY - int(magnitude * sin(netAngle + 40) * 4 / 5));
  newline(mouseX + int(magnitude * cos(netAngle)), mouseY - int(magnitude * sin(netAngle)), mouseX + int(magnitude * cos(netAngle - 40) * 4 / 5), mouseY - int(magnitude * sin(netAngle - 40) * 4 / 5));
  }
}

window.onload = function() {
  document.documentElement.style.overflow = 'hidden';
}

function newline(x0, y0, x1, y1){
   var dx = Math.abs(x1-x0);
   var dy = Math.abs(y1-y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx-dy;

   while(true){
     point(x0,y0);  // Do what you need to for this

     if ((x0==x1) && (y0==y1)) break;
     var e2 = 2*err;
     if (e2 >-dy){ err -= dy; x0  += sx; }
     if (e2 < dx){ err += dx; y0  += sy; }
   }
}
