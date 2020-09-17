const canvasScale = 34;
const canvasWidth = 18 * canvasScale;
const canvasHeight = 24 * canvasScale;
let poster;
let photoPathIndex = 1;
let maxNumPhotos = 15;
let photos = [];
let backgroundColor;
let centerLineY;

let growingText = true;
let shrinkText = false;
let pausing = false;

const borderWidth = 5;
const rate = 25;

let photoIndex = 0;
let pauseCount = 0;
let maxPauseCount = 60;
let currentRotation = 4.0;
let photoCount = 3847;
let increasedCount = false;


function preload() {
  poster = loadImage('./Dad_Base.png');
  for (let i = 1; i <= maxNumPhotos; i++) {
    photos.push(loadImage('./photos/' + i + '.jpg'));
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  backgroundColor = color(252);
  background(backgroundColor);
  centerLineY = 0;
  noStroke();
}

function draw() {
  background(255);
  const bounds = 20;


  // Base image
  imageMode(CORNER);
  image(poster, 0, 0, width + 2, height);


  // Photo Count
  textSize(100);
  strokeWeight(1);
  textFont('HelveticaNeue-CondensedBlack');
  stroke(0);
  fill(0);
  text(photoCount, bounds + 9, height - 142);

  // Photos
  const currentPhoto = photos[photoIndex];
  rectMode(CORNER);
  push();
  imageMode(CENTER);
  angleMode(DEGREES);
  rotate(currentRotation);
  if (pausing && pauseCount > (maxPauseCount - 15)) {
    if (!increasedCount) {
      increasedCount = true;
      photoCount++;
    }
    // fill(255, 255, 0);
    // rectMode(CENTER);
    // noStroke();
    // rect(width / 2, height / 2 - bounds * 4, width - bounds * 4, currentPhoto.height * ((width - bounds * 4) / currentPhoto.width));
  } else { 
    image(currentPhoto, width / 2, height / 2 - bounds * 4, width - bounds * 4, currentPhoto.height * ((width - bounds * 4) / currentPhoto.width));
  }

  pop();
  fill(0);


  // Scanning line
  stroke(0);
  strokeWeight(1);
  fill(0);
  rect(0, centerLineY, width, 10);

  // rect(0, 0, width, height);
  let glowRadius = 30 + 15 * sin(frameCount / (3 * frameRate()) * TWO_PI);
  strokeWeight(2);
  fill(0, 0);
  for (let i = 0; i < glowRadius; i++) {
    stroke(0, 255.0 * (1 - i / glowRadius));
    ellipseMode(CENTER);
    rectMode(CENTER);
    rect(width / 2, centerLineY, width, i);
  }

  if (growingText && centerLineY >= height) {
    growingText = false;
    increasedCount = false;
  } else if (!growingText && centerLineY <= -bounds*8) {
    growingText = true;
    pausing = true;
  }

  if (pausing && pauseCount < maxPauseCount) {
    pauseCount++;
  } else if (pausing && pauseCount >= maxPauseCount) {
    pausing = false;
    pauseCount = 0;
    centerLineY = height + (bounds*5);
    photoIndex = (photoIndex + 1) % photos.length;
    currentRotation = Math.floor(Math.random() * 5) + 1;
    currentRotation *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
  }

  if (!pausing) {
    if (!growingText) {
      centerLineY -= rate / 2;
    } else if (growingText) {
      centerLineY += (rate * 2);
    }
  }


}


