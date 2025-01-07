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
  // define 2 colours that will form either end of a range of possible colurs
  hotColour = color(255, 0, 0)
  coldColour = color(0, 0, 255)
  // use squared ends when draing strokes
  strokeCap(SQUARE)
  // centre text
  textAlign(CENTER, CENTER);
  // start Midi
  setupController();
  let r = height * 0.25
  for (let i = 0; i < 10; i++) {
    radius.push(averageTemps[i] * r)
    theta.push((2 * Math.PI / 10) * i)
  }

}

const temps = [averageTemps];
let dCount = 1;

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
  
  circle(0, 0, r * 2);
  // draw header text
  // the thickness of each line drawn
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
  let rotInc = 0.0025;
  fill(lerpColor(coldColour, hotColour, 0))


  // we want a circle with a number of points that matches the temp data
  // loop from 0 to TAU using the available data to define an increment to the angle theta ie  +=TAU/(averageTemps.length-1)
  // however, because we are progressively rotating the circle
  // we use an offset rot to control the start and end of the loop
  // for (let theta = rot; theta < TAU + rot; theta += TAU / (1)) {
    
  //   for (let i = 0; i < 10; i++) {
  //     let xValues = [cos(theta) * (averageTemps[i] * r) + width / 2];
  //   }
  //   for (let l = 0; l < 10; l++) {
  //   let yValues = [sin(theta) * (averageTemps[l] * r) + height / 2];
  //   }
  //   for (let j = 0; j < 10; j++) {
  //     setTimeout(function () {
  //     //   // calculate a value from 0 tod on the current temp value compared to precalculated min and max temp values
      
  //     // x = cos(theta) * delta + width / 2;
  //     // y = sin(theta) * delta + height / 2;
  //     //   
  //     circle(xValues[j], yValues[l], 20, 20)
  //     //   creates circles for data points
  //     }, j * 500);
  //   }
  // }
  for (let i = 0; i < 10; i++) {
    x = cos(theta[i] + rot) * radius[i];
    y = sin(theta[i] + rot) * radius[i];
    circle(x, y, 20, 20)
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
      vhv = 255 * e.value;
      hotColour = color(vhc, 0, 0)
      break;
    }
    case 37: {
      break;
    }
    case 38: {
      break;
    }
    case 39: {
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