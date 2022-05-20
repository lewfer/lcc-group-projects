let numBalls = 1
let countBalls = 0
let stackHeight = 20
let ballSize = 20
let dropSize = 5

let balls = []


function preload() {
  table = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 400);
  frameRate(30)
}

function draw() {
  background(220);

  // Get number of balls to drop from data file
  row = table.rows[0]
  print(row.obj.total)
  numBalls = row.obj.total
  numCO2 = row.obj.co2
  
  if (countBalls<numBalls) {
    randomCircle(numCO2/numBalls)
    countBalls++
  }
  
  // Draw all balls
  for (let i=0; i<balls.length; i++) {
    //print(balls[i])
    if (balls[i].colour==1)
      fill("red")
    else
      fill("white")
    circle(balls[i].x, balls[i].y,ballSize)

    // Drop ball further
    if (balls[i].y<height-stackHeight) {
      packCircle(i)
      //balls[i].y+=5
    }
  }

  //stackHeight+=0.1
}

function packCircle(i) {
  let c = balls[i]
  let stop=false
  for (var j = 0; j < balls.length; j++) {
    var other = balls[j];
    if (other != c) {
      var d = dist(c.x, c.y, other.x, other.y);
      if (d<ballSize+dropSize)
        stop = true
    }
  }
  if (!stop) {
    balls[i].y+=dropSize
    
  }
}


function randomCircle(ratio) {
  c = 0
  if (random()<ratio) c = 1

  while (true) {
    x = random(0, width)
    y = 20
    if (packCircleXY(x,y))
      break
  }

  balls.push({x:x, y:y, colour:c})
    //circle(random(0, width),20,20)
  
}



function packCircleXY(x,y) {
  for (var j = 0; j < balls.length; j++) {
    var other = balls[j];

      var d = dist(x, y, other.x, other.y);
      if (d<ballSize+dropSize)
        return false
    
  }
  return true
}