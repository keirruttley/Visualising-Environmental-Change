/*
This template visualises average temperature changes since 1880
https://data.giss.nasa.gov/gistemp/
*/
const HEADERTEXT = "Annual Global Temperature Fluctuation 1880 - 2023";
const TOPMARGIN = 52;
let averageTemps;
// let currentMonth;
let minTemp, maxTemp;
let hotColour, coldColour;
let vhc = 0;
// how much to rotate the circle by each frame
let rot = 0;
let theta = [];
let radius = [];
let textRadius = [];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
  // currentMonth = table.getRow(0)
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
  for (let i = 0; i < 10; i++) {
    radius.push(averageTemps[i] * r)
    textRadius.push(r + 2)
    theta.push((2 * Math.PI / 10) * i)

  }

}

function draw() {
  let r = height * 0.25

  background(0);

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
  // draw a circle
  // define radius
  // let r = height * 0.25
  // coords of each point
  let x, y;
  // an index used to access the relevant temp data
  let i = 0;
  // controls the length of each line drawn
  let len = 100;
  // how much to advance rotation of the circle by each frame
  let rotInc = circleSpeed;
  fill(lerpColor(coldColour, hotColour, 0.5, a))
  stroke(lerpColor(coldColour, hotColour, 0.5, a))

  strokeWeight(1);
  // stroke(255);

  for (let i = 0; i < 10; i++) {
    // rotate(0)
    fill(lerpColor(coldColour, hotColour, 0.5, a))
    stroke(lerpColor(coldColour, hotColour, 0.5, a))
    push();
    x = cos(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    y = sin(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    tx = cos(theta[i] + rot) * textRadius[i];
    ty = sin(theta[i] + rot) * textRadius[i];
    // noStroke();
    // fill(255);
    circle(x, y, circleSize)

    stroke(255)
    strokeWeight(1)
    fill(255)
    // rotate((theta[i]) * (PI/2)/6)
    // rotate(tan(x/y))
    textAlign(CENTER, CENTER)
    text(months[i], tx, ty)
    pop();
    //     //   creates circles for data points
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
      // the should change the alpha 
      a = 255 * e.value;
      // define 2 colours that will form either end of a range of possible colurs
      hotColour = color(255, 0, 0, a);
      coldColour = color(0, 0, 255, a);
      break;
    }
    case 37: {
      //slider 2
      circleSize = 200 * e.value + 10;
      break;
    }
    case 38: {
      //slider 3
      gaussianRandom = 50 * e.value;
      break;
    }
    case 39: {
      //slider 4
      circleSpeed = 1 * e.value;
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