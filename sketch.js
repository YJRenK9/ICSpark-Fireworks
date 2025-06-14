var textX;

// modes
var isHidden = false;
var isAuto = false;
var isRainbow = false; 

// used to hide the motto by making it invisible (default is visible b/c value is 255)
var alphaText = 255;
// used to show/hide list of controls via mouse position
var alphaMap;

// variables used for ease animation and its delay for the list of controls
var startTime;
var initiateAlpha = false;
var initiateAlphaDelay = false;

var xPosArr;
var yPosArr;
var direction = [-2, 2]; // movement speed for the motto
var xDirection;
var yDirection;

// array used to store number of fireworks that can be launched
var fireworks = [];

var roygbiv = [[255, 0, 0], [255, 165, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255], [75, 0, 130], [238, 130, 238]];

// DOM variables used to make the project mobile-friendly
var mobileButtons, rainbowBtn, toggleMotto, toggleAuto;

function setup() {
  createCanvas(windowWidth, windowHeight);
    // .position((windowWidth - width) / 2, ((windowHeight - height) / 2) - (height/16));
  textAlign(CENTER, CENTER);
  textX = width / 2;

  // generate 60 fireworks
  for (let i = 0; i < 60; i++) {
    fireworks[i] = new ASCIIFirework(mouseX, height + 24, 255, 24);
  }

  // determine the position for each text of the motto
  xPosArr = [width * 0.25, width * 0.5, width * 0.75];
  yPosArr = [height / 2, height / 2, height / 2];
  // determine the speed for each text of the motto
  xDirection = [random(direction), random(direction), random(direction)];
  yDirection = [random(direction), random(direction), random(direction)];

  // create div to store buttons 
  mobileButtons = createDiv();
  // move the div bottom-right in the canvas
  mobileButtons.position(width / 1.15, height / 1.25);
  // declare class to stylize the layout of the buttons
  mobileButtons.class("mobile-button");
  
  // create mobile-friendly buttons  
  rainbowBtn = createButton("RoyG Biv OFF");
  toggleMotto = createButton("display motto ON");
  toggleAuto = createButton("auto mode OFF");
  
  // append the buttons to the div
  mobileButtons.child(rainbowBtn);
  mobileButtons.child(toggleMotto);
  mobileButtons.child(toggleAuto);

  rainbowBtn.mouseClicked(() => {
    isRainbow = !isRainbow;
  });

  toggleMotto.mouseClicked(() => {
    isHidden = !isHidden;
  });

  toggleAuto.mouseClicked(() => {
    isAuto = !isAuto;

    // added same code from keyPressed, so it can also work when the user clicks on the button 
    if (isAuto) {

        // creates an auto firework instance
        autoInterval = setInterval(() => {
          // used to get random firework in the list
          let fw = int(random(60));

          // get a different firework whenever the program randomly selects one that's already moving up
          while (fireworks[fw].isMovingUp) {
            fw = int(random(60));
            //console.log("same index");
          }
          //fw3 = fw;

          // only move firework if its stationary
          if (!fireworks[fw].isMovingUp) { 
            // moves the firework up at a random horizontal position
            fireworks[fw].xPos = random(width);
            fireworks[fw].isMovingUp = true; 
          }

        }, 1000);

      } else {
        clearInterval(autoInterval); // stops auto mode
        // remove all intervals (firework instances)
        autoIntervals.forEach(id => clearInterval(id));
        // empty list b/c all intervals are inactive
        autoIntervals = [];
    }
  });
  
  // used for delaying the ease animation for the list of controls
  startTime = millis();

  angleMode(DEGREES);
} 

function draw() {
  background(15, 25, 35);
  rainbowTransition();
  if (isRainbow) {
    fill(are, gee, bee);
  } else {
    fill(225, 75, 35);
  }
  
  textSize(48); // 36
  text("ICSpark's 6th Anniversary!", width / 2, height / 6);

  // textSize(24);
  // fill(255, 255, 0, a);
  // text(ascii_char, posX, posY + 24);

  // draw each firework on the canvas (move and bang only happen if specified conditions are met)
  for (let i = 0; i < 60; i++) {
      fireworks[i].display();
      fireworks[i].move();
      fireworks[i].bang();
  }

  /* used to change the button text to let users know which mode is ON or OFF */
  if (!isRainbow) {
    // since this is HTML text, \n doesn't work, use <br> instead
    rainbowBtn.html("RoyG Biv <br> <b class='off'>OFF</b>");
  } else {
    rainbowBtn.html("RoyG Biv <br> <b class='on'>ON</b>");
  }

  if (!isAuto) {
    toggleAuto.html("Auto Mode <b class='off'>OFF</b>");
  } else {
    toggleAuto.html("Auto Mode <b class='on'>ON</b>");
  }

  if (isHidden) {
    alphaText = 0;
    toggleMotto.html("Display Motto <b class='off'>OFF</b>");
  } else {
    alphaText = 255;
    toggleMotto.html("Display Motto <b class='on'>ON</b>");
  }

  //if (isAuto) autoMode(); // freezes the program

  // display motto onto the canvas
  textSize(36);
  if (isRainbow) {
    fill(are, gee, bee, alphaText);
  } else {
    fill(225, 75, 35, alphaText);
  }
  
  // using arrays for each text to mode in an independent direction
  text("Coding", xPosArr[0], yPosArr[0]);
  text("Made", xPosArr[1], yPosArr[1]);
  text("Accessible", xPosArr[2], yPosArr[2]);

  // move each word in a random direction
  xPosArr[0] += xDirection[0];
  xPosArr[1] += xDirection[1] * 0.5;
  xPosArr[2] += xDirection[2] * 1.5;
  yPosArr[0] += yDirection[0];
  yPosArr[1] += yDirection[1] * 0.5;
  yPosArr[2] += yDirection[2] * 1.5;

  // if the words from the motto touches the canvas border, move in the opposite direction
  if (xPosArr[0] < ("Coding".length / 2) * 18 || xPosArr[0] > width - ("Coding".length / 2) * 18) {
    xDirection[0] *= -1; 
  }
  if (yPosArr[0] < 18 || yPosArr[0] > height - 9) {
    yDirection[0] *= -1;
  }
  if (xPosArr[1] < ("Made".length / 2) * 18 || xPosArr[1] > width - ("Made".length / 2) * 18) {
    xDirection[1] *= -1; 
  }
  if (yPosArr[1] < 18 || yPosArr[1] > height - 9) {
    yDirection[1] *= -1;
  }
  if (xPosArr[2] < ("Accessible".length / 2) * 18 || xPosArr[2] > width - ("Accessible".length / 2) * 18) {
    xDirection[2] *= -1; 
  }
  if (yPosArr[2] < 18 || yPosArr[2] > height - 9) {
    yDirection[2] *= -1;
  }

  if (height > width) {
    // show mobile buttons if canvas is using mobile resolution
    mobileButtons.class("mobile-buttons");

    // make the mobile buttons semi-transparent if at least one firework launched, opaque otherwise
    if (fireworks.every(fw => fw.isMovingUp === false)) {
      mobileButtons.class("semi-opaque");
    } else {
      mobileButtons.class("semi-transparent");
    }

  } else {
    // hide mobile buttons if canvas is using desktop resolution
    mobileButtons.class("hide-content");

    // used to display the list of controls if none of the fireworks are being launched
    if (fireworks.every(fw => fw.isMovingUp === false)) { 
      if (initiateAlphaDelay) { 
        // create a new millis()
        startTime = millis();
        // used to only create a new millis one time
        initiateAlphaDelay = false;
      } else {
        // determines how far apart elapsedDelay and sta
        let elapsedDelay = millis() - startTime;
        // do if/else after 5 seconds has passed 
        if (elapsedDelay > 5000) {
          if (alphaMap <= map(mouseY, height / 2, height, 0, 255) && mouseY > height / 2) {
            // animate ease-in
            alphaMap += 1 * pow(3 - 1, 3) + 1;
          } else {
            // set ease animation state to false
            initiateAlpha = false;
            //startTime = millis();
          }
        }
      }

      // alpha value is dependent on mouseY if ease animation isn't enabled
      if (!initiateAlpha) alphaMap = map(mouseY, height / 2, height, 0, 255);
      //initiateAlpha = false;
      
    } else {
  
      //if (!initiateAlpha) alphaMap = 255;
      initiateAlpha = true;

      if (alphaMap >= 0)  {
        console.log(alphaMap);
        alphaMap -= 1 * pow(3 - 1, 3) + 1;
      } else {
        initiateAlphaDelay = true;
      }
    }

    // used to change the color of the controls text
    if (isRainbow) {
      fill(are, gee, bee, alphaMap);
    } else {
      fill(225, 75, 35, alphaMap);
    }

    textSize(32);
    // since mobile devices can switch to landscape resolution, only display list of controls if user is using a computer
    if (!navigator.userAgent.toLowerCase().includes("mobile")) {
      text("Press r to toggle Roy G Biv Mode, m to show/hide Motto, or a to toggle Auto Mode", width / 2, height / 1.0625);
    }
    

  }
  
  // rainbowTransition();
  // circle(width / 2, height / 3, 100);

  // // I
  // text("_______", textX, height / 6);
  // text("|__     __|", textX, height / 4.8);
  // text("|    |", textX, height / 4);
  // text("|    |", textX, height / 3.45);
  // text("|    |", textX, height / 3);
  // text("__     __", textX, height / 2.95);
  // text("|            |", textX, height / 2.625);
  // text("______", textX, height / 2.6);
  // // C
  // text(" _____ ", textX + 200, height / 6);
  // text("/__     __\\", textX + 200, height / 4.8);
  // text("/___     __\\", textX + 200, height / 4);
  // text("/____          ", textX + 200, height / 3.45);
  // text("\\___        /", textX + 200, height / 3);
  // text("__      __", textX + 200, height / 2.95);
  // text("\\            /", textX + 200, height / 2.625);
  // text("______", textX + 200, height / 2.6);
}

function windowResized() {
  document.body.style.zoom = "100%";
  resizeCanvas(windowWidth, windowHeight);
}

var fw2 = -1;

// function mouseClicked() {
//   launchFirework();
// }

// touchStarted is like mouseClicked but it's also compatible with mobile devices
function touchStarted() {
  launchFirework();
}

function launchFirework() {
  let fw = int(random(60));

  // if it selects the same firework, change index until it selects a different one 
  while (fireworks[fw].isMovingUp) {
    fw = int(random(60));
    console.log("same index");
    //console.log(`fw: ${fw}, fw2: ${fw2}`);
  }
  fw2 = fw;

  console.log(`fw: ${fw}`);
  // only move firework if its stationary
  if (!fireworks[fw].isMovingUp) { 
    // change x position based on current mouseX
    fireworks[fw].xPos = mouseX;
    // enables firework to move up
    fireworks[fw].isMovingUp = true;
  }
}

var fw3 = -1;
var autoInterval;
var autoInterval2;
var autoIntervals = [];
function keyPressed() {
  if (key === 'm') isHidden = !isHidden;

  if (key === 'a') { 
    isAuto = !isAuto;
    
    if (isAuto) {
      // clear previous interval before starting a new one (ensures multiple auto modes don't happen)
      //clearInterval(autoInterval);

      autoInterval = setInterval(() => {
        let fw = int(random(60));

        while (fireworks[fw].isMovingUp) {
          fw = int(random(60));
          console.log("same index");
        }
        fw3 = fw;
        // only move firework if its stationary
        if (!fireworks[fw].isMovingUp) { 
          fireworks[fw].xPos = random(width);
          fireworks[fw].isMovingUp = true; 
        }
        //fireworks[fw].isMovingUp = true;
      }, 1000);

    } else {
      clearInterval(autoInterval); // stops auto mode
      // remove all intervals (firework instances)
      autoIntervals.forEach(id => clearInterval(id));
      // empty list b/c all intervals are inactive
      autoIntervals = [];
    }

     
  }
  
  
  if (key === 'A') { 
    if (isAuto) {
        autoInterval2 = setInterval(() => {
          let fw2 = int(random(60));

          while (fireworks[fw2].isMovingUp) {
            fw2 = int(random(60));
            console.log("same index");
          }
          //fw3 = fw;
          // only move firework if its stationary
          if (!fireworks[fw2].isMovingUp) { 
            fireworks[fw2].xPos = random(width);
            fireworks[fw2].isMovingUp = true; 
          }
          //fireworks[fw].isMovingUp = true;
        }, 1000);
        autoIntervals.push(autoInterval2); // keep track of multiple intervals
    }
    // dead code
    //else {
    //  console.log(isAuto);  
    //}
  }

  if (key === 'r')  isRainbow = !isRainbow;

  if (key === 's')  saveGif('icspark_fireworks', 5);
}

// use global variables to successfully update them in draw()
var are = 255
var gee = 0;
var bee = 0;

// have to use global variables directly, or else function passes by value (local param gets updated but not the global variables)
function rainbowTransition() {
  if (are >= 255 && gee >= 0 && gee < 256 && bee <= 0) {
    gee += 1; // eventually becomes orange then yellow
    
  } else if (gee >= 255 && are > 0) {
    are -= 1;
    
  } else if (are <= 0 && bee <= 255) {
    //gee -= 1;
    bee += 1
  } else if (bee > 255 && gee > 0) {
    gee -= 1;
    //console.log("green value: " + gee);
    //console.log("blue value: " + bee);
  } else if (gee === 0) {
    are += 1;
    bee -= 1;
  } else if (are >= 75) {
    bee -= 1;
  } else if (bee <= 130) {
    are += 1;
    gee += 1;
    bee += 1;
  } else if (bee >= 238) {
    are += 1;
    gee += 1;
  } else if (gee >= 130) {
    are += 1;
  } else if (are >= 238 && are < 255) {
    are += 1;
    gee -= 1;
    bee -= 1;
  } else if (are >= 255) {
    gee -= 1;
    bee -= 1;
  } else if (gee <= 0) {
    bee -= 1;
  }
  
  //fill(are, gee, bee);
}

// used to let users launch fireworks via tapping
// document.addEventListener("touchmove", (event) => {
//   event.preventDefault();
// }, { passive: false }); // This allows preventDefault()