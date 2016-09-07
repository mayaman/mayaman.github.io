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
  h2 = createElement('h2','2. Tell us a story or two about why you\'re qualified for the job you\'re applying for.');
  myP = createP('The summer after my first year of college, I was really excited about computer science, yet did not quite know how to apply all of the CS theory I had learned in my academic classes. I was looking to expand my skill set and eager to put work out into the world at that very moment. So, I applied to a program called "Google Summer of Code" which pays students a stipend to do open source work for a company over the summer. I ended up working for <a href="https://processingfoundation.org/"> The Processing Foundation </a>, which promotes software literacy within the visual arts, visual literacy within technology-related fields, and strives to make these fields accessible to diverse communities. My project including rebuilding the <a href="https://p5js.org/"> p5.js website </a> using node.js (rather than php which it was currently using) and make it internationalized (meaning able to switch between different languages). I did a lot of research searching for the best platforms and methods and ended up creating a <a href="http://staging.p5js.org"> prototype </a> that is currently in staging. The project has been since picked up by other members of the p5.js community and set to go live in the next few months! This was extremely exciting for me, for not only was I able to enhance my web development skills while working on this website, but also the work I was doing would open up this incredible software to a whole new set of people who may not have been able to access it before because they didn\'t speak English! <br> <br> After working so much on that website, I was inspired to design and build a website of my own. I had a fantastic time building <a href="http://www.mayaman.cc"> my personal website </a> because it allowed me to get creative and throw in some fun elements such as the buttons on the top and polaroid shapes of the photos at the bottom. Both of these web development experiences, along with many more web dev projects along the way, equipped me with the necessary creative and technical skills that make me an excellent candidate for this position. Also, I whipped up this little webpage for this application because I believe an experienced web developer should be comfortable enough to make a webpage like this if the job calls for it. :) ');
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
  myP.position(50, height/5);

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
