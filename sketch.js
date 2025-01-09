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
let rotVar = 0;
let rot = 0 + rotVar;
let trot = 0;
let theta = [];
let thetaT = [];
let radius = [];
let delta = [];
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

let tempZero = [
  "0°C",
];

// change opacity
let a = 100;
//change size
let circleSize = 10;
// gaussian
let gaussianRandom = 0;
// rotInc = Speed
let circleSpeed = 0.0025;
// year change
let decadeButton = 0;
let yearDial = 0;
// distance of where the circles place is expanded
let circleDistance = 0.25


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
  // print(averageTemps)

  minTemp = min(averageTemps);
  // find the highest value
  maxTemp = max(averageTemps);
  // define 2 colours that will form either end of a range of possible colurs
  hotColour = color(255, 0, 0, a);
  coldColour = color(0, 0, 255, a);
  // use squared ends when draing strokes
  strokeCap(SQUARE)
  // centre text
  textAlign(CENTER, CENTER);
  // start Midi
  setupController();
  calculate();
  // selectDraw();
}

function calculate() {
  let decade = decadeButton
  r = (height * circleDistance)
  textR = height * 0.25
  radius = []
  textRadius = []
  theta = []
  delta = [];
  for (let i = (0 + (10 * decade)); i < (120 + (10 * decade)); i++) {
    radius.push(averageTemps[i] * r)
    textRadius.push(textR + (r * 0.15))
    theta.push(((2 * Math.PI / 12) * i) * (0.25 * (Math.random() - 0.5)))
    thetaT.push(((2 * Math.PI / 12) * i))
    delta.push(map(averageTemps[i], minTemp, maxTemp, 0, 1));
    // print(radius)
  }
}



function draw() {
  background(0, 15);

  textSize(36);
  fill(255)
  noStroke();
  text(HEADERTEXT, width / 2, TOPMARGIN / 2);

  translate(width / 2, height / 2);

  // outer ring
  fill(0)
  stroke(255);
  strokeWeight(1)
  circle(0, 0, r * 2);

  // middle ring
  fill(0)
  stroke(255);
  strokeWeight(1)
  circle(0, 0, r);

  // inner ring
  fill(0)
  stroke(255);
  strokeWeight(1)
  circle(0, 0, r / 2);


  noStroke();
  // coords of each point
  let x, y;
  // how much to advance rotation of the circle by each frame
  let rotInc = circleSpeed;

  //stroke for circles
  strokeWeight(1);

  //Draws circles
  // for (let i = 0 + (10 * 1); i < 10 + (10 * 1); i++) {
  //   // for (let is = 0 + (10 * year); is < 12 + (10 * year); is++) {
  //     // rotate(0)
  
  //     // rotVar = 0.25 * (Math.random() - 0.5);
  //     // rot = 0 + rotVar;
  //     // let a = 255;
  //     let delta = map(averageTemps[i], minTemp, maxTemp, 0, 1)
  //     // print(delta)
  //     fill(lerpColor(coldColour, hotColour, delta, 255))
  //     stroke(lerpColor(coldColour, hotColour, delta, 255))
  //     // fill (255, 255, 255, 200)
  //     // stroke (255, 255, 255, 200)
  //     // push();
  //     x = cos(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
  //     y = sin(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
  //     // noStroke();
  //     // fill(255);
  //     //Draw circle
  //     circle(x, y, circleSize)
  //     stroke(0)
  //     strokeWeight(1)
  //     fill(225)
  //     // rotate(-(tan(-x/y)));
  //     // pop();
  //     // rotVar = 0;
  //     // print("test")
  //   }
  for (let i = 0; i < 120; i++) {
    // rotate(0)

    // rotVar = 0.25 * (Math.random() - 0.5);
    // rot = 0 + rotVar;
    
    // print(delta)
    fill(lerpColor(coldColour, hotColour, delta[i], a))
    stroke(lerpColor(coldColour, hotColour, delta[i], a))
    push();
    x = cos(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    y = sin(theta[i] + rot) * radius[i] + randomGaussian(1, gaussianRandom);
    tx = cos(thetaT[i] + rot) * textRadius[i];
    ty = sin(thetaT[i] + rot) * textRadius[i];
    // noStroke();
    // fill(255);
    //Draw circle
    circle(x, y, circleSize)

    ellipse(x, y)
    stroke(0)
    strokeWeight(1)
    fill(225)
    // rotate((theta[i]) * (PI/2)/6)
    // rotate(tan(-x/y));
    // textAlign(CENTER, CENTER)
    text(months[i], tx, ty)
    textSize(20)
    text(tempZero[i], tx / 2, ty / 2 + 5)

    // rotate(-(tan(-x/y)));
    pop();
    // rotVar = 0;

  }
  

  // trot += rotInc;
  // once the circle has been rendered, increment the rotation value
  // no need to return rot to zero once TAU has been reached 
  // as the effective value will be the remainder when divided by TAU
  rot += rotInc;

}

// function selectDraw() {
  
//   let yearDial = 0;
//   textSize(36);
//   fill(255)
//   noStroke();
//   // text(HEADERTEXT, width / 2, TOPMARGIN / 2);

//   translate(width / 2, height / 2);
//   let x, y;
//   let rotInc = circleSpeed;
//   let year = yearDial
//   for (let is = 0 + (10 * 1); is < 10 + (10 * 1); is++) {
//   // for (let is = 0 + (10 * year); is < 12 + (10 * year); is++) {
//     // rotate(0)

//     // rotVar = 0.25 * (Math.random() - 0.5);
//     // rot = 0 + rotVar;
//     // let a = 255;
//     let delta = map(averageTemps[is], minTemp, maxTemp, 0, 1)
//     // print(delta)
//     fill(lerpColor(coldColour, hotColour, delta, 255))
//     stroke(lerpColor(coldColour, hotColour, delta, 255))
//     // fill (255, 255, 255, 255)
//     // fill (255, 255, 255, 255)
//     // push();
//     x = cos(theta[is] + rot) * radius[is] + randomGaussian(1, gaussianRandom);
//     y = sin(theta[is] + rot) * radius[is] + randomGaussian(1, gaussianRandom);
//     // noStroke();
//     // fill(255);
//     //Draw circle
//     circle(x, y, 30)
//     stroke(0)
//     strokeWeight(1)
//     fill(225)
//     // rotate(-(tan(-x/y)));
//     // pop();
//     // rotVar = 0;
//     print("test")
//   }
//   rot += rotInc;
// }

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
      //changes radius postion of circle
      circleDistance = 1 * e.value + 0.25;
      calculate();
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
      // circleSpeed = 0.025 * e.value + 0.0025;
      circleSpeed = map(e.value, 0, 1, -0.0275, 0.0275);
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
        decadeButton = 0;
        calculate();
      } else {
      }
      break;
    }
    case 41: {
      if (e.value) {
        //button 2
        decadeButton = 1;
        calculate();
      } else {
      }
      break;
    }
    case 42: {
      if (e.value) {
        //button 3
        decadeButton = 2;
        calculate();
      } else {
      }
      break;
    }
    case 43: {
      if (e.value) {
        //button 4
        decadeButton = 3;
        calculate();
      } else {
      }
      break;
    }
  }
}
