var textX;
var ascii_string = 'X2@adp#r9^kI!CQp&7S$WaT6';
var ascii_char;
var posX;
var posY;

var isHidden = false;
var isAuto = false;
var isRainbow = false; 

var alphaText = 255;
let alphaMap;

var startTime;
var initiateAlpha = false;
var initiateAlphaDelay = false;

var asciiArr = [];
var xPosArr;
var yPosArr;
var direction = [-2, 2];
var xDirection;
var yDirection;

var fireworks = [];
var indecies = [];
var roygbiv = [[255, 0, 0], [255, 165, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255], [75, 0, 130], [238, 130, 238]];

var mobileButtons, rainbowBtn, toggleMotto, toggleAuto;

function setup() {
  createCanvas(windowWidth, windowHeight);
    // .position((windowWidth - width) / 2, ((windowHeight - height) / 2) - (height/16));
  textAlign(CENTER, CENTER);
  textX = width / 2;
  // posX = mouseX;
  // posY = height + 24;
  // ascii_char = ascii_string[int(random(ascii_string.length))];

  for (let i = 0; i < 60; i++) {
    // ascii_char = ascii_string[int(random(ascii_string.length))];
    // asciiArr.push(ascii_char);
    // xPosArr.push(posX);
    // yPosArr.push(posY);

    fireworks[i] = new ASCIIFireworks(mouseX, height + 24, 255, 24);
  }

  // while () {
  //   for (let i = 0; i < 60; i++) {
  //     indecies[i] = int(random(60));
  //   }
  // }

  xPosArr = [width * 0.25, width * 0.5, width * 0.75];
  yPosArr = [height / 2, height / 2, height / 2];
  xDirection = [random(direction), random(direction), random(direction)];
  yDirection = [random(direction), random(direction), random(direction)];

  mobileButtons = createDiv();
  mobileButtons.position(width / 1.15, height / 1.25);
  mobileButtons.class("mobile-button");
  
  rainbowBtn = createButton("RoyG Biv OFF");
  toggleMotto = createButton("display motto ON");
  toggleAuto = createButton("auto mode OFF");
  
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
  });

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

  for (let i = 0; i < 60; i++) {
      fireworks[i].display();
      fireworks[i].move();
      fireworks[i].bang();
  }

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
  
  //fill(255, 255, 0, 255);
  text("Coding", xPosArr[0], yPosArr[0]);
  //fill(255, 0, 255, 255);
  text("Made", xPosArr[1], yPosArr[1]);
  //fill(0, 255, 255, 255);
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

    if (fireworks.every(fw => fw.isMovingUp === false)) {
      mobileButtons.class("semi-opaque");
    } else {
      mobileButtons.class("semi-transparent");
    }

  } else {
    // hide mobile buttons if canvas is using desktop resolution
    mobileButtons.class("hide-content");

    
    
    if (fireworks.every(fw => fw.isMovingUp === false)) { 
      if (initiateAlphaDelay) { 
        startTime = millis();
        initiateAlphaDelay = false;
      } else {
        let elapsedDelay = millis() - startTime;
        if (elapsedDelay > 5000) {
          if (alphaMap <= map(mouseY, height / 2, height, 0, 255) && mouseY > height / 2) {
            alphaMap += 1 * pow(3 - 1, 3) + 1;
          } else {
            initiateAlpha = false;
            startTime = millis();
          }
        }
      }

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

    if (isRainbow) {
      fill(are, gee, bee, alphaMap);
    } else {
      fill(225, 75, 35, alphaMap);
    }

    

    textSize(32);
    text("Press r to toggle Roy G Biv Mode, m to show/hide Motto, or a to toggle Auto Mode", width / 2, height / 1.0625);

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

var fw2 = -1;

function mouseClicked() {
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
  //fireworks[fw].isMovingUp = true;
  //console.log(fireworks[fw].isMovingUp);
  //fireworks[fw].move();
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
document.ontouchmove = function(event) {
  event.preventDefault();
}