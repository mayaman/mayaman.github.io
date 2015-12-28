function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(89, 89, 89);
  frameRate(2);
}

function draw() {
  noStroke();
  // background(89, 89, 89, 20);
  fill(random(255), random(255), random(255));
  rect(random(0, width), random(0, height), random(0, 200), random(0, 200));
  fill(random(255), random(255), random(255));
  rect(random(0, width), random(0, height), random(0, 200), random(0, 200));
}

function mouseClicked() {
  fill(0);
  textSize(100);
  text("?", mouseX-30, mouseY);
}