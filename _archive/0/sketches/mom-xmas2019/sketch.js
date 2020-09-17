const canvasScale = 34;
const canvasWidth = 18 * canvasScale;
const canvasHeight = 24 * canvasScale;
let poster;
let colors = [];
let backgroundColor;

const borderWidth = 5;


function preload() {
  poster = loadImage('./Mom.png');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  backgroundColor = color(252);
  background(backgroundColor);
  imageMode(CENTER);
  image(poster, width/2, height/2, canvasWidth, canvasHeight);
}

function draw() {
  stroke(0);
  strokeWeight(8);
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}


