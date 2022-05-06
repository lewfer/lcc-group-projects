
let numMonths

function preload() {
  table = loadTable('data.csv', 'csv', 'header');
}
  
function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES)
  print(table)

  numMonths = table.rows.length
  monthAngle = 360 / numMonths
  print(numMonths)
}

function draw() {
  background(220);

  drawCircle(150, "china")
  drawCircle(450, "us")
}

function drawCircle(x, country) {
  push() // remember drawing params

  translate(x,200)
  circle(0,0,300)

  for (let i=0; i<numMonths; i++) {
    drawLine(table.getNum(i, country))
    rotate(monthAngle)
  }

  pop() // restore drawing params
}

function drawLine(num) {
  line(0,0,num,0)

  for (let i=0; i<num; i+=10) {
    circle(i,0,10)
  }
}