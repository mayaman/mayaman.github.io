let img, backgroundImage, chellaImg;
const canvasScale = 34;
const canvasWidth = 18 * canvasScale;
const canvasHeight = 24 * canvasScale;
const boxSize = 300;
let textureImage;
let animationStarted = false;

function preload() {
  img = loadImage('./jerichoBorder.png');
  backgroundImage = loadImage('./ChellaBackground.png');
  myFont = loadFont('./Roboto-Black.ttf');
  chellaImg = loadImage('./chellaBorder.png');
}

function setup() {
  background(255);
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  textureImage = chellaImg;

  noCursor();
}

function draw() {
  background(255);
  image(backgroundImage, -canvasWidth/2, -canvasHeight/2, canvasWidth, canvasHeight);

  //drag to move the world.
  orbitControl();

  if (animationStarted) {
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);

    if (frameCount % 2 == 0) {
      textureImage = chellaImg;
    } else {
      textureImage = img;
    }
  }

  //pass image as texture
  texture(textureImage);
  // translate(0, 0, boxSize/2);
  box(boxSize, boxSize, boxSize);

  // fill('#000000');
  // textFont(myFont);
  // textSize(100);
  // text('Chella Man', -300, -300);
}

function mouseClicked() {
  animationStarted = true;
}