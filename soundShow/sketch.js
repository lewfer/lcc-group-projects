// Shows a pre-recorded FFT spectrum analysis.  We don't need to play the sound to see the spectrum

// Paste recorded spectrum here
// It's an array of frames, one frame contains an array of the frequency breakdown
let spectrum = [[176,162,115,28,20,0,0,0,0,0,0,0,0,0,0,0],[204,189,140,60,45,14,0,0,0,0,0,0,0,0,0,0],[242,227,176,111,86,46,0,0,0,0,0,0,0,0,0,0],[247,232,184,113,88,44,0,0,0,0,0,0,0,0,0,0],[249,235,189,122,93,44,9,0,0,0,0,0,0,0,0,0],]

// Keep track of which "frame we are at"
let n = 0

function setup() {
  createCanvas(400, 400);

  // Set to number of frames per second
  frameRate(1)
}

function draw() {
  background(220);

  // Show spectrum
  noStroke();
  fill(255, 0, 255);

  // Draw the frame of the spectrum
  slice = spectrum[n]
  for (let j=0; j<slice.length; j++) {
    let x = map(j, 0, slice.length, 0, width);
    let h = -height + map(slice[j], 0, 255, height, 0);
    rect(x, height, width / slice.length, h )
  }

  // Move to next frame, stop if we have no more frames
  n++
  if (n==spectrum.length) {
    //noLoop()  // stop
    n = 0       // start again
  }
}