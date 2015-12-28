var x = 0;
var cleared = false;
var started = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
  textSize(50);
  textAlign(CENTER);
  textFont("Georgia");
  text("click and move to start", windowWidth/2, windowHeight/5);
}


function draw() {
  if (x > 0) {
  strokeWeight(4);
  line(pmouseX, pmouseY, mouseX, mouseY);
  line(pmouseX, pmouseY + 10, mouseX, mouseY+10);
  line(pmouseX, pmouseY + 20, mouseX, mouseY+20);
  line(pmouseX, pmouseY + 30, mouseX, mouseY+30);
  }
}

function mouseClicked() {
  clear();
  x = 1;
  started = true;
}

function mouseMoved() {
  if (!cleared && started) {
  text("click to clear", windowWidth/2, windowHeight/5);
  cleared = true;
  }
}

