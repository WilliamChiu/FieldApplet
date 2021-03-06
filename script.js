var charges = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    charges.push(int(height / 2) * width + (width / 2));
    stroke(255);
    strokeWeight(0.5);
    newellipse(charges[0] % width, charges[0] / width, 8, 8);
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
            } else angle = PI - angle;
        } else if (netForcesY < 0) angle = TWO_PI - angle;
        netAngle = angle;
        magnitude = sqrt(sq(netForcesX) + sq(netForcesY));
        //print(mouseX);
        if (magnitude > 0) {
            stroke(256 - pow(1.05, -magnitude + 103.5));
            newline(mouseX, mouseY, mouseX + int(magnitude * cos(netAngle)), mouseY - int(magnitude * sin(netAngle)));
            newline(mouseX + int(magnitude * cos(netAngle)), mouseY - int(magnitude * sin(netAngle)), mouseX + int(magnitude * cos(netAngle + PI / 64) * 9 / 10), mouseY - int(magnitude * sin(netAngle + PI / 64) * 9 / 10));
            newline(mouseX + int(magnitude * cos(netAngle)), mouseY - int(magnitude * sin(netAngle)), mouseX + int(magnitude * cos(netAngle - PI / 64) * 9 / 10), mouseY - int(magnitude * sin(netAngle - PI / 64) * 9 / 10));
        }
    }
}

function keyPressed() {
    if (key === ' ') {
        placeCharge();
    }
    else if (keyCode == UP_ARROW) {
        background(100);
        for (var considerCharges = 0; considerCharges < charges.length; considerCharges++) {
            newellipse(charges[considerCharges] % width, charges[considerCharges] / width, 8, 8);
        }
    }
}

function placeCharge() {
    charges.push(mouseY * width + mouseX);
    background(100);
    for (var considerCharges = 0; considerCharges < charges.length; considerCharges++) {
        newellipse(charges[considerCharges] % width, charges[considerCharges] / width, 8, 8);
    }
}

window.onload = function() {
    document.documentElement.style.overflow = 'hidden';
    document.getElementById("defaultCanvas").style.imageRendering = "pixelated";
}

function newline(x0, y0, x1, y1) {
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;

    while (true) {
        point(x0, y0); // Do what you need to for this

        if ((x0 == x1) && (y0 == y1)) break;
        var e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function newellipse(x0, y0, x1, y1) {
    for (var tempW = x0 - (x1 / 2); tempW <= x0 + (x1 / 2); tempW++) {
        for (var tempH = y0 - (y1 / 2); tempH <= y0 + (y1 / 2); tempH++) {
            if (sqrt(sq((tempW - x0) / (x1 / 2)) + sq((tempH - y0) / (y1 / 2))) < 1.0) {
                point(tempW, tempH);
            }
        }
    }
}
