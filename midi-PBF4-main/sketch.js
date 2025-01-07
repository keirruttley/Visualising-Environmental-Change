let diameter = 10;
let r = 0, g = 0, b = 0, a = 0;
let count = 0.001;
let fps = frameRate();

function setup() {
  createCanvas(400, 400);
  setupController();
}

function draw() {
  background(220);
  fill(r,g,b,a)
  for(let i = 0; i < 1000 * count; i ++){
  circle(random(width), random(height), diameter);
  }

}



/**
 * React to inputs from the control change sliders in the Midi controller
 * @param {Event} e 
 */
function allCC(e) {
  console.log('controller:', e.controller.number,'value:',  e.value);
  switch (e.controller.number) {
    case 32: {
      // dial 1
      count = 0.001 + 0.999 *e.value;
      break;
    }
    case 33: {
      //dial 2
      frameRate(10 * e.value);
      break;
    }
    case 34: {
      a = 255 * e.value;
      break;
    }
    case 35: {
      break;
    }
    case 36: {
      // slider 1
      diameter = 10 + 300 * e.value;
      break;
    }
    case 37: {
      // slider 2
      r = 255 * e.value;
      break;
    }
    case 38: {
      // slider 3
      g = 255 * e.value;
      break;
    }
    case 39: {
      // slider 4
      b = 255 * e.value;
      break;
    }
  }
}

/**
 * React to inputs from the bottom buttons on the controller
 * @param {Event} e 
 */
function allNoteOn(e) {
  console.log('controller:', e.data[1],'value:',  e.value);
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
