images = [{name:"inst.jpeg", x:30, y:80}, 
          {name:"person.png", x: 100, y: 200}]

imgs = []

function preload() {
  for (let i=0; i<images.length; i++) {
    imgs.push(loadImage(images[i].name))
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  for (let i=0; i<images.length; i++) {
    image(imgs[i], images[i].x, images[i].y, 50, 50);
  }
   
}