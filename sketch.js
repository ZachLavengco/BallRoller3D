let posBall
let posPlatform
let obstacle
let speed
let dir
let directionUp
let moving

function preload() {
  img = loadImage('matrix.jpg');
  img2 = loadImage('lost.jpg');
}

function setup() {
  createCanvas(windowWidth-100, windowHeight-50, WEBGL)
  camera(0, -100, (height/2 + 50) / tan(PI/4.5), 0, 0, 0, 0, 1, 0)
  posBall = createVector(0,0,0)
  posPlatform = createVector(0,0,0)
  obstacle = createVector(0,0,0)
  obstacle2 = createVector(0,0,0)
  obstacle3 = createVector(0,0,0)
  
  moving = 0
  speed = 0.8
  dir = 0
  directionUp = 5
  
  posPlatform.x = 0
  posPlatform.y = 90
  posPlatform.z = -3000
  
  obstacle.x = 0
  obstacle.y = -50
  obstacle.z = 0
  
  obstacle2.x = random(-200,0)
  obstacle2.y = random(-150,-100)
  obstacle2.z = 0
  
  obstacle3.x = random(0,200)
  obstacle3.y = random(-150,-100)
  obstacle3.z = 0

}

function draw() {
  background(250)
  push();
  translate(0, 1000, -3000);
  texture(img);
  plane(width*9.58, height*9.3);
  pop();
  moving = frameCount * 0.02 * speed
  
  push()
  fill(80,100,250,200)
  translate(0,0,0)
  translate(posBall.x,posBall.y,posBall.z)
  rotateX(moving*2)
  sphere(40)
  pop()
  speed += 0.00001
  
  // create platform
  translate(posPlatform.x,posPlatform.y,posPlatform.z)
  fill(10,255,10,180)
  box(500,100,95000)
  
  // obstacle1 (jump over it)
  push()
  translate(obstacle.x,obstacle.y,obstacle.z)
  obstacle.z += moving
  fill(255,100,10,180)
  box(550,80,50)
  pop()
  // console.log(obstacle.z)
  if (obstacle.z >= 4000) {
    obstacle.z = random(-4000, -3200)
  }
  
  // obstacle2 (move around it)
  push()
  translate(obstacle2.x,obstacle2.y,obstacle2.z+2000)
  obstacle2.z += moving
  fill(255,100,10,180)
  box(100,100,10)
  if (obstacle2.z >= 4000) {
    obstacle2.z = random(-4000, -3200)
    obstacle2.x = random(-200,0)
    obstacle2.y = random(-150,-100)
  }
  pop()
  // if (((floor(obstacle2.z)) % 1000) == 0) {
  //   console.log(obstacle2.z)
  // }
  
  // obstacle3 (move around it)
  push()
  translate(obstacle3.x,obstacle3.y,obstacle3.z+1500)
  obstacle3.z += moving
  fill(255,100,10,180)
  box(100,100,10)
  if (obstacle3.z >= 4000) {
    obstacle3.z = random(-4000, -3200)
    obstacle3.x = random(0,200)
    obstacle3.y = random(-150,-100)
  }
  pop()
  
  
  // ball movement
  if (key === 'ArrowRight' && (directionUp == 5 || directionUp == -5.25)) {
    posBall.x += dir
    dir += 0.09
  }
  if (key === 'ArrowLeft' && (directionUp == 5 || directionUp == -5.25)) {
    posBall.x += dir
    dir -= 0.09
  }
  if (key === ' ') {
    if (dir > 0) {
      posBall.x += dir
    } else if (dir < 0) {
      posBall.x += dir
    }
    if (directionUp <= 5 && directionUp >= -5) {
      posBall.y -= directionUp
      directionUp -= 0.25  
    }
  }
  
  //// collision
  // wide object 
  var d = dist(0, posBall.y, 0, obstacle.x, obstacle.y + 60, obstacle.z - 3010)
  //console.log("distance " + d)
  //console.log("obstacleX " + obstacle.x)
  //console.log("yDiff " + (posBall.y + obstacle.y + 60))
  //console.log("zDiff " + (obstacle.z - 3010))
  if (d <= 50) {
    endGame()
  }
  // vertical object 1
  var d2 = dist(posBall.x, posBall.y, 0, obstacle2.x, obstacle2.y + 60, obstacle2.z - 1000)
  //console.log("distance " + d2)
  //console.log("zDiff " + (obstacle2.z - 330))
  if (d2 <= 95) {
    endGame()
  }
  // vertical object 2
  var d3 = dist(posBall.x, posBall.y, 0, obstacle3.x, obstacle3.y + 60, obstacle3.z - 1500)
  //console.log("distance " + d2)
  //console.log("zDiff " + (obstacle2.z - 330))
  if (d3 <= 95) {
    endGame()
  }

  
  
  // if ball falls off platform
  if (posBall.x < -275 || posBall.x > 275) {
    posBall.y += 3
    if (posBall.y > 100) {
      endGame()
    }
  }
} 

function keyPressed() {
  if (key === ' ' && directionUp <= -5) {
    directionUp = 5 
  }
}

function endGame() {
  dir = 0
  speed = 0
  camera(0, -50, (height/2 + 500) / tan(PI/4.5), 0, 0, 0, 0, 1, 0)
  translate(0, -500, -2500);
  texture(img2);
  plane(width*10, height*10);
}