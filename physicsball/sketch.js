/* 
 Example showing how a simple physics engine works
 
 Accely models gravity
 Accelx models friction
 */

// Create a ball
let thing = {
  x:200, y:20,              // position
  w:20, h:20,               // size
  velx:5, vely:0,           // velocity (sign dictates direction)
  accely:0.5, accelx:-0.01,  // accleration (+ve means speeding up, -ve means slowing down)
  elasticity:3}            // 0 is totally elastic, higher means less elastic

let floorHeight = 10

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  //print("pos:"+thing.x+","+thing.y+" vel"+thing.velx+","+thing.vely," accel:"+thing.accelx+","+ thing.accely)
  print(thing.y,thing.vely,thing.accely)
  
  //print(thing.x,thing.velx,thing.accelx)
  
  // Draw the ball at the current position
  stroke(1)
  ellipse(thing.x, thing.y, thing.w, thing.h)
  
  // Draw the floor
  noStroke()
  rect (0, height-floorHeight, width, floorHeight)
  
  // If we hit the floor, bounce 
  // by reversing the direction of vertical travel
  // The thud 
  if (thing.y > height-floorHeight-thing.h/2) {
    thing.vely = -abs(thing.vely)+min(thing.elasticity,abs(thing.vely))
    print("bounce")
  }

  // If we hit a wall, bounce
  // by reversing the direction of horizontal travel
  if (thing.x > width-thing.w/2) {
    thing.velx = -abs(thing.velx)
    thing.accelx = -thing.accelx
  }
  else if (thing.x < 0 + thing.w/2) {
    thing.velx = abs(thing.velx)
    thing.accelx = -thing.accelx
  }
  
  // If too slow x stop
  if (abs(thing.velx)<abs(thing.accelx)) {
    thing.velx=0
    thing.accelx=0
  }
  
  // If too slow y and on the floor stop
  if (thing.y>height-floorHeight-thing.h/2) {
    thing.y=height-floorHeight-thing.h/2
    if (abs(thing.vely)<1) {
    thing.vely=0
    thing.accely=0
  }
  }
  
  // On each draw cycle...
  
  //...adjust the velocity based on the acceleration
  thing.vely += thing.accely
  thing.velx += thing.accelx
  
  //...adjust the position based on the velocity
  thing.y += thing.vely
  thing.x += thing.velx
}