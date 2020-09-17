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

let letterPaths = ['G', 'o_red', 'o_yellow', 'g_lower', 'l', 'e'];
let letterImages = [];
let letterOffsets = [0, 10, 10, 20, 0, 10];
let xOffsets = [-10, 0, 0, -10, 20, 200];
let letters = [];

function preload() {
  for (l = 0; l < letterPaths.length; l++) {
    letterImages.push(loadImage('./assets/' + letterPaths[l] + '.png'));
  }
  logo = loadImage('./assets/G.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(255);
  frameRate(60);

  strokeWeight(20);
  stroke(0, 100);

  x = width / 2;
  y = height / 2;
  x2 = x;
  y2 = y;

  let xOffset = 0;
  for (l = 0; l < letterPaths.length; l++) {
    
    letters.push(new Letter(letterImages[l], width / 4 + xOffset, height / 2, letterOffsets[l]));
    // letters.push(new Letter(letterImages[l], random(width/4) + xOffset, random(height), letterOffsets[l]));

    xOffset+= letterImages[l].width/6 + 500 + xOffsets[l];
    console.log(xOffsets[l]);
  }
}

function draw() {
  background(255);
  imageMode(CENTER);

  // dragSegment(0, mouseX, mouseY);
  // for (let i = 0; i < x.length - 1; i++) {
  //   dragSegment(i + 1, x[i], y[i]);
  // }

  for (l = 0; l < letters.length; l++) {
    letters[l].update();
  }
}

class Letter {
  constructor(image, x, y, yOffset) {
    this.sourceX = x;
    this.yOffset = yOffset;
    this.sourceY = y + this.yOffset;
    this.x = this.sourceX;
    this.y = this.sourceY;
    this.x2 = x;
    this.y2 = y;
    this.width = image.width;
    this.height = image.height;
    this.img = image;

    this.offset = 25;
  }

  update() {
    const offset = 100;
    let hit = collidePointRect(mouseX, mouseY, this.sourceX - offset, this.sourceY - offset, this.img.width / 6 + offset*2, this.img.height / 6 + offset*2); //see if the mouse is in the rect
    // if (hit) {
    //   this.dragSegment()
    // } else {
    //   image(this.img, this.sourceX, this.sourceY, this.img.width / 6, this.img.height / 6);
    // }

    this.dragSegment();
    // image(this.img, this.sourceX, this.sourceY, this.img.width / 6, this.img.height / 6);

  }

  dragSegment() {
    this.x2 = mouseX;
    this.y2 = mouseY;
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let angle1 = atan2(dy, dx);

    let tx = mouseX - cos(angle1) * segLength;
    let ty = mouseY - sin(angle1) * segLength;
    dx = tx - this.x2;
    dy = ty - this.y2;
    let angle2 = atan2(dy, dx);
    this.x = this.x2 + cos(angle2) * segLength;
    this.y = this.y2 + sin(angle2) * segLength;

    let scale = this.y/50;

    image(this.img, this.x, this.y, this.img.width / 6, this.img.height / 6);
    // image(this.img, this.sourceX, this.sourceY, this.img.width / scale, this.img.height /scale);

  }
}

