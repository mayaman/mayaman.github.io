
var rects = [];
var letters = [];
var whiteMs = [];
var xOffset = 27;
var yOffset = 70;
var gridStrokeWeight = 1;

function setup() {
  var c = createCanvas(500, 500);

  c.parent('sketch1');

  // Row 1
  rects.push(new whiteRect(10, 20, 20, 110));
  rects.push(new whiteRect(width/3 + 10, 20, 32, 110));
  rects.push(new whiteRect(2*width/3 + 10, 20, 60, 110));

  // Row 2
  rects.push(new whiteRect(30, height/3 + 20, 125, 110));
  rects.push(new whiteRect(width/3 + 45, height/3 + 20, 115, 110));
  rects.push(new whiteRect(2*width/3 + 75, height/3 + 20, 80, 110));

  // Row 3
  rects.push(new whiteRect(width/24, 2*height/3 + 60, 125, 100));
  rects.push(new whiteRect(width/3 + width/24, 2*height/3 + 80, 125, 80));
  rects.push(new whiteRect(2*width/3 + width/24, 2*height/3 + 110, 125, 50));

  var mCoordinates = [
    [xOffset + width/6, height/6 + (yOffset)],
    [xOffset + 3*width/6, height/6 + (yOffset)],
    [xOffset + 5*width/6, height/6 + (yOffset)],
    [xOffset + width/6, 3*height/6 + (yOffset)],
    [xOffset + 3*width/6, 3*height/6 + (yOffset)],
    [xOffset + 5*width/6, 3*height/6 + (yOffset)],
    [xOffset + width/6, 5*height/6 + (yOffset)],
    [xOffset + 3*width/6, 5*height/6 + (yOffset)],
    [xOffset + 5*width/6, 5*height/6 + (yOffset)]
  ];

  for (var m = 0; m < 9; m++) {
    letters.push(new bigM(width, 0, mCoordinates[m][0], mCoordinates[m][1]));
  }

  background(255);
  frameRate(120);
}


function draw() {
  // background(255);

  // Border
  // stroke(0);
  // strokeWeight(2);
  // noFill();
  // rect(0, 0, width, height);


  fill(0);
  textSize(2*width/5);
  strokeWeight(5);
  textAlign(CENTER);

  var allFinished = true;
  for (var m = 0; m < letters.length; m++) {
    letters[m].display();
    if (!letters[m].arrived) {
      allFinished = false;
    }
  }

  for (var i = 0; i < rects.length; i++) {
    rects[i].display();
    if (allFinished) {
      rects[i].increaseStrokeWeight();
    }
  }

  if (allFinished) {
    // Grid
    strokeWeight(gridStrokeWeight);
    stroke(0);
    line(width/3, 0, width/3, height);
    line(2*width/3, 0, 2*width/3, height);
    line(0, height/3, width, height/3);
    line(0, 2*height/3, width, 2*height/3);
    if (gridStrokeWeight > 400) {
      whiteMs.push(new whiteM());
    } else {
      gridStrokeWeight+=2;
    }
  }

  for (var w = 0; w < whiteMs.length; w++) {
    // stroke(255);
    // fill(0);
    // textSize(80);
    // // Row 1
    // text('M', xOffset + width/6, height/6 + (yOffset));
    // text('M', xOffset + 3*width/6, height/6 + (yOffset));
    // text('M', xOffset + 5*width/6, height/6 + (yOffset));
    //
    // // Row 2
    // text('M', xOffset + width/6, 3*height/6 + (yOffset));
    // text('M', xOffset + 3*width/6, 3*height/6 + (yOffset));
    // text('M', xOffset + 5*width/6, 3*height/6 + (yOffset));
    //
    // // Row 3
    // text('M', xOffset + width/6, 5*height/6 + (yOffset));
    // text('M', xOffset + 3*width/6, 5*height/6 + (yOffset));
    // text('M', xOffset + 5*width/6, 5*height/6 + (yOffset));
    whiteMs[w].display();
  }

}

function mouseClicked() {

}

class whiteRect {
  constructor(xPos, yPos, w, h) {
    this.x = xPos;
    this.y = yPos;
    this.w = w;
    this.h = h;
    this.strokeWeight = 1;
  }

  display() {
    stroke(255);
    strokeWeight(this.strokeWeight);
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  increaseStrokeWeight() {
    this.strokeWeight++;
  }
}

class bigM {
  constructor(sX, sY, fX, fY) {
    this.currentX = sX;
    this.currentY = sY;
    this.finalX = fX;
    this.finalY = fY;
    this.arrived = false;
  }

  display() {
    var xFinished = (this.currentX < this.finalX);
    var yFinished = (this.currentY > this.finalY);
    if (!xFinished) {
      this.currentX-=1;
    }

    if (!yFinished) {
      this.currentY+=1;
    }

    if (xFinished && yFinished) {
      strokeWeight(5);
      fill(0);
      textSize(2*width/5);
      textAlign(CENTER);
      text('M', this.currentX, this.currentY);
      this.arrived = true;
    } else {
      strokeWeight(5);
      fill(0);
      textSize(2*width/5);
      textAlign(CENTER);
      text('M', this.currentX, this.currentY);
    }
  }
}

class whiteM {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 300);
    this.a = PI * random(0, 2);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255);
    textSize(this.size);
    push();
    translate(width / 2, height / 2);
    rotate(this.a);
    text('M', this.x, this.y);
    pop();
  }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  // width = windowWidth;
  // height = windowHeight;
}
