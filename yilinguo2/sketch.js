let numBalls = 50
let countBalls = 0

let balls = []

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  if (countBalls<numBalls) {
    randomCircle()
    countBalls++
  }
  
  // Draw all balls
  for (let i=0; i<balls.length; i++) {
    circle(balls[i].x, balls[i].y,20)
    if (balls[i].y<height-20)
      balls[i].y+=5
  }
}

function randomCircle() {
  balls.push({x:random(0, width), y:20})
    //circle(random(0, width),20,20)
  
}