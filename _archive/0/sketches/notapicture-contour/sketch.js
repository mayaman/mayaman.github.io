// https://kylemcdonald.github.io/cv-examples/

let capture;
const captureWidth = 640; // 4
const captureHeight = 480; // 4
const unitWidth = captureWidth / 4;
const unitHeight = captureHeight / 4;

const printScale = 0.05;
const canvasScale = 42;
const canvasWidth = 11 * canvasScale;
const canvasHeight = 17 * canvasScale;

const bleedBuffer = 0;

let xPos = bleedBuffer;
let yPos = bleedBuffer;
let captureReady = false;

let backgroundPixels;

let colors;
let colorIndex = 0;

let liveFeed;
let risoCanvas;
let outputGraphic;
let layerGraphics = [];
let hiresLayerGraphics = [];
let eventOver = false;
let ready = false;

let captureMat, gray, blurred, thresholded;
let contours, hierarchy;
let layerPositions = [];
const layerBuffer = 25; // 25
let eventStarted = false;
let captureClone;
let countdown = 3;

let risoBlue, risoPink, risoMint, risoYellow;

function setup() {
  capture = createCapture(
    {
      audio: false,
      video: {
        width: captureWidth,
        height: captureHeight
      }
    },
    function () {
      console.log("capture ready.");
      captureReady = true;
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.size(captureWidth, captureHeight);
  capture.hide();

  let canvasContainer = createCanvas(window.innerWidth, window.innerHeight);
  canvasContainer.parent('riso-container');
  background('#000');
  outputGraphic = createGraphics(canvasWidth, canvasHeight);
  outputGraphic.background('#fffffa');

  const layerWidth = canvasWidth - layerBuffer / 2;
  const layerHeight = canvasHeight - layerBuffer / 2;

  for (let c = 0; c < 4; c++) {
    layerGraphics.push(createGraphics(layerWidth, layerHeight));
    hiresLayerGraphics.push(createGraphics(canvasWidth, canvasHeight));
    layerGraphics[c].background('#fffffa');
    hiresLayerGraphics[c].background('#fffffa');
  }

  layerPositions.push([width / 2 - layerWidth / 2 - layerBuffer / 2, height / 2 - layerHeight / 2 - layerBuffer / 2]); // top left
  layerPositions.push([width / 2 + layerWidth / 2 + layerBuffer / 2, height / 2 - layerHeight / 2 - layerBuffer / 2]); // top right
  layerPositions.push([width / 2 - layerWidth / 2 - layerBuffer / 2, height / 2 + layerHeight / 2 + layerBuffer / 2]); // bottom left
  layerPositions.push([width / 2 + layerWidth / 2 + layerBuffer / 2, height / 2 + layerHeight / 2 + layerBuffer / 2]); // bottom right

  // document.getElementById('livefeed-container').style.width = canvasWidth;
  // document.getElementById('livefeed-container').style.height = canvasHeight;

  const alpha = 200;
  const pink = color(326, 81, 156, alpha);
  const orange = color(241, 115, 119, alpha);
  const violet = color(157, 121, 210, alpha);
  const yellow = color(255, 231, 0, alpha);
  const mint = color(131, 216, 213, alpha);
  const darkblue = color(61, 84, 135, alpha);
  const green = color(104, 179, 69);
  const bisque = color(242, 206, 207);

  colors = [darkblue, pink, mint, yellow]; // 3
  // colors = [pink, yellow, mint, darkblue]; // 2
  // colors = [yellow, darkblue, mint, pink]; // 1 

  pixelDensity(1);
  risoBlue = new Riso('MEDIUMBLUE');
  risoPink = new Riso('FLUORESCENTPINK');
  risoMint = new Riso('MINT');
  risoYellow = new Riso('YELLOW');

  clearRiso();

  allLayers = [risoBlue, risoPink, risoMint, risoYellow];
  allLayers.forEach(layer => {
    layer.background('#fffffa');
  })

  noCursor();
  frameRate(30); // make frameRate 10 FPS
}

function draw() {
  background(0);

  if (cvReady() && captureReady) {
    capture.loadPixels();
    if (capture.pixels.length > 0) {
      if (!backgroundPixels) {
        backgroundPixels = Array.from(capture.pixels);
      }

      let i = 0;
      let pixels = capture.pixels;
      let thresholdAmount = (50 * 255) / 100; // Originally 45
      let total = 0;
      for (let y = 0; y < captureHeight; y++) {
        for (let x = 0; x < captureWidth; x++) {
          // another common type of background thresholding uses absolute difference, like this:
          // let total = Math.abs(pixels[i+0] - backgroundPixels[i+0] > thresholdAmount) || ...
          let rdiff =
            Math.abs(backgroundPixels[i + 0] - pixels[i + 0]) > thresholdAmount;
          let gdiff =
            Math.abs(backgroundPixels[i + 1] - pixels[i + 1]) > thresholdAmount;
          let bdiff =
            Math.abs(backgroundPixels[i + 2] - pixels[i + 2]) > thresholdAmount;
          let anydiff = rdiff || gdiff || bdiff;
          let outputColor = [0, 0, 0];
          if (anydiff) {
            outputColor = [255, 255, 255];
            total++;
          }
          pixels[i++] = outputColor[0];
          pixels[i++] = outputColor[1];
          pixels[i++] = outputColor[2];
          i++; // skip alpha
        }
      }
      capture.updatePixels();

      // Render input image
      image(capture, width / 3 - width / 6, height / 2, canvasWidth, canvasWidth / captureWidth * captureHeight);
      stroke('#fff');
      strokeWeight(3);
      noFill();
      rectMode(CENTER);
      rect(width / 3 - width / 6, height / 2, canvasWidth, canvasWidth / captureWidth * captureHeight);

      captureMat.data().set(capture.pixels);
      blurRadius = 10;
      let threshold = 100;

      cv.cvtColor(
        captureMat,
        gray,
        cv.ColorConversionCodes.COLOR_RGBA2GRAY.value,
        0
      );
      cv.blur(
        gray,
        blurred,
        [blurRadius, blurRadius],
        [-1, -1],
        cv.BORDER_DEFAULT
      );
      cv.threshold(
        blurred,
        thresholded,
        threshold,
        255,
        cv.ThresholdTypes.THRESH_BINARY.value
      );

      contours = new cv.MatVector();
      hierarchy = new cv.Mat();
      cv.findContours(thresholded, contours, hierarchy, 3, 2, [0, 0]);
    }

    if (eventStarted) {
      layerGraphics[colorIndex].push();
      // hiresLayerGraphics[colorIndex].push();
      // layerGraphics[colorIndex].scale(0.5);
      if (contours && contours.size() >= 0 && !eventOver) {
        outputGraphic.noStroke();
        layerGraphics[colorIndex].noStroke();
        allLayers[colorIndex].noStroke();
        for (let i = 0; i < contours.size(); i++) {
          outputGraphic.fill(colors[colorIndex]);
          layerGraphics[colorIndex].fill(colors[colorIndex]);
          allLayers[colorIndex].fill(colors[colorIndex]);
          // hiresLayerGraphics[colorIndex].fill(colors[colorIndex]);

          let contour = contours.get(i);
          outputGraphic.beginShape();
          layerGraphics[colorIndex].beginShape();
          allLayers[colorIndex].beginShape();

          let k = 0;
          for (let j = 0; j < contour.total(); j++) {
            let x = contour.get_int_at(k++);
            let y = contour.get_int_at(k++);
            outputGraphic.vertex((xPos + x / 4), (yPos + y / 4));
          }
          outputGraphic.endShape(CLOSE);
          layerGraphics[colorIndex].endShape(CLOSE);
          allLayers[colorIndex].endShape(CLOSE);

          outputGraphic.stroke(colors[colorIndex]);
          layerGraphics[colorIndex].stroke(colors[colorIndex]);
          allLayers[colorIndex].stroke(colors[colorIndex]);
        }
        // hiresLayerGraphics.pop();
        layerGraphics[colorIndex].pop();


        if (xPos < canvasWidth - unitWidth) {
          xPos += unitWidth/2; // w/2
        } else if (yPos < canvasHeight) {
          yPos += unitHeight;
          xPos = bleedBuffer;
        } else if (yPos >= canvasHeight - captureHeight - captureHeight / 2 - bleedBuffer && colorIndex < colors.length - 1) {
          // One color completed!
          xPos = bleedBuffer;
          yPos = bleedBuffer;
          save(layerGraphics[colorIndex],"layer_"+colorIndex+".png");
          colorIndex++;
        } else {
          // Finished!
          save(layerGraphics[colorIndex],"layer_"+colorIndex+".png");
          save(outputGraphic,"output.png");
          eventOver = true;
        }
      }
    }
  }

  imageMode(CENTER);
  // Render layer graphics
  for (let g = 0; g < layerGraphics.length; g++) {
    push();
    const layerScale = 0.5;
    scale(layerScale);
    // translate(width/2 + layerBuffer*4, height/2 + layerBuffer*4);
    translate(width/2, height/2);
    image(layerGraphics[g], layerPositions[g][0], layerPositions[g][1]);
    pop();
  }
  // Render output graphic
  image(outputGraphic, width * 2 / 3 + width / 6, height / 2);

  if (!eventStarted && countdown > 0) {
    fill(10, 200);
    rectMode(CENTER);
    noStroke();
    rect(width/2, height/2, width, height);

    fill(255);
    textAlign(CENTER);
    textSize(100);
    textFont('Roboto Mono');
    text(countdown, width / 2, height / 2);
  }

  // drawRiso();
}

function cvSetup() {
  captureMat = new cv.Mat([captureHeight, captureWidth], cv.CV_8UC4);
  gray = new cv.Mat([captureHeight, captureWidth], cv.CV_8UC1);
  blurred = new cv.Mat([captureHeight, captureWidth], cv.CV_8UC1);
  thresholded = new cv.Mat([captureHeight, captureWidth], cv.CV_8UC1);
}

function cvReady() {
  if (!cv || !cv.loaded) return false;
  if (ready) return true;
  cvSetup();
  ready = true;
  return true;
}

function mousePressed() {
  // exportRiso();
}

function kickOff() {
  setTimeout(() => {
    eventStarted = true;
  }, 5050);
  setTimeout(() => {
    countdown--;
  }, 4050);
  setTimeout(() => {
    countdown--;
  }, 3050);
  setTimeout(() => {
    countdown--;
  }, 2050);
}

setTimeout(() => {
  kickOff();
}, 1000);
