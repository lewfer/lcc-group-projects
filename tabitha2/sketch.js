var maxX

function preload() {
  // Load up the medals table data
  table = loadTable('medals_table.csv', 'csv', 'header');
}

function setup() {
  var c = createCanvas(800, 1000);
  //noLoop()
  
  // Get max medals so we can set the x axis max value
  maxX = max(table.getColumn('gold'))

  print(table)

  frameRate(2)
}

function sortData() {
  let swapped = false
  print(table.rows.length)

  for (var r = 0; r < table.rows.length-1; r++) {
    first = table.rows[r].obj.gold 
    second = table.rows[r+1].obj.gold
    print(table.rows[r].obj.country+first  + "-" + table.rows[r+1].obj.country+second)
    if(first < second ) {
      print("swap")
      tmp = table.rows[r]
      table.rows[r] = table.rows[r+1]
      table.rows[r+1] = tmp
      swapped = true
    }
  }
  if (!swapped) noLoop()
}

function draw() {
  background(255)
  
  var chartParams = {}

  // Draw the chart outline
  noFill()
  stroke(0)
  strokeWeight(1)
  rect(0,0,width,height)
  
  // Draw a horizontal bar chart
  HBarChart(table)

  sortData()
  print(table)
}

function HBarChart(data) {
  // Get number of rows (i.e. number of data points)
  var rowCount = data.getRowCount();

  // Get the column of gold medals
  let golds = data.getColumn("gold")
  
  // Define the drawing area
  drawingLeft = 130
  drawingRight = width - 50
  drawingTop = 50
  drawingBottom = height - 50

  // Compute width of the bar
  barGap = 2
  barHeight = (drawingBottom - drawingTop) / rowCount - barGap

  // Go through each row of data, drawing one bar for each row
  for (var r = 0; r < rowCount; r++) {
    var xVal = parseInt(golds[r],10);

    // For this row, compute the y coordinate of the top of the bar, mapping the row index r from data coordinates to screen coordinates
    var y = map(r, 0, rowCount, drawingTop, drawingBottom);

    // For this row, compute the x coordinate of the right of the bar, mapping number of medals to screen coordinates
    var x = map(xVal, 0, maxX, drawingLeft, drawingRight);

    // Draw the bar
    noStroke()
    fill(color(255,215,0))
    rect(drawingLeft, y-barHeight, x-drawingLeft, barHeight)

    // Draw the y-axis and labels
    push() // save the current drawing styles and transformations
    translate(drawingLeft-15, y)  // move the drawing origin back to the right hand side of the labels
    noStroke();
    fill('black')
    textSize(10);
    textAlign(RIGHT, BASELINE);
    text(table.get(r, "country"), 0, 0);
    pop() // restore the current drawing styles and transformations
  }

  // Draw the title
  posx = this.width / 2
  posy = 40
  noStroke();
  fill('black')
  textAlign(CENTER, BASELINE);
  textSize(15);
  text("Olympics 2016", posx, posy);  
}


