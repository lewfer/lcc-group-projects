// P_2_2_4_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * limited diffusion aggregation
 *
 * KEYS
 * 1             : toggle draw original position of circles
 * s             : save png
 */
'use strict';

var maxCount = 5000; // max count of the cirlces
var currentCount = 1;
var x = [];
var y = [];
var r = [];
var c = [];
var x2 = [];
var y2 = [];

var drawGhosts = false;

// Parameters
let numMonths = 12
let bigCircle = 360
let framesPerSec = 20
let minRadius = 1
let maxRadius = 7
let currentFrame = 0

let data = [{usa:8, china:9783}, 
            {usa:17, china:69468},
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}, 
            {usa:17, china:69468}]

let build = [{month:0, usa:2, china:6},
            {month:0, usa:2, china:6},
            {month:1, usa:2, china:6},
            {month:1, usa:2, china:6},
            {month:2, usa:2, china:5},
            {month:2, usa:3, china:5},
            {month:3, usa:3, china:5},
            {month:3, usa:4, china:5},
            {month:4, usa:4, china:4},
            {month:4, usa:4, china:4},
            {month:5, usa:4, china:3},
            {month:5, usa:4, china:3},
            {month:6, usa:5, china:3},
            {month:6, usa:5, china:3},
            {month:7, usa:5, china:2},
            {month:7, usa:5, china:2},
            {month:8, usa:6, china:2},
            {month:8, usa:6, china:2},
            {month:9, usa:6, china:1},
            {month:9, usa:6, china:1},
            {month:10, usa:7, china:1},
            {month:10, usa:7, china:1},

            {month:11, usa:10, china:2},
            {month:11, usa:10, china:2},
            {month:11, usa:10, china:2},
            {month:11, usa:10, china:2},
            {month:11, usa:10, china:2},
            {month:11, usa:10, china:2},
            {month:11, usa:8, china:2},
            {month:11, usa:8, china:2},
            {month:11, usa:8, china:0},
            {month:11, usa:8, china:0},
            {month:11, usa:8, china:0},
            
            {month:11, usa:6, china:0},
            {month:11, usa:6, china:0},
            {month:11, usa:6, china:0},
            {month:11, usa:6, china:0},
            {month:11, usa:6, china:0},
            {month:11, usa:6, china:0},

            
            {month:11, usa:4, china:0},
            {month:11, usa:4, china:0},
            {month:11, usa:4, china:0},
            {month:11, usa:2, china:0},
            {month:11, usa:2, china:0},
            {month:11, usa:2, china:0},

          ]
            

function setup() {
  createCanvas(800, 800);

  // first big circle
  x[0] = width / 2;    // centre
  y[0] = height / 2;   // centre
  r[0] = bigCircle;    // radius

  // Create initial seed circles for the years at even spacing around the big circle
  for (let month=0; month<numMonths; month++) {
    let angle = month*PI*2/12
    let newX = bigCircle*cos(angle)+width / 2
    let newY = bigCircle*sin(angle)+height / 2  
    x[1+month] = newX;
    y[1+month] = newY;
    r[1+month] = 5;
    c[1+month] = "white"
  }
  currentCount+=numMonths
  
  frameRate(framesPerSec)
}

function draw() {
  clear();

  strokeWeight(0.5);
  noFill();

  drawCircle(build[currentFrame].month, build[currentFrame].month.china, "blue")
  drawCircle(build[currentFrame].month, build[currentFrame].month.usa, "green")


  
  currentFrame++

    if (currentFrame >= build.length) noLoop();
}


function drawCircle(month, size, colour) {
    // create a random set of parameters
  var newR = size //random(minRadius, maxRadius); // radius
  var month = month + random(-0.25,0.25) // Math.round(random(0,numMonths-1),0) + random(-0.5,0.5)
  var angle = month*PI*2/12
  var distance = random(300,340)
  
  // Red dot
  var newX = distance*cos(angle)+400
  var newY = distance*sin(angle)+400
  fill("red")
  ellipse(newX,newY,10,10)
  print(month, newX,newY,angle,distance)
  
  //var newX = 500+random(-5,5)
  //var newY=600+random(-5,5)

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  
  // which circle is the closest?
  for (var i = 1; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }


  // align it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x2[currentCount] = newX;
  y2[currentCount] = newY;
  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  c[currentCount] = colour
  currentCount++;
 
  for (var i = 0; i < currentCount; i++) {
    if (i == 0) {
      noFill();
    } else {
      fill(c[i]);
    }
    ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
  }

}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawGhosts = !drawGhosts;
}
