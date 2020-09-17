// https://kylemcdonald.github.io/cv-examples/

let capture;
let img;
const w = 640/4;
const h = 480/4;
const canvasScale = 50;

let xPos = 0;
let yPos = 0;

function setup() {
  capture = createCapture(
    {
      audio: false,
      video: {
        width: w,
        height: h
      }
    },
    function() {
      console.log("capture ready.");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.size(w, h);
  createCanvas(11*canvasScale, 17*canvasScale);
  background(0, 0, 0);
  capture.hide();

  img = createImage(w, h);
  img.loadPixels();

}

let backgroundPixels;

function resetBackground() {
  backgroundPixels = undefined;
}

function getRadioValue(name) {
  var inputs = selectAll("input");
  for (var i = 0; i < inputs.length; i++) {
    var x = inputs[i];
    if (name == x.elt.name && x.elt.checked) {
      return x.elt.value;
    }
  }
}

function copyImage(src, dst) {
  var n = src.length;
  if (!dst || dst.length != n) {
    dst = [];
  }
  while (n--) {
    dst[n] = src[n];
  }
  return dst;
}

function draw() {
  capture.loadPixels();
  if (capture.pixels.length > 0) {
    // don't forget this!
    if (!backgroundPixels) {
      // backgroundPixels = copyImage(capture.pixels, backgroundPixels);
      console.log("RESETTING PIXELS");
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
    var n = w * h;
    var ratio = total / n;
    // select("#presence").elt.innerText = int(100 * ratio) + "%";
    capture.updatePixels();
    xPos++;
    yPos++;
  }
  tint(0, 153, 204); // Tint blue
  image(capture, xPos, yPos, w, h);
}
