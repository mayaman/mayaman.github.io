var frq;
var amp;
var a; // level of amplitude

var playing = false;
var jamstruction;
var t = 255;

var rad = 100;
var houseWidth;
var houseHeight;
var doorWidth = 150;
var doorHeight = 250;
var winWidth = 175;
var offset = 50;
var roof = 70;

var threshold = 0.2;
var bassthresh = 210;
var lowMidThresh = 190;
var midthresh = 150;
var highMidThresh = 140;
var trebthresh = 100;


var cutoff = 0;
var addCutoff = 0.3;
var decayRate = 0.99;

var b;



function preload() {
  dreamer = loadSound("../sound/jazz.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, b);

  amp = new p5.Amplitude();
  frq = new p5.FFT();

  amp.setInput(dreamer);
  frq.setInput(dreamer);

}

function mouseClicked() {
  t = 0;
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

  background(255);
  noFill();

  // house
  fill(0);
  triangle(offset, roof, windowWidth - offset, roof, windowWidth/2, -height*1.5);
  rectMode(CENTER);
  rect(width/2, height/2 + roof/2 + 26, w, windowHeight - 20);
  rectMode(CORNER);

  // instructions
  fill(t);
  textSize(32);
  noStroke();
  jamstruction = text("click to jam!", width/2 - 75, offset);

  noFill();
  stroke(255, 255, 255);

  //rectMode(CENTER);
  //rect(width/2, height/2 + offset, windowWidth - 200, windowHeight - 10);
  //curve(5, 300, width - 7*width/8, height - 7*height/8, width - 7*width/8, height, 100, 100);
  //rectMode(CORNER);

  var window1 = new Window(300, 150);
  window1.display();

  var window2 = new Window(300, 250 + winWidth);
  window2.display();

  var window3 = new Window(width - 300 - winWidth, 150);
  window3.display();

  var window4 = new Window(width - 300 - winWidth, 250 + winWidth);
  window4.display();

  // if (q > 50) {
  //   arc(-offset, height/2 + offset, width/2, windowHeight + windowHeight/3, -PI/4, PI/4);
  //   arc(windowWidth+offset, height/2 + offset, width/2, windowHeight + windowHeight/3, 3*PI/4, 5*PI/4);
  //   line(offset, roof, windowWidth - offset, roof);
  //   line(offset, roof, windowWidth/2, -height*1.5);
  //   line(windowWidth - offset, roof, windowWidth/2, -height*1.5);
  // }
  // else {

  // check frequencies

  if (bass > bassthresh) {
    fill(26, 26, 89);
    // door
    rect(width/2 - doorWidth/2, height - a, doorWidth, a);
    fill(60, 69, 177);
    triangle(offset, roof, windowWidth - offset, roof, windowWidth/2, -height*1.5);
  }

  if (lowMid > lowMidThresh) {
    window1.jam1();
    window2.jam2();
    window3.jam3();
    window4.jam4();
  }

  if (mid > midthresh) {
    window1.jam2();
    window2.jam3();
    window3.jam4();
    window4.jam1();
  }

  if (highMid > highMidThresh) {
    window1.jam3();
    window2.jam4();
    window3.jam1();
    window4.jam2();
  }

  if (treb > trebthresh) {
    window1.jam4();
    window2.jam1();
    window3.jam2();
    window4.jam3();
  }

  //draw door!
  noFill();
  stroke(255, 255, 255);
  rect(width/2 - doorWidth/2, height - a, doorWidth, a);
  ellipse(width/2 - doorWidth/2 + 20, height - doorHeight + doorHeight/2, 10, 10);

  // cutoff = cutoff * decayRate;
}

// window class
function Window(ex, why) {
  this.rad = 2;
  this.x = ex;
  this.y = why;
  this.pane1; 
  this.pane2;
  this.pane3;
  this.pane4;

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