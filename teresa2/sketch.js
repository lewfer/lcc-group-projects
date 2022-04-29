function preload() {
  table = loadTable('migration_percent.csv', 'csv', 'header');
}
  
function setup() {
  createCanvas(800, 820);
  print(table.getColumn("1990"))
  //noLoop()
  //frameRate(2)
  angleMode(DEGREES); 
}

function draw() {
  background(220);
  
  push()
  noStroke()
  fill(0)
  textSize(30)
  textAlign(CENTER,CENTER)
  text("Migration Destinations 1990-2020", 400, 50)
  pop()
  
  translate(0, 80)
  
  // Compute the angle of each segment
  angle = 360/7
  
  // Keep track of total angle as we go
  totalAngle = 0 
  
  // Shift origin to centre of canvas
  translate(400, 400);
  
  // Loop through the years
  for (let year=1990; year<=2020; year+=5) {
    // Draw sement line
    stroke("grey")
    strokeWeight(1)
    line(0, 0, 300,0)
    
    // Draw the text
    noStroke()
    fill("black")
    push()
    translate(320,0)
    rotate(-totalAngle)
    textAlign(CENTER, CENTER)
    text(""+year, 0, 0)
    pop()
    
    // Check if we are in the segment
    if (isInSegment(angle, totalAngle)) {
      // Draw the circles for a single year
      drawRegionCircles(""+year, totalAngle)
    }
    
    // Rotate the coordinates to the next segment
    rotate(angle)
    totalAngle += angle
  }
}

// Rotate the mouse coordinates by the given angle around the given origin
function rotateMouse(translateX, translateY, angle) {
  // Translate the mouse to the new origin 
  let translatedMouseX = mouseX-translateX
  let translatedMouseY = mouseY-translateY

  // Rotate the mouse coordinates backwards by the angle
  rotatedMouseX = translatedMouseX * cos(-angle) - translatedMouseY * sin(-angle)
  rotatedMouseY = translatedMouseY * cos(-angle) + translatedMouseX * sin(-angle)
  
  return {x:rotatedMouseX, y:rotatedMouseY}
}

// Check if mouse is in the segment
function isInSegment(segmentAngle, totalAngle) {
  // Rotate the mouse position
  rmouse = rotateMouse(400, 480, totalAngle)
  
  // Compute the angle between the horizontal and the mouse
  v1 = createVector(200, 0)
  v2 = createVector(rmouse.x, rmouse.y)
  ab = v1.angleBetween(v2) 
  
  // Check if angle is in the segment
  return ab<segmentAngle/2 && ab>-segmentAngle/2
  
}

// Draw a single year of circles
function drawRegionCircles(year, totalAngle) {
  // Get the data
  let numCircles = table.getColumn("Region").length
  values = table.getColumn(year)
  region = table.getColumn("Region")
  x = 0
  
  // Loop though all data values for the year
  for (let i=0; i<numCircles; i++) {
    // Calculate the diameter based on the value
    d = values[i]*5
    
    // Move down half a cricle
    x += d / 2
    
    // Work out how far from mouse to centre of circle
    // Rotate the mouse position so it matches the circle coordinates
    rmouse = rotateMouse(400, 480, totalAngle)
    distToMouse = dist(x, 0, rmouse.x, rmouse.y)
    
    let colours = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00']
    // If mouse in circle choose red
    if (distToMouse<d/2) {
      if (region[i]=="Europe and Northern America")
        fill(colours[0])
      else if (region[i]=="Australia and New Zealand")
        fill(colours[1])
      else if (region[i]=="Sub-Saharan Africa")
        fill(colours[2])
      else if (region[i]=="Northern Africa and Western Asia")
        fill(colours[3])
      else if (region[i]=="Central and Southern Asia")
        fill(colours[4])
      else if (region[i]=="Eastern and South-Eastern Asia")
        fill(colours[5])
      else if (region[i]=="Latin America and the Caribbean")
        fill(colours[6])
      else if (region[i]=="Oceania (excluding Australia and New Zealand)")
        fill(colours[07])
      
      // Rotate the text back to horizontal
      push()
      rotate(-totalAngle)
      noStroke()
      fill(0)
      textSize(16)
      text(region[i], -360, -360)
      text(year, -360, -340)
      text(values[i] + "% of migrants", -360, -320)
      stroke(0)
      strokeWeight(4)
      line(-360, -300, -120, -300)
      pop()
      /*
      noStroke()
      push()
      translate(x, 0)
      rotate(-totalAngle)
      text(region[i] + " " + values[i], d/2+20, 0)
      pop()
      */
      
      stroke("black")
      strokeWeight(4)
      dd = d
      //dd = d*1.1   // make circle slightly bigger
    }
    else {
      //noFill()
      fill(220)
      stroke("black")
      strokeWeight(1)
      dd = d
    }
    
    // Draw circle
    circle(x, 0, dd)
    x += d / 2
  }
}