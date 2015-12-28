var mic;
var amp;
var v; // level of amplitude

var threshold = 0.1;

var rain, thunder;
var cloud;
var drops = [];

var y = 0;
var x;

 function preload() { 
cloud = loadImage("../images/cloud.png");
//   // rain = loadSound("../assets/sound/rain.mp3");
//   // thunder = loadSound("../assets/sound/thunder.mp3");
 }


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);

  mic = new p5.AudioIn();
  amp = new p5.Amplitude();

  amp.setInput(mic);
  mic.start();

  for(var i = 0; i < 100; i++) {
    drops[i] = new Drop();
  }

  // rain.loop();
  // rain.play();
}

function draw() {

  var v = amp.getLevel();
  
  background(255, 255, 255);
  for(var i = 0; i < 100; i++) {
    drops[i].fall();
    drops[i].display();
  }

  textSize(30);
  fill(0, 0, 100);
  text("clap for lightening!", 10, 60);

   //imageMode(CENTER);
   //image(cloud, width/2, 100);

  if (v > threshold) {
  // thunder.play();
  background(255, 255, 255);
  stroke(251, 237, 78);
  strokeCap(ROUND);
  strokeWeight(60);
  line(width/2, 0, width/2 - 50, 300);
  line(width/2 - 50, 300, width/2 + 65, 300);
  strokeWeight(40);
  line(width/2 + 65, 300, width/2, 500);
  line(width/2, 500, width/2 + 100, 500);
  strokeWeight(25);
  line(width/2 + 100, 500, width/2 + 25, 700);
  line(width/2 + 25, 700, width/2 + 115, 700);
  line(width/2 + 115, 700, width/2+50, height);
   //imageMode(CENTER);
   //image(cloud, width/2, 100);
  }

  y = y+5;
}

// raindrop class
function Drop() {
  this.length = random(0, 30);
  this.x = random(width);
  this.y = random(-400, 0);
  this.speed = random(5, 10);

  this.fall = function() {
    if (this.y < height) {
    this.y = this.y + this.speed;
    }
    else {
      this.y = 0;
    } 
  }

  this.display = function() {
    stroke(0, 0, 100);
    line(this.x, this.y, this.x, this.y + this.length)
  }
}

// function mouseClicked() {
//   stroke(255, 204, 0);
//   strokeWeight(30);
//   strokeCap(ROUND);
//   line(width/2, 25, width/2 - 50, 300);
//   line(width/2 - 50, 300, width/2 + 65, 300);
//   line(width/2 + 65, 300, width/2, height);
//   strokeWeight(0);
//   fill(255);
//   ellipse(width/2, 50, 800, 100);
// }