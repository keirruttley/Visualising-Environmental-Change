/*
This template visualises average temperature changes since 1880
https://data.giss.nasa.gov/gistemp/
*/
const HEADERTEXT = "Annual Global Temperature Fluctuation 1880 - 2023";
const TOPMARGIN = 52;
let averageTemps;
let currentYear;
let minTemp, maxTemp;
let hotColour, coldColour;
let vhc = 0;
// how much to rotate the circle by each frame
let rot = 0;
let theta = [];
let radius = [];
let textRadius = [];

// change opacity
let a = 255;
//change size
let circleSize = 10;
// gaussian
let gaussianRandom = 0;
// rotInc = Speed
let circleSpeed = 0.0025;

function preload() {
  table = loadTable("data/data.csv", "csv", "header");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  averageTemps = table.getColumn(13) // get the variation from the average temp for 1880 to 2023 
  currentYear = table.getColumn(0)
  // find the lowest value
  minTemp = min(averageTemps)
  // find the highest value
  maxTemp = max(averageTemps)
  // define 2 colours that will form either end of a range of possible colurs
  hotColour = color(255, 0, 0, a);
  coldColour = color(0, 0, 255, a);
  // use squared ends when draing strokes
  strokeCap(SQUARE)
  // centre text
  textAlign(CENTER, CENTER);
  // start Midi
  setupController();
  let r = height * 0.25
  for (let i = 0; i < 140; i++) {
    radius.push(averageTemps[i] * r)
    textRadius.push(r + 2)
    theta.push((2 * Math.PI / 10) * i)

  }

}

function draw() {
  background(0,15);

  textSize(36);
  fill(255)
  noStroke();
  text(HEADERTEXT, width / 2, TOPMARGIN / 2);

  translate(width / 2, height / 2);

  fill(0)
  stroke(255);
  strokeWeight(10)
  // circle(0, 0, r * 2);


  noStroke();
  // coords of each point
  let x, y;
  // how much to advance rotation of the circle by each frame
  let rotInc = circleSpeed;
  //colour based on temperature
  fill(lerpColor(coldColour, hotColour, 0.5, a))

  //stroke for circles
  strokeWeight(1);
  stroke(255);

  //Draws circles
  for (let i = 0; i < 10; i++) {
    x = cos(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    y = sin(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    tx = cos(theta[i] + rot) * textRadius[i];
    ty = sin(theta[i] + rot) * textRadius[i];
    // noStroke();
    // fill(255);
    circle(x, y, circleSize)
    ellipse(x, y)

    text(currentYear[i], tx, ty)
  }

  // once the circle has been rendered, increment the rotation value
  // no need to return rot to zero once TAU has been reached 
  // as the effective value will be the remainder when divided by TAU
  rot += rotInc;
}


/**
 * React to inputs from the control change sliders in the Midi controller
 * @param {Event} e 
 */
function allCC(e) {
  console.log('controller:', e.controller.number, 'value:', e.value);
  switch (e.controller.number) {
    case 32: {
      break;
    }
    case 33: {
      break;
    }
    case 34: {
      break;
    }
    case 35: {
      break;
    }
    case 36: {
      //slider 1
      // Change the alpha 
      a = 255 * e.value + 50; // + 50 so that opacity never goes to 0
      // define 2 colours that will form either end of a range of possible colurs
      hotColour = color(255, 0, 0, a);
      coldColour = color(0, 0, 255, a);
      break;
    }
    case 37: {
      //slider 2
      //changes size of cirlce
      circleSize = 200 * e.value + 10; // + 10 used so circle is always visible
      break;
    }
    case 38: {
      //slider 3
      //Changes the distribution of circles
      gaussianRandom = 50 * e.value;
      break;
    }
    case 39: {
      //slider 4
      //changes the speed of circles
      circleSpeed = 0.025 * e.value + 0.0025;
      break;
    }
  }
}

/**
 * React to inputs from the bottom buttons on the controller
 * @param {Event} e 
 */
function allNoteOn(e) {
  console.log('controller:', e.data[1], 'value:', e.value);
  switch (e.data[1]) {
    case 40: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 41: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 42: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 43: {
      if (e.value) {
      } else {
      }
      break;
    }
  }
}