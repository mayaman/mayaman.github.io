var stars = [];
var x = 0;
var y = 40;
var one = false;
var two = false;

  // iframe#home-sketch-frame(frameborder='0', src='/nightSky')
  // script(type='text/javascript')
  //   $('#home-sketch-frame').width(window.innerWidth);
  //   $('#home-sketch-frame').height(window.innerHeight/3);
  //   $('#home-sketch-frame').css('position', 'fixed');
  //   $('#home-sketch-frame').css('top', '0px');
  //   $('#home-sketch-frame').css('left', '0px');
  //   $('#home-sketch-frame').css('z-index', '-2');
  //   $('body').css('pointer-events', 'none');
  //   $('iframe').css('pointer-events', 'auto');
  //   $('a').css('pointer-events', 'auto');

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
  // for(var i = 0; i < 500; i++) {
  //   stars[i] = new Star();
  //   stars[i].twinkle();
  //   stars[i].display();
  // }
}

function draw() {
  if (one) {
  // for(var j = 0; j < 500; j++) {
  //   stars[j].twinkle();
  //   stars[j].display();
  // }
  }
else if (two) {
  // TEXT PRINTING
  // fill(0, 0, random(255));
  // textSize(40);
  // text("hello", x, y);
  // x+=80;
  // if (x > width) {
  //   y+=40;
  //   x = 0;
  // }
}

  fill(random(0, 255));
  rect(random(width), random(height), 5, 5);
}

//star class
function Star() {
  this.rad = 2;
  this.x = random(0, width);
  this.y = random(0, height);
  this.f = 100;


  this.twinkle = function() {
    if (mouseX + 50 > this.x && mouseX - 50 < this.x && mouseY + 50 > this.y && mouseY - 50 < this.y) {
      this.f = 255;
    }
    else {
      this.f = 100;
    }
  }

  this.display = function() {
    fill(this.f);
    ellipse(this.x, this.y, this.rad, this.rad);
  }
}