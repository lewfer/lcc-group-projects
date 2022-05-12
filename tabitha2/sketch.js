var maxX
var columns = ["c1","c2","c3"]
var currentCol = 0
var title = "Olympics"

function preload() {
  // Load up the medals table data
  table = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  var c = createCanvas(800, 1000);
  //noLoop()
  
  // Get max medals so we can set the x axis max value
  maxX = max(table.getColumn(columns[currentCol]))

  print(table)

  frameRate(10)
}

// Perform one pass of a bubble sort
function sortData(columnName) {
  let swapped = false
  //print(table.rows.length)

  for (var r = 0; r < table.rows.length-1; r++) {
    firstBar = parseInt(table.rows[r].obj[columnName],10)
    secondBar = parseInt(table.rows[r+1].obj[columnName],10)
    //print(table.rows[r].obj.country+first  + "-" + table.rows[r+1].obj.country+second)
    if(firstBar < secondBar ) {
      table.rows[r].smaller = true
      table.rows[r+1].bigger = true
      //print("swap")
      tmp = table.rows[r]
      table.rows[r] = table.rows[r+1]
      table.rows[r+1] = tmp
      swapped = true
    }
  }
  return swapped
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
  HBarChart(table, columns[currentCol])

  // Perform one pass of a bubble sort
  let swapped = sortData(columns[currentCol])
  if (!swapped) {
    // If no swaps we can move to the next column
    currentCol++
    if (currentCol >= columns.length) {
      noLoop()
      // When we have no more data, redraw the chart without the highlight colour and stop looping
      HBarChart(table, columns[currentCol-1])
    }
    print("col " + currentCol)
  }
}

function HBarChart(data,columnName) {
  // Get number of rows (i.e. number of data points)
  var rowCount = data.getRowCount();

  // Get the column of values
  let values = data.getColumn(columnName)
  
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
    var xVal = parseInt(values[r],10);

    // For this row, compute the y coordinate of the top of the bar, mapping the row index r from data coordinates to screen coordinates
    var y = map(r, 0, rowCount, drawingTop, drawingBottom);

    // For this row, compute the x coordinate of the right of the bar, mapping number of medals to screen coordinates
    var x = map(xVal, 0, maxX, drawingLeft, drawingRight);

    // Draw the bar
    noStroke()
    if (table.rows[r].bigger) {
      fill(color(0,215,0))
      table.rows[r].bigger = false
    }
    else
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
  text(title, posx, posy);  
}


