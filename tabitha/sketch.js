//y=0.01x^2-200 - this is the equation of the parabola
var x = 0
var yCurrent; //creates variable "y"
let n = 0


let data = [{died:40, expected:75}, {died:25, expected:45}]
let item = 0
let datum = data[0] // set to first item
let maxExpected = 100
let xScale 


function setup() {
  createCanvas(800, 400);   //sets the canvas size to 400,400
  background(255);          //sets a white background
  fill(0, 0, 255);          //makes the ellipses blue

  // How much to scale data values to fit the screen
  xScale = width / maxExpected
  
}

function draw() {
  background(255)

  // Move origin to half way down the screen
  translate(0, 200)
  line(0,0,width,0)

  // Move to next position
  x += 10

  // Draw the ball at the next position
  drawCurve(datum.expected*xScale, 100)

  // If we reach the end of the curve, start the next one
  if (y<=0) {
    print("next")
    x = 0
    item++

    // If we have run out of data stop looping
    if (item==data.length) {
      print("end")
      noLoop()
      return
    }
    
    // Move to next
    datum = data[item]
  }
}

// Draw a parabolic curve from x=0 to x=n with peak at y=k
function drawCurve(n, k) {
  // Constants to plug into quadratic forumula
  // See equation.docx for details of calcuation
  let a = 4*k / (-(n**2))
  let b = -a * n
  let c = 0

  //for (let x=0; x<=n; x+=10) {
    y = a * x**2 + b*x + c
    ellipse(x, -y, 15, 15); 
    //circle(x,-y,15)
  //}
}

