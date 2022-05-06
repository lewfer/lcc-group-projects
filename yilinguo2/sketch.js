let numBalls = 50
let countBalls = 0

let balls = []


function preload() {
  table = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

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
    circle(balls[i].x, balls[i].y,20)

    if (balls[i].y<height-20)
      balls[i].y+=5
  }
}

function randomCircle(ratio) {
  c = 0
  if (random()<ratio) c = 1
  balls.push({x:random(0, width), y:20, colour:c})
    //circle(random(0, width),20,20)
  
}