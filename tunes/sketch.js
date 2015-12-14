var frq;
var amp;
var v; // level of amplitude

var rad = 10;

var threshold = 0.5;
var bassthresh = 230;
var lowMidThresh = 220;
var midthresh = 170;
var highMidThresh = 130;
var trebthresh = 130;


var cutoff = 0;
var addCutoff = 0.3;
var decayRate = 0.99;


function preload() {
  dreamer = loadSound("../sound/sunday.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  amp = new p5.Amplitude();
  frq = new p5.FFT();

  amp.setInput(dreamer);
  frq.setInput(dreamer);

  dreamer.play();
}

function draw() {
  var v = amp.getLevel();
  var dat = frq.analyze();
  var bass = frq.getEnergy("bass");
  var treb = frq.getEnergy("treble");
  var lowMid = frq.getEnergy("lowMid");
  var mid = frq.getEnergy("mid");
  var highMid = frq.getEnergy("highMid");

  // var b = map(v, 0, 0.3, 0, 200);
  background(255, 255, 255, 20);

  //noStroke();

  // if (v > threshold) {
  //   background(0, 0, 0, 20);
  // }
 

  if (bass > bassthresh) {
    fill(16, 14, 81);
    ellipse(random(0, width/5), random(10, height), rad, rad);
    // rect(0, 0, width/5, height);
  } 

  if (lowMid > lowMidThresh) {
    fill(50, 12, 245);
    ellipse(random(width/5, width/5 * 2), random(10, height), rad, rad);
    // rect(width/5, 0, width/5, height);
  }

  if (mid > midthresh) {
    fill(203, 80, 202);
    ellipse(random(width/5 * 2, width/5 * 3), random(10, height), rad, rad);
    // rect(width/5 * 2, 0, width/5, height);
  }

  if (highMid > highMidThresh) {
    fill(12, 171, 245);
    ellipse(random(width/5 * 3, width/5 * 4), random(10, height), rad, rad);
    // rect(width/5 * 3, 0, width/5, height);
  }

  if (treb > trebthresh) {
    fill(160, 12, 245);
    ellipse(random(width/5 * 4, width), random(10, height), rad, rad);
    // rect(width/5 * 4, 0, width/5, height);
  }

  cutoff = cutoff * decayRate;
}
