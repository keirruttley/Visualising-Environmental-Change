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
// how much to rotate the circle by each frame
let rot = 0;
// change opacity
let a = 0;
//change size
let circleSize = 10;
// gaussian
let gaussianRandom = 0;


function preload() {
  table = loadTable("data/data.csv", "csv", "header");
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  averageTemps = table.getColumn(13) // get the variation from the average temp for 1880 to 2023 
  currentYear = table.getColumn(1)
  // find the lowest value
  minTemp = min(averageTemps)
  // find the highest value
  maxTemp = max(averageTemps)

  hotColour = color(255, 0, 0, a);
  coldColour = color(0, 0, 255, a);
  // use squared ends when draing strokes
  strokeCap(SQUARE)
  // centre text
  textAlign(CENTER, CENTER);
  // start Midi
  setupController();
}


function draw() {
  let r = height * 0.25
  background(0);
  textSize(36);
  stroke(255);
  fill(0)
  circle(width * 0.5, height * 0.5, r * 2);
  noStroke();
  fill(255)
  // draw header text
  text(HEADERTEXT, width / 2, TOPMARGIN / 2);
  // the thickness of each line drawn
  strokeWeight(10)
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
  let rotInc = 0.0025;
  fill(lerpColor(coldColour, hotColour, 0, a));

  // we want a circle with a number of points that matches the temp data
  // loop from 0 to TAU using the available data to define an increment to the angle theta ie  +=TAU/(averageTemps.length-1)
  // however, because we are progressively rotating the circle
  // we use an offset rot to control the start and end of the loop
  for (let theta = rot; theta < TAU + rot; theta += TAU / (1)) {
    for (let j = 0; j < 10; j++) {
      setTimeout(function () {
        //   // calculate a value from 0 to 1 based on the current temp value compared to precalculated min and max temp values
        let delta = (averageTemps[j + 1] * r)
        //   // use trig to calculate Cartesian coords of circle 
        x = cos(theta) * delta + width / 2;
        y = sin(theta) * delta + height / 2;
        //   // use lerpColour to derive a colour value proportionally between cold and hot colours
        // stroke(lerpColor(coldColour, hotColour, delta))
        //   // extend a line from the edge of the circle inwards/outwards at a length relating to the temp data
        strokeWeight(1);
        stroke(255);
        circle(x, y, circleSize, circleSize);
        //   // increment the index used to access the correct temp data
      }, j * 300);

    }
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
      circleSize = 200 * e.value;
      break;
    }
    case 38: {
      //slider 3
      gaussianRandom = 50 * e.value;
      break;
    }
    case 39: {
      //slider 4

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