// Global variables
let angle = 0; // Angle variable for rotation
let song;
let snowflakes = []; // Array to store snowflake positions
let crystalBallPositionX = 0; // X-axis position of the crystal ball
let crystalBallPositionY = 0; // Y-axis position of the crystal ball

function preload() {
  font = loadFont('nabla.ttf');
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  //font
  textFont(font);
  textSize(50);
  text('hi', 10, 50);
  
  //song
  song.play();
  song.loop();
  song.setVolume(0.20);

  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: random(-120, 110), // Adjusted to fall around the center
      y: random(-120, 120), // Adjusted to fall around the center
      z: random(-100, 100),
      speedX: random(-1, 1),
      speedY: random(-1, 1),
      speedZ: random(1, 3)
    });
  }
}

function draw() {

  rotate(PI);
  fill(0);
  background(' #022348'); // Set canvas background color to light red
  
  drawCrystalBall(); // Call the function to draw the crystal ball
  drawChristmasTree(); // Call the function to draw the Christmas tree

  // Draw the minor segment of the crystal ball bottom as snow surface
  drawSnowSurface(200, 10); // Radius is half of the crystal ball's size

  // Draw snowflakes falling within the crystal ball
  drawSnowflakes();
  drawCrystalBallBase();
  drawCopyright();
  drawCopyright1();
  drawCopyright2();
  drawCopyright3();
  
  angle += 0.01;
}

function drawSnowSurface(radius, detail) {
  rotateX(600);
  fill('snow'); // White color for snow
  translate(0.0, -120);

  // Generate vertices for the semi-sphere using points
  beginShape(TRIANGLE_STRIP);
  for (let i = 2; i < detail / 2; i++) {
    for (let j = 0; j < detail + 1; j++) {
      let x = radius * cos(TWO_PI * j / detail) * cos(PI * i / detail);
      let y = radius * sin(PI * i / detail);
      let z = radius * sin(TWO_PI * j / detail) * cos(PI * i / detail);
      vertex(x, y, z);

      x = radius * cos(TWO_PI * j / detail) * cos(PI * (i + 1) / detail);
      y = radius * sin(PI * (i + 1) / detail);
      z = radius * sin(TWO_PI * j / detail) * cos(PI * (i + 1) / detail);
      vertex(x, y, z);
    }
  }
  endShape();
}

function drawCrystalBall() {
rotateY(angle);
stroke('white'); // Set stroke color with changing R value
noFill();
translate(0, 0);
sphere(196);
}

function drawCrystalBallBase() {
  translate(0, 190, 0);
  noStroke();
  fill(0);
  cylinder(180, 20); // Create the cylinder for the crystal ball base
  // Draw text along the base surface
}

function drawChristmasTree() {
  translate(0, 0, -100);
  translate(0, 0, 100);
  noStroke();

  // Draw the Christmas tree
  fill(34, 139, 34);
  cone(100, 200);

  // Draw the tree's trunk
  fill(139, 69, 19);
  cylinder(20, 50);

  // Draw the Christmas tree trunk below the tree
  translate(0, -120, 0);
  cylinder(30, 90);
}

function drawSnowflakes() {
  for (let flake of snowflakes) {
    let snowflakeSize = 1; // Size of snowflake

    push();
    translate(flake.x, flake.y, flake.z);
    stroke(255, 255,random(190,255));
    beginShape();
    for (let j = 0; j < TWO_PI; j += PI / 3) {
      let radius = snowflakeSize / 2;
      let snowflakeX = cos(j) * radius;
      let snowflakeY = sin(j) * radius;
      vertex(snowflakeX , snowflakeY );
      vertex(snowflakeX * 5, snowflakeY * 5);
    }
    endShape(CLOSE);
    pop();

    // Update snowflake position for falling motion within the crystal ball
    flake.x += flake.speedX*1.5;
    flake.y += flake.speedY;
    flake.z += flake.speedZ;

    // Reset snowflake position if it goes beyond the crystal ball's interior
    if (flake.z > 40) {
      flake.z = random(-100, 100);
      flake.x = random(-100, 100);
      flake.y = random(-100, 100);
    }  
  }
  
}

function drawCopyright() {
  push();
  translate(0, -290, 200); // Adjust the Y and Z coordinates for positioning
  fill(255, 255,random(255) );
  ambientMaterial(0, 255, 255);
  textSize(20);
  scale(1,1);
  text('Merry Christmas &', -60, -80);
  pop();
}

function drawCopyright1() {
  push();
  translate(0, -290, -200); // Adjust the Y and Z coordinates for positioning
  fill(255, 255,random(255) );
  ambientMaterial(0, 255, 255);
  textSize(20);
  scale(-1,1);
  text('Code A Tree', -60, -80);
  pop();
}

function drawCopyright2() {
  push();
  translate(10, -270, 200); // Adjust the Y and Z coordinates for positioning
  fill(255, 255,random(255) );
  ambientMaterial(0, 255, 255);
  textSize(20);
  scale(1,1);
  text('Happy New Year', -60, -80);
  pop();
}

function drawCopyright3() {
  push();
  translate(20, -270, -200); // Adjust the Y and Z coordinates for positioning
  fill(255, 255,random(255) );
  ambientMaterial(0, 255, 255);
  textSize(20);
  scale(-1,1);
  text('Made By Shifiyy', -60, -80);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
}