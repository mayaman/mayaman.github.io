
var img;
var squares = [];
var points = [];
var lastNumbersArray = [];
var numbersArray = [];
var lastRotationsArray = [];
var rotationsArray = [];
var possibleRotations = [90, 180, 270, 360];
var minSquareSize;
var maxSquareSize;
var currentSquareSize;

var shrinking = false;
var moving = false;
var rotating = false;
var growing = false;
var holding = false;

var holdCount = 0;
var maxHoldCount = 60;
var lerpValue = 0;
var rLerpValue = 0;


function preload() {
  img = loadImage("../../public/images/bookcovers/saks.png");  // Load the image
  img.width = 500;
  img.height = 500;
  currentSquareSize = 500/8;
}

function setup() {
  var canvas = createCanvas(500, 500);

  minSquareSize = width/8 - 40;
  maxSquareSize = width/8;

  var i = 0;
  for (var r = 0; r < (width); r+=width/8) {
    for (var c = 0; c < (height); c+=height/8) {
      var square = img.get(r, c, width/8, height/8);
      points[i] = [r + width/16, c + width/16];
      squares[i] = square;
      numbersArray[i] = i;
      var newRotationNumber = floor(random(0,4));
      angleMode(DEGREES);
      console.log(possibleRotations[newRotationNumber]);
      lastRotationsArray[i] = 0;
      rotationsArray[i] = possibleRotations[newRotationNumber];
      i++;
    }
  }

  lastNumbersArray = numbersArray;
  canvas.parent('sketch1');
  background(255);
  frameRate(120);
  console.log(squares.length);
}


function draw() {
  noCursor();
  background(255);

  // Real image
  // image(img, 0,  0, width, height);

  shuffleSquares();

  for (let i = 0; i < squares.length; i++) {
    var oldPoint =  lastNumbersArray[i];
    var newPoint = numbersArray[i];
    push();
    imageMode(CENTER);
    var newX = lerp(points[oldPoint][0], points[newPoint][0], lerpValue);
    var newY = lerp(points[oldPoint][1], points[newPoint][1], lerpValue);
    var newR = lerp(lastRotationsArray[i], rotationsArray[i], rLerpValue);
    translate(newX, newY);
    rotate(newR);
    image(squares[i], 0, 0, currentSquareSize, currentSquareSize);
    pop();
  }

  // Grid
  // if (shrinking || growing || moving || rotating) {
  //   for (var c = 0; c < 8; c++) {
  //     stroke(0, 0, 0);
  //     line(0, c * height/8, width, c * height/8);
  //   }
  //
  //   for (var r = 0; r < 8; r++) {
  //     stroke(0, 0, 0);
  //     line(r*width/8, 0, r*width/8, height);
  //   }
  // }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function mouseClicked() {
  shrinking = true;
}

function shuffleSquares() {
  if (shrinking) {
    shrinkSquares();
  } else if (rotating) {
    rotateSquares();
  } else if (moving) {
    moveSquares();
  } else if (growing) {
    growSquares();
  } else if (holding) {
    holdSquares();
  }
}

var first = true;
function shrinkSquares() {
  if (currentSquareSize > minSquareSize) {
    shrinking = true;
    currentSquareSize--;
  } else {
    shrinking = false;
    rLerpValue = 0;
    if (!first) {
      lastRotationsArray = rotationsArray;
      rotationsArray = shuffle(rotationsArray);
    }
    first = false;
    rotating = true;
  }
}

function rotateSquares() {
  if (rLerpValue < 1) {
    rLerpValue+=0.02;
  } else {
    rotating = false;
    lastNumbersArray = numbersArray;
    numbersArray = shuffle(numbersArray);
    lerpValue = 0;
    moving = true;
  }
}

function moveSquares() {
  if (lerpValue < 1) {
    lerpValue+=0.01;
  } else {
    moving = false;
    growing = true;
  }
}

function growSquares() {
  if (currentSquareSize < maxSquareSize) {
    currentSquareSize++;
  } else {
    growing = false;
    holding = true;
  }
}

function holdSquares() {
  if (holdCount >= maxHoldCount) {
    holding = false;
    shrinking = true;
    holdCount = 0;
  } else {
    holdCount++;
  }
}


function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  // width = windowWidth;
  // height = windowHeight;
}
