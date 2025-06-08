var ascii_string = 'X2@adp#r9^kI!CQp&7S$WaT6';

class ASCIIFireworks {
    constructor(xPos, yPos, alpha, size) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size // text size
        this.alpha = alpha; // determines how transparent/opaque text is
        this.isMovingUp = false; // determines if the firework is moving up
        this.booly = true;  
        this.symbol = ascii_string[Math.floor(Math.random() * ascii_string.length)];
        this.sparks = [];
    }

    display() {
        if (isRainbow) { 
            fill(are, gee, bee, this.alpha);
        } else {
            fill(225, 75, 35, this.alpha); 
        }
        textSize(this.size);
        text(this.symbol, this.xPos, this.yPos);

        // create sparks when firework reached a certain height
        if (this.yPos < random(height / 2.5))   { 
            this.alpha = 0;
            
            // used so that each spark does not jitter
            if (this.booly) {
                for (let i = 0; i < 8; i++) {
                    this.sparks[i] = new ASCIIFireworks2(this.xPos, this.yPos, 255, this.size, this.symbol);
                }
                this.booly = false; // used to only create 8 firework sparks
            }
            
            //console.log("loop");
        }
    }

    move() {
        if (this.isMovingUp)   this.yPos -= 10; 
    }

    bang() {
        if (this.alpha <= 0) {
            
            //console.log("checkpioint");
            this.sparks[0].display();
            this.sparks[0].moveUp();
            this.sparks[0].decreaseOpacity();

            this.sparks[1].display();
            this.sparks[1].moveUpRight();
            this.sparks[1].decreaseOpacity();

            this.sparks[2].display();
            this.sparks[2].moveRight();
            this.sparks[2].decreaseOpacity();

            this.sparks[3].display();
            this.sparks[3].moveDownRight();
            this.sparks[3].decreaseOpacity();

            this.sparks[4].display();
            this.sparks[4].moveDown();
            this.sparks[4].decreaseOpacity();

            this.sparks[5].display();
            this.sparks[5].moveDownLeft();
            this.sparks[5].decreaseOpacity();

            this.sparks[6].display();
            this.sparks[6].moveLeft();
            this.sparks[6].decreaseOpacity();

            this.sparks[7].display();
            this.sparks[7].moveUpLeft();
            this.sparks[7].decreaseOpacity();

            if (this.sparks.every((s) => s.alpha <= 0))  {
                //console.log("reset triggered!");
                // make firework stationary again
                this.isMovingUp = false;
                // make firework visible again
                this.alpha = 255;
                // reset the vertical position below the canvas
                this.yPos = height + 24;
                // reset alpha for sparks
                this.sparks.forEach((spark) => {
                    spark.alpha = 255;
                });
                this.booly = true;
            }
        }
    }
}

class ASCIIFireworks2 {
    constructor(xPos, yPos, alpha, size, symbol) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size
        this.alpha = alpha;
        this.symbol = symbol;
    }

    display() {
        if (isRainbow) { 
            fill(are, gee, bee, this.alpha)
        } else {
            fill(225, 75, 35, this.alpha); 
        }
        textSize(this.size);
        text(this.symbol, this.xPos, this.yPos);
        //this.alpha -= 5;
        //console.log(this.alpha);
        //if (this.yPos < random(height / 2.5))   this.alpha = 0;
    }

    decreaseOpacity() {
        if (this.alpha >= 0)   {
            this.alpha -= 5;
            //console.log(this.alpha);
        }
    }

    moveUp() {
        this.yPos -= 10;
    }

    moveUpRight() {
        this.xPos += 10;
        this.yPos -= 10;
    }

    moveRight() {
        this.xPos += 10;
    }

    moveDownRight() {
        this.xPos += 10;
        this.yPos += 10;
    }

    moveDown() {
        this.yPos += 10;
    }

    moveDownLeft() {
        this.xPos -= 10;
        this.yPos += 10;
    }

    moveLeft() {
        this.xPos -= 10;
    }

    moveUpLeft() {
        this.xPos -= 10;
        this.yPos -= 10;
    }

}

// var isRainbow = false;
// var are = 255
// var gee = 0;
// var bee = 0;
// function rainbowTransition() {
//   if (are >= 255 && gee >= 0 && gee < 256 && bee <= 0) {
//     gee += 1; // eventually becomes orange then yellow
    
//   } else if (gee >= 255 && are > 0) {
//     are -= 1;
    
//   } else if (are <= 0 && bee <= 255) {
//     //gee -= 1;
//     bee += 1
//   } else if (bee > 255 && gee > 0) {
//     gee -= 1;
//     //console.log("green value: " + gee);
//     //console.log("blue value: " + bee);
//   } else if (gee === 0) {
//     are += 1;
//     bee -= 1;
//   } else if (are >= 75) {
//     bee -= 1;
//   } else if (bee <= 130) {
//     are += 1;
//     gee += 1;
//     bee += 1;
//   } else if (bee >= 238) {
//     are += 1;
//     gee += 1;
//   } else if (gee >= 130) {
//     are += 1;
//   } else if (are >= 238 && are < 255) {
//     are += 1;
//     gee -= 1;
//     bee -= 1;
//   } else if (are >= 255) {
//     gee -= 1;
//     bee -= 1;
//   } else if (gee <= 0) {
//     bee -= 1;
//   }
  
//   fill(are, gee, bee);
// }