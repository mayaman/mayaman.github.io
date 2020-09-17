const canvasScale = 34;
const canvasWidth = 18 * canvasScale;
const canvasHeight = 24 * canvasScale;
let poster;
let colors = [];
let backgroundColor;

const borderWidth = 5;
const places = ['Fort Greene', 'Chelsea', 'Park Slope', 'Taipei', 'Mountain View', 'Tel Aviv', 'Seattle', 'Orcus Island', 'Las Vegas', 'Mojave Desert', 'Beacon', 'Avon', 'Boston', 'Gramercy', 'Salt Lake City', 'Black Rock City', 'Poughkeepsie', 'Catskills', 'Tokyo', 'Kyoto', 'Bangkok', 'Chiang Mai', 'Fort Greene']
let placeIndex = 0;
let startedDrawing = false;

function preload() {
  poster = loadImage('./Isaac.png');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  backgroundColor = color(252);
  background(backgroundColor);
  imageMode(CENTER);
  image(poster, width / 2, height / 2, canvasWidth, canvasHeight);
}

function draw() {
  stroke(255);
  strokeWeight(3);
  if (startedDrawing && !mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mouseReleased() {
  if (placeIndex < places.length) {
    startedDrawing = true;
    // Place Name
    stroke(255);
    fill(255);
    strokeWeight(0.5);
    textAlign(CENTER);
    textSize(12);
    text(places[placeIndex], mouseX, mouseY - 15);

    // Circle
    noStroke();
    ellipse(mouseX, mouseY, 10, 10);

    placeIndex++;
    if (placeIndex >= places.length) {
      startedDrawing = false;
    }
  }
}


