// https://kylemcdonald.github.io/cv-examples/

var capture;
const w = 640 / 4; // 4
const h = 480 / 4; // 4
const canvasScale = 50;
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
  capture.parent('livefeed-container');
  capture.style('margin-top', '55%');
  // capture.hide();

  for (let c = 0; c < 4; c++) {
    layerGraphics.push(createGraphics(canvasWidth / 2, canvasHeight / 2));
    layerGraphics[c].background('#fffffa');

  }
  risoCanvas = createCanvas(canvasWidth, canvasHeight);
  risoCanvas.parent('riso-container');
  background('#fffffa');

  document.getElementById('livefeed-container').style.width = canvasWidth;
  document.getElementById('livefeed-container').style.height = canvasHeight;

  const alpha = 150;
  const pink = color(326, 81, 156, alpha);
  const orange = color(241, 115, 119, alpha);
  const violet = color(157, 121, 210, alpha);
  const yellow = color(255, 231, 0, alpha);
  const mint = color(131, 216, 213, alpha);
  const darkblue = color(61, 84, 135, alpha);

  colors = [darkblue, pink, mint, yellow];

  frameRate(15); // make frameRate 10 FPS
}

var captureMat, gray, blurred, thresholded;
var contours, hierarchy;
function cvSetup() {
  captureMat = new cv.Mat([h, w], cv.CV_8UC4);
  gray = new cv.Mat([h, w], cv.CV_8UC1);
  blurred = new cv.Mat([h, w], cv.CV_8UC1);
  thresholded = new cv.Mat([h, w], cv.CV_8UC1);
}

var ready = false;
function cvReady() {
  if (!cv || !cv.loaded) return false;
  if (ready) return true;
  cvSetup();
  ready = true;
  return true;
}

function draw() {
  if (cvReady() && captureReady && !eventOver) {
    capture.loadPixels();
    if (capture.pixels.length > 0) {
      if (!backgroundPixels) {
        backgroundPixels = Array.from(capture.pixels);
      }

      var i = 0;
      var pixels = capture.pixels;
      var thresholdAmount = (select("#thresholdAmount").value() * 255) / 100;
      var total = 0;
      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          // another common type of background thresholding uses absolute difference, like this:
          // var total = Math.abs(pixels[i+0] - backgroundPixels[i+0] > thresholdAmount) || ...
          var rdiff =
            Math.abs(backgroundPixels[i + 0] - pixels[i + 0]) > thresholdAmount;
          var gdiff =
            Math.abs(backgroundPixels[i + 1] - pixels[i + 1]) > thresholdAmount;
          var bdiff =
            Math.abs(backgroundPixels[i + 2] - pixels[i + 2]) > thresholdAmount;
          var anydiff = rdiff || gdiff || bdiff;
          var outputColor = [0, 0, 0];
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
      image(capture, 0, 0, w, h);

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

    if (contours && contours.size() >= 0) {
      noStroke();
      for (var i = 0; i < contours.size(); i++) {
        fill(colors[colorIndex]);
        var contour = contours.get(i);
        beginShape();
        var k = 0;
        for (var j = 0; j < contour.total(); j++) {
          var x = contour.get_int_at(k++);
          var y = contour.get_int_at(k++);
          vertex(xPos + x, yPos + y);
        }
        endShape(CLOSE);
        stroke(colors[colorIndex]);
      }

      if (xPos < canvasWidth - w - bleedBuffer) {
        xPos += w / 2;
      } else if (yPos < canvasHeight - h - h / 2 - bleedBuffer) {
        yPos += h;
        xPos = bleedBuffer;
      } else if (yPos >= canvasHeight - h - h / 2 - bleedBuffer && colorIndex < colors.length - 1) {
        // One color completed!
        xPos = bleedBuffer;
        yPos = bleedBuffer;
        // saveCanvas(risoCanvas,"layer_"+colorIndex,"png");
        colorIndex++;
      } else {
        // Finished!
        // saveCanvas(risoCanvas,"layer_"+colorIndex,"png");
        eventOver = true;
      }
    }
  }

  // image(layerGraphics[0], -100, -100);
  // image(capture, xPos, yPos, w, h);
  // background(0, 0, 0);
}
