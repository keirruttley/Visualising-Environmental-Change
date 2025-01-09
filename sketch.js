/*
This template visualises average temperature changes since 1880
https://data.giss.nasa.gov/gistemp/
*/
const HEADERTEXT = "Annual Global Temperature Fluctuation 1880 - 2023";
const TOPMARGIN = 52;
let averageTemps = [];
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
// year change
let yearButton = 0;

function preload() {
  table = loadTable("data/data.csv", "csv", "header");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let rowI = 0; rowI < 40; rowI++) {
    for (let colI = 0; colI < 12; colI++) {
      averageTemps.push(table.get(rowI, colI));
    }
  }
  // averageTemps.push(table.get(38, 17));
  print(averageTemps)
  // get the variation from the average temp for 1880 to 2023 
  // currentMonth = table.getRow(0)
  // find the lowest value
  // var t = averageTemps.length;
  // while (t--) {
  //   // averageTemps.splice((t + 1) * 1 - 1, 1);
  //   // averageTemps.splice((t + 1) * 13 - 1, 1);
  //   // averageTemps.splice((t + 1) * 14 - 1, 1);
  //   // averageTemps.splice((t + 1) * 15 - 1, 1);
  //   // averageTemps.splice((t + 1) * 16 - 1, 1);
  //   // averageTemps.splice((t + 1) * 17 - 1, 1);
  //   // averageTemps.splice((t + 1) * 18 - 1, 1);
  // }
  //  console.log(averageTemps);

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
  let year = yearButton
  // for (let i = (0 + (10 * year)); i < (9 + (10 * year)); i++) {
  //   radius.push(averageTemps[i] * r)
  //   textRadius.push(r + 2)
  //   theta.push((2 * Math.PI / 10) * i)
  //}
  calculate();
}

function calculate() {
  let year = yearButton
  r = height * 0.25
  radius = [] 
  textRadius = []
  theta = []
  for (let i = (0 + (10 * year)); i < (9 + (10 * year)); i++) {
    radius.push(averageTemps[i] * r)
    textRadius.push(r + 2)
    theta.push((2 * Math.PI / 10) * i)
  }
}



function draw() {
  background(0, 15);

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
  // stroke(255);

  //Draws circles
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

    ellipse(x, y)
    stroke(0)
    strokeWeight(1)
    fill(225)
    // rotate((theta[i]) * (PI/2)/6)
    // rotate(tan(-x/y));
    // textAlign(CENTER, CENTER)
    text(months[i], tx, ty)
    // rotate(-(tan(-x/y)));
    pop();
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
      a = 255 * e.value + 20; // + 50 so that opacity never goes to 0
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
        //button 1
        yearButton = 0;
        calculate();
      } else {
      }
      break;
    }
    case 41: {
      if (e.value) {
        //button 2
        yearButton = 1;
        calculate();
      } else {
      }
      break;
    }
    case 42: {
      if (e.value) {
        //button 3
        yearButton = 2;
        calculate();
      } else {
      }
      break;
    }
    case 43: {
      if (e.value) {
        //button 4
        yearButton = 3;
        calculate();
      } else {
      }
      break;
    }
  }
}
