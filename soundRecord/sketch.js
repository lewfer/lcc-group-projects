// Records the FFT for some sounds.
// Captures both the wave and spectrum

// Set these up according to your capture parameters
let bins = 16             // number of bins per frame 
let frames = 5            // number of frames to record
let rate = 1              // frame rate (frames per second)
let soundFile = 'a.mp3'   // name of the mp3 file


let count = 1
let waveformFile
let spectrumFile

function preload(){
  // Load the sound file
  sound = loadSound(soundFile);
}

function setup() {
  createCanvas(400, 400);
  textSize(20)

  // Set up FFT for the sound file
  fft = new p5.FFT(0.8, bins);
  fft.setInput(sound)
  sound.loop()

  // Set to number of frames per second
  // Sound snapshot will be captured on each frame
  frameRate(rate)

  // Create files to write the output to
  waveformFile = createWriter('waveform.txt');
  waveformFile.write(['[']);
  spectrumFile = createWriter('spectrum.txt');
  spectrumFile.write(['[']);
}

function draw() {
  background(220);

  text("Frame " + count, 0, 20)

  // Capture the FFT analysis
  let spectrum = fft.analyze();
  let waveform = fft.waveform();

  // Write out spectrum data
  spectrumFile.write(['[']);
  spectrumFile.write(spectrum);
  spectrumFile.write(['],']);  
  
  // Write out waveform data
  waveformFile.write(['[']);
  waveformFile.write(waveform);
  waveformFile.write(['],']);

  // Stop when we reach the desired number of frames
  if (count>=frames) {
    sound.pause()
    noLoop()    
    spectrumFile.write([']']);
    spectrumFile.close();
    waveformFile.write([']']);
    waveformFile.close();
  }
 
  count++
}