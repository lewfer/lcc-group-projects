//y=0.01x^2-200 - this is the equation of the parabola
var x = -200
var y; //creates variable "y"
let n = 0

function setup() {
  createCanvas(400, 400); //sets the canvas size to 400,400
  background(255); //sets a white background
    fill(0, 0, 255); //makes the ellipses blue
  /*
  translate(200, 200); //sets the origin to the center
  for (var a = -200; a < 400; a = a + 10) { 
    y = 200 - (-0.01 * a * a + 200)
    ellipse(a, y, 15, 15); 

  }
  */
  
}

function drawArc(x1, x2) {
  translate(200, 200);
  line(-200,0,200,0)
  line(0, -200,0,200)
  x += 10
  
  fill(255, 0, 0)
  y = 200 - (-0.02 * x * x + 200)
  ellipse(x, y, 15, 15); 
  /*
  fill(0, 0, 255)
  y = 200 - (-0.01 * (x-100)**2 + 300)
  ellipse(x, y, 15, 15); */
}

data = [{died:40, expected:75}, {died:25, expected:45}]



function draw() {
  background(255)
  
  if (n>=data.length)
    return
    
    let d = data[n]
    drawArc(d.died, d.expected) 
  
  if (x>=200) {
    n++
    x = -200
  }


}