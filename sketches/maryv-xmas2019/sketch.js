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
const rate = 15;

let photoIndex = 0;
let pauseCount = 0;
let maxPauseCount = 100;


function preload() {
  poster = loadImage('./MaryV_2.png');
  for (let i = 1; i <= maxNumPhotos; i++) {
    photos.push(loadImage('./photos/' + i + '.png'));
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  backgroundColor = color(252);
  background(backgroundColor);
  centerLineY = height - poster.height;
  noStroke();
}

function draw() {
  background(255);
  const bounds = 20;


  // Text
  // image(poster, 0, centerLineY - poster.height, canvasWidth, poster.height);
  image(poster, 0, bounds*1.5, width, centerLineY);


  // Photo
  const currentPhoto = photos[photoIndex];
  image(currentPhoto, bounds, centerLineY + bounds*2, width - bounds * 2, currentPhoto.height * ((width - bounds * 2) / currentPhoto.width));

  if (growingText && centerLineY >= (height + bounds*3)) {
    growingText = false;
    photoIndex = (photoIndex + 1) % photos.length;
  } else if (!growingText && centerLineY <= (poster.height)) {
    growingText = true;
    pausing = true;
  }

  if (pausing && pauseCount < maxPauseCount) {
    pauseCount++;
  } else {
    pausing = false;
    pauseCount = 0;
    if (!growingText) {
      centerLineY -= rate/2;
    } else if (growingText) {
      centerLineY += (rate*2);
    }
  }


}


