var painting;

var paths = [];

// How long until the next circle
var next = 0;

var black;
var backgroundColor;

var myP, h2, instructions;

var bee;

var currentColor;



function preload() {
  bee = loadImage("bee.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  h2 = createElement('h2','3. How do you hope to be changed as a result of working at the Hive? What change do you hope to make in the world (however you define "world") as a result of your work here?');
  myP = createP('By working at the Hive, I hope to learn how to push myself outside of my comfort zone and try new things that I never imagined I would do before. I hope to work with other incredible, creative people and learn from their ways of thinking and doing. I hope to continue blending art, science, and technology until I no longer see a clear divide between the disciplines. And, I also hope to continue to enhance my web development skills while focusing on creating technology that is accessible and appealing to all types of people. <br> <br> As a result of my work at the Hive, I hope to show people that technology and programming are not reserved for any kind of elite demographic. I want to empower individuals by showing them that they can create anything they can dream up with code! By approaching coding as a creative art form rather than a strictly technical subject, I want to bring those that identify as artists, designers, or anything but a programmer into the world of software and help diversify the set of programmers, hackers, software engineers, etc. that exists today. Furthermore, I want to get more students involved at the Hive! It is such a special space on campus and I want to see students from different schools, different friend groups, different majors, etc. coming together and collaborating there. Using the power of the internet, I hope to pique more students\' interest in the Hive and create a more diverse community within the space. ');
  instructions = createP('click anywhere to turn the bee on & off');
  background(255);

  painting = true;

  black = 0;
  backgroundColor = color('#DD8F87');
  currentColor = backgroundColor;

  paths.push(new Path());

  current = createVector(0,0);
  previous = createVector(0,0);
}

function mouseClicked() {
  painting = !painting;
  paths = [];
  paths.push(new Path());
  instructions.hide();
}

function draw() {
  background('#DD8F87');


  if (painting && millis() > next) {

    current.x = mouseX;
    current.y = mouseY;

    // Add new particle
    paths[paths.length - 1].add(current, currentColor);

    if (currentColor == backgroundColor) {
      currentColor = black;
    } else {
      currentColor = backgroundColor;
    }

    next = millis() + 10;

    // Store mouse values
    if (current.x != 0 && current.y != 0) {
      previous.x = current.x;
      previous.y = current.y;
    }

    // Draw all paths
    for( var i = 0; i < paths.length; i++) {
      paths[i].update();
      paths[i].display();
    }

    imageMode(CENTER);
    image(bee, mouseX, mouseY, 50, 50);
  }


  h2.style("font-size", "36px");
  h2.style("padding", "25px");
  h2.style("text-align", "left");
  h2.position(50, 0);

  myP.style("font-size", "20px");
  myP.style("padding", "25px");
  myP.style("text-align", "left");
  myP.position(50, height/5 + 20);

  instructions.style("font-size", "18px");
  instructions.style("padding", "5px");
  instructions.style("background-color", "#FFC65F");
  instructions.style("border", "5px");
  instructions.style("border-radius", "5px");
  instructions.style("text-align", "left");
  instructions.position(width - 350, height - height/10);
}


class Path {
  constructor() {
    this.particles = [];
    this.hue = 0;
  }

  add(thePosition, aColor) {
    // Add a new particle with a position, force, and hue
    this.particles.push(new Particle(thePosition, aColor));
  }

  update() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }

  display() {
    // Loop through backwards
    for (var i = this.particles.length - 1; i >= 0; i--) {
      // If we shold remove it
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
      // Otherwise, display it
      } else {
        this.particles[i].display(this.particles[i+1]);
      }
    }
  }
}


class Particle {

  constructor(thePosition, theColor) {
    this.position = createVector(thePosition.x, thePosition.y);
    this.lifespan = 150;
    this.colorCounter = 0;
    this.color = theColor;
  }

  update() {
    // Fade it out
    this.lifespan--;
  }

  display(other) {
    if (other) {
      strokeWeight(5);
      stroke(this.color, this.lifespan);
      strokeCap(SQUARE);
      line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
