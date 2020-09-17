let canvasSize = 800;
let cursor;

let system;
// let x = 1;
// let y = 1;
let easing = 0.05;
const borderWidth = 5;

let segLength = 200,
  x,
  y,
  x2,
  y2;


function preload() {
  logo = loadImage('./assets/Google.png');
  cursor = loadImage('./cursor.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(255);
  frameRate(60);

  strokeWeight(20);
  stroke(0, 100);

  x = width/2;
  y = height/2;
  x2 = x;
  y2 = y;
}

function draw() {
  background(255);
  imageMode(CENTER);

  dragSegment(0, mouseX, mouseY);
  for (let i = 0; i < x.length - 1; i++) {
    dragSegment(i + 1, x[i], y[i]);
  }
}


function dragSegment(i, xin, yin) {
  x2 = mouseX;
  y2 = mouseY;
  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);

  tx = mouseX - cos(angle1) * segLength;
  ty = mouseY - sin(angle1) * segLength;
  dx = tx - x2;
  dy = ty - y2;
  angle2 = atan2(dy, dx);
  x = x2 + cos(angle2) * segLength;
  y = y2 + sin(angle2) * segLength;

  image(logo, x, y, logo.width/6, logo.height/6);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}

class Letter {
  constructor(image, x, y) {
    this.sourceX = x;
    this.sourceY = y;
    this.x = x;
    this.y = y;
    this.x2 = x;
    this.y2 = y;
    this.width = image.width;
    this.height = image.height;
  }

  update() {
    dragSegment()
  }
}

