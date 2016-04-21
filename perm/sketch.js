var frq;
var amp;
var a; // level of amplitude

var playing = false;
var jamstruction;
var t;

var rad = 100;
var houseWidth;
var houseHeight;
var doorWidth = 150;
var doorHeight = 250;
var winWidth = 175;
var offset = 50;
var roof = 70;

var threshold = 0.2;
var bassthresh = 200;
var lowMidThresh = 170;
var midthresh = 110;
var highMidThresh = 70;
var trebthresh = 60;


var cutoff = 0;
var addCutoff = 0.3;
var decayRate = 0.99;

var b;



function preload() {
  dreamer = loadSound("../public/sound/machine.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, b);

t = color(0, 0, 0);

  amp = new p5.Amplitude();
  frq = new p5.FFT();

  amp.setInput(dreamer);
  frq.setInput(dreamer);

}

function mouseClicked() {
  t = color(230, 100, 200);
  if (playing) {
    dreamer.pause();
    playing = false;
  }
  else {
    dreamer.play();
    playing = true;
  }
}

function draw() {

  var h;

  var v = amp.getLevel();
  var dat = frq.analyze();
  var bass = frq.getEnergy("bass");
  var treb = frq.getEnergy("treble");
  var lowMid = frq.getEnergy("lowMid");
  var mid = frq.getEnergy("mid");
  var highMid = frq.getEnergy("highMid");

  var a = map(v, 0, 0.3, doorHeight, doorHeight+100);
  smooth(0.9);
  var w = map(v, 0, 0.3, windowWidth - 340, windowWidth - 100);
  var h = map(v, 0, 0.3, windowHeight - 20, windowHeight);


  // set up scene

  background(230, 100, 200);
  noFill();

  fill(100);
  drawBot(175, 175, a/2);


  noFill();
  stroke(255, 255, 255);

  // check frequencies
  strokeWeight(.5);
  textSize(45);
  text("1. I need an elective!", width - width/2, height/6);
  text("2. Only elective I can take!", width - width/2, 2*height/6);
  text("3. I will be abroad next spring!", width - width/2, 3*height/6);
  text("4. I am a learning machine!", width - width/2, 4*height/6);
  text("5. I made this thing!", width - width/2,  5*height/6);




  if (bass > bassthresh) {
    fill(102, 255, 255);
    text("1. I need an elective!", width - width/2, height/6);
  }

  if (lowMid > lowMidThresh) {

    fill(204, 153, 255);
    text("2. Only elective I can take!", width - width/2, 2*height/6);
  }

  if (mid > midthresh) {

    fill(255, 204, 255);
    text("3. I will be abroad next spring!", width - width/2, 3*height/6);

  }

  if (highMid > highMidThresh) {

    fill(255, 255, 153);
    text("4. I am a learning machine!", width - width/2, 4*height/6);

  }

  if (treb > trebthresh) {

    fill(102, 255, 153);
    text("5. I made this thing!", width - width/2, 5*height/6);

  }

    // instructions
    fill(t);
    textSize(80);
    stroke(t);
    jamstruction = text("click to jam!", width/6, height/8);
    // cutoff = cutoff * decayRate;

    fill(0);
    textSize(20);
    text("PERM for Machine Learning Fall 2016 - Maya Man", width - width/3, height - 20);
}

function drawBot(x, y, size) {
  if (size > 5) {
    strokeWeight(size/15);
    fill(200);
    ellipse(x, y, size, size*1.5);
    rect(x - size/2, y + size*1.5/2, size, size*2);

    // arm vertical
    fill(125);
    rect(x, y + size*1.5, size, size/4);
    rect(x + size - size/8, y + size/2, size/4, size);
    ellipse(x + size, y + size*1.5 + size/6, size/4, size/4);
    ellipse(x, y + size*1.5/2 + size*2 + size/2, size, size);

    // mouth
    line(x - size/12, y + size/2 - size/10, x + size/12, y + size/2 - size/10);

    // book
    fill(200, 200, 250);
    rect(x + size - size/8, y, size, size);

    // eye
    fill(0, 255, 0);
    ellipse(x + size/6, y - size/8, size/6, size/6);

    // recursion!
    drawBot(x + size + size/12, y, size/4);
  }
}

// window class
function Bot(x, y, size) {
  this.s = size;
  this.x = x;
  this.y = y;
  this.pane1;
  this.pane2;
  this.pane3;
  this.pane4;

  this.drawBot(botX, botY, botS) = function() {
    if (botX < width - 100) {
      ellipse(botX, botY, botS, size*1.5);
      rect(x - size/2, y + size*1.5/2, size, size*2);
    }
  }

  this.jam1 = function() {
    fill(37, 65, 167);
    rect(this.x, this.y, winWidth/2, winWidth/2);
  }

  this.jam2 = function() {
    fill(0, 0, 253);
    rect(this.x+winWidth/2, this.y, winWidth/2, winWidth/2);
  }

  this.jam3 = function() {
    fill(76, 103, 140);
    rect(this.x, this.y+winWidth/2, winWidth/2, winWidth/2);
  }

  this.jam4 = function() {
    fill(94, 182, 255);
    rect(this.x+winWidth/2, this.y+winWidth/2, winWidth/2, winWidth/2);
  }

  this.display = function() {
    this.pane1 = rect(this.x, this.y, winWidth/2, winWidth/2);
    this.pane2 = rect(this.x+winWidth/2, this.y, winWidth/2, winWidth/2);
    this.pane3 = rect(this.x, this.y+winWidth/2, winWidth/2, winWidth/2);
    this.pane4 = rect(this.x+winWidth/2, this.y+winWidth/2, winWidth/2, winWidth/2);
  }
}
