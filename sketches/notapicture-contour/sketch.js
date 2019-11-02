// https://kylemcdonald.github.io/cv-examples/

let capture;
const w = 640 / 4; // 4
const h = 480 / 4; // 4
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
let eventOver = false;
let ready = false;

let captureMat, gray, blurred, thresholded;
let contours, hierarchy;
let layerPositions = [];
const layerBuffer = 25;

function setup() {
  capture = createCapture(
    {
      audio: false,
      video: {
        width: w,
        height: h
      }
    },
    function () {
      console.log("capture ready.");
      captureReady = true;
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.size(w, h);
  // capture.parent('livefeed-container');
  // capture.style('margin-top', '55%');
  capture.hide();


  let canvasContainer = createCanvas(window.innerWidth, window.innerHeight);
  canvasContainer.parent('riso-container');
  background('#000');
  outputGraphic = createGraphics(canvasWidth, canvasHeight);
  outputGraphic.background('#fffffa');
  
  const layerWidth = canvasWidth / 2 - layerBuffer/2;
  const layerHeight = canvasHeight / 2 - layerBuffer/2;

  for (let c = 0; c < 4; c++) {
    layerGraphics.push(createGraphics(layerWidth, layerHeight));
    layerGraphics[c].background('#fffffa');
  }

  layerPositions.push([ width/2 - layerWidth/2 - layerBuffer/2, height/2 - layerHeight/2 - layerBuffer/2]); // top left
  layerPositions.push([ width/2 + layerWidth / 2 + layerBuffer/2, height/2 - layerHeight/2 - layerBuffer/2]); // top right
  layerPositions.push([ width/2 - layerWidth / 2 - layerBuffer/2, height/2 + layerHeight/2 + layerBuffer/2]); // bottom left
  layerPositions.push([ width/2 + layerWidth / 2 + layerBuffer/2, height/2 + layerHeight/2 + layerBuffer/2]); // bottom right

  // document.getElementById('livefeed-container').style.width = canvasWidth;
  // document.getElementById('livefeed-container').style.height = canvasHeight;

  const alpha = 200;
  const pink = color(326, 81, 156, alpha);
  const orange = color(241, 115, 119, alpha);
  const violet = color(157, 121, 210, alpha);
  const yellow = color(255, 231, 0, alpha);
  const mint = color(131, 216, 213, alpha);
  const darkblue = color(61, 84, 135, alpha);

  colors = [darkblue, pink, mint, yellow];

  frameRate(15); // make frameRate 10 FPS
}

function draw() {
  if (cvReady() && captureReady) {
    capture.loadPixels();
    if (capture.pixels.length > 0) {
      if (!backgroundPixels) {
        backgroundPixels = Array.from(capture.pixels);
      }

      let i = 0;
      let pixels = capture.pixels;
      let thresholdAmount = (select("#thresholdAmount").value() * 255) / 100;
      let total = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
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
      captureMat.data().set(capture.pixels);
      blurRadius = 10;
      let threshold = 100;
      image(capture, width/3 - width/6, height/2, canvasWidth, canvasWidth/w * h);
      stroke('#fff');
      strokeWeight(3);
      noFill();
      rectMode(CENTER);
      rect(width/3 - width/6, height/2, canvasWidth, canvasWidth/w * h);

      
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

    layerGraphics[colorIndex].push();
    layerGraphics[colorIndex].scale(0.5);
    if (contours && contours.size() >= 0 && !eventOver) {
      outputGraphic.noStroke();
      layerGraphics[colorIndex].noStroke();
      for (let i = 0; i < contours.size(); i++) {
        outputGraphic.fill(colors[colorIndex]);
        layerGraphics[colorIndex].fill(colors[colorIndex]);
        let contour = contours.get(i);
        outputGraphic.beginShape();
        layerGraphics[colorIndex].beginShape();
        let k = 0;
        for (let j = 0; j < contour.total(); j++) {
          let x = contour.get_int_at(k++);
          let y = contour.get_int_at(k++);
          outputGraphic.vertex(xPos + x, yPos + y);
        }
        outputGraphic.endShape(CLOSE);
        layerGraphics[colorIndex].endShape(CLOSE);

        outputGraphic.stroke(colors[colorIndex]);
        layerGraphics[colorIndex].stroke(colors[colorIndex]);
      }
      layerGraphics[colorIndex].pop();


      if (xPos < canvasWidth - w - bleedBuffer) {
        xPos += w / 2;
      } else if (yPos < canvasHeight - h - h / 2 - bleedBuffer) {
        yPos += h;
        xPos = bleedBuffer;
      } else if (yPos >= canvasHeight - h - h / 2 - bleedBuffer && colorIndex < colors.length - 1) {
        // One color completed!
        xPos = bleedBuffer;
        yPos = bleedBuffer;
        // save(layerGraphics[colorIndex],"layer_"+colorIndex+".png");
        colorIndex++;
      } else {
        // Finished!
        // save(layerGraphics[colorIndex],"layer_"+colorIndex+".png");
        // save(outputGraphic,"output.png");
        eventOver = true;
      }
    }
  }

  imageMode(CENTER);
  // Render layer graphics
  for (let g = 0; g < layerGraphics.length; g++) {
    image(layerGraphics[g], layerPositions[g][0], layerPositions[g][1]);
  }
  // Render output graphic
  image(outputGraphic, width*2/3 + width/6, height/2);
}

function cvSetup() {
  captureMat = new cv.Mat([h, w], cv.CV_8UC4);
  gray = new cv.Mat([h, w], cv.CV_8UC1);
  blurred = new cv.Mat([h, w], cv.CV_8UC1);
  thresholded = new cv.Mat([h, w], cv.CV_8UC1);
}

function cvReady() {
  if (!cv || !cv.loaded) return false;
  if (ready) return true;
  cvSetup();
  ready = true;
  return true;
}