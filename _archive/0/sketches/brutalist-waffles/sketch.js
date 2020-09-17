let canvasSize = 600;
let waffleImage;

let waffles = [];

let colors = [];
let cursor;
let backgroundColor;

let system;

let pastWaffles = [];

const borderWidth = 5;


function preload() {
  waffleImage = loadImage('./waffle.png');
  cursor = loadImage('./cursor.png');
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  // backgroundColor = color(252, 61, 236);
  backgroundColor = color(252);

  background(backgroundColor);

  colors.push(color('#bc99d6'));
  colors.push(color('#00c2dc'));
  colors.push(color('#967ca3'));
  colors.push(color('#fe8ca3'));
  colors.push(color('#3804e5'));
  system = new ParticleSystem(createVector(width / 2, 0));

  noCursor();

  frameRate(60);
}

function draw() {
  // background(backgroundColor);

  // for (let c = 0; c < colors.length; c++) {
  //   fill(colors[c]);
  //   noStroke();
  //   rect(mouseX*c + 10, mouseY, 10, 10);
  // }

  system.addParticle();
  system.run();


  imageMode(CENTER);

  rectMode(CENTER);
  fill(backgroundColor);
  stroke(0);
  strokeWeight(borderWidth);
  rect(width / 2, height / 2, width * .75, width * .75);

  let lilwaffleSize = 50;

  for (let p = 0; p < pastWaffles.length; p++) {
    image(waffleImage, pastWaffles[p][0], pastWaffles[p][1], lilwaffleSize, lilwaffleSize);
  }
  if (mouseX != 0) {
    if (mouseX > width / 2 - width * .75 / 2 + lilwaffleSize / 2 && mouseX < width / 2 + width * .75 / 2 - lilwaffleSize / 2 &&
      mouseY > width / 2 - width * .75 / 2 + lilwaffleSize / 2 && mouseY < width / 2 + width * .75 / 2 - lilwaffleSize / 2) {
      if (mouseIsPressed) {
        pastWaffles.push([mouseX, mouseY, colors[Math.floor(Math.random() * colors.length)]]);
        image(waffleImage, mouseX, mouseY, lilwaffleSize, lilwaffleSize);
      }
    } else {
      image(waffleImage, mouseX, mouseY, 100, 100);
    }
  }

  const textOffset = 115;
  textAlign(CENTER);
  fill(backgroundColor);
  textSize(60);
  noStroke();
  textFont('Roboto Mono');
  // textFont(fontBold);
  text("BRUTALIST", width/2, height/2 - textOffset);
  text("X", width/2, height/2);
  text("WAFFLES", width/2, height/2 + textOffset);

  if (mouseX > width / 2 - width * .75 / 2 + lilwaffleSize / 2 && mouseX < width / 2 + width * .75 / 2 - lilwaffleSize / 2 &&
    mouseY > width / 2 - width * .75 / 2 + lilwaffleSize / 2 && mouseY < width / 2 + width * .75 / 2 - lilwaffleSize / 2) {
      image(cursor, mouseX, mouseY + lilwaffleSize / 2, lilwaffleSize, lilwaffleSize);
  }

  noFill();
  stroke(0);
  strokeWeight(borderWidth);
  rect(width/2, height/2, width - borderWidth, height-borderWidth);
}


// A simple Particle class
let Particle = function (position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-10, 10), random(-1, 0));
  // this.velocity = createVector(1, 0);
  this.position = position.copy();
  this.lifespan = 500;
};

Particle.prototype.run = function () {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1;
};

// Method to display
Particle.prototype.display = function () {
  let particleSize = 255 - this.lifespan;

  if (mouseX > this.position.x - particleSize / 2 && mouseX < this.position.x + particleSize / 2 && !this.isDead()) {
    fill(255);
    rect(this.position.x, this.position.y, 255 - this.lifespan, 255 - this.lifespan);
    rectMode(CENTER);
    noStroke();
    image(waffleImage, this.position.x, this.position.y, particleSize * 2, particleSize * 2);
  } else {
    fill(colors[Math.floor(Math.random() * colors.length)]);
    rect(this.position.x, this.position.y, 255 - this.lifespan, 255 - this.lifespan);
    rectMode(CENTER);
    noStroke();
    image(waffleImage, this.position.x, this.position.y, particleSize, particleSize);
  }
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  return this.lifespan < 0;
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
